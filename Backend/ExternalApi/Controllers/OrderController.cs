using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace ExternalApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly Models.ApplicationContext _context;
        private readonly ILogger<OrderController> _logger;

        public OrderController(Models.ApplicationContext context,
            ILogger<OrderController> logger)
        {
            _context = context;
            _logger = logger;
        }

        public record OrderCreateResponse(
            string PublicId,
            int Amount,
            string OrderId);

        public record OrderCreateRequest(
            [Required] int ShopId,
            [Required] string Name,
            [Required][Phone] string Phone,
            [Required][EmailAddress] string Email,
            [Required] string Address,
            [Required] DateTime DateTime,
            [Required][MinLength(1)] int[] Products);

        [HttpPost("Create")]
        public async Task<ActionResult<OrderCreateResponse>> Create(OrderCreateRequest request)
        {
            using var transaction = _context.Database.BeginTransaction();
            var shop = await _context
                .Sites
                .Where(s => s.Id == request.ShopId)
                .Include(s => s.User)
                .FirstOrDefaultAsync();
            if (shop is null)
            {
                return NotFound("Shop not found");
            }

            var groupProducts = request.Products
                .GroupBy(p => p)
                .Select(g => new { id = g.Key, count = g.Count() });

            var products = groupProducts
                .Select(productId =>
                {
                    var product = _context.Products
                    .Where(p => p.Id == productId.id)
                    .Include(p => p.Categories)
                    .ThenInclude(c => c.Site).FirstOrDefault();
                    if (product is null)
                    {
                        return null;
                    }
                    return new { product = product.Categories.All(c => c.Site.Id == request.ShopId) ? product : null, productId.count };
                });

            if (products.Any(p => p is null))
            {
                return NotFound("Product not found");
            }

            var amount = products.Sum(p => p.product.Cost * p.count);
            var order = new Models.Order
            {
                Name = request.Name,
                Guid = Guid.NewGuid().ToString(),
                Address = request.Address,
                DateTime = request.DateTime,
                Email = request.Email,
                Phone = request.Phone,
                Site = shop,
                Status = Models.Status.AwaitingPayment,
                Amount = amount
            };

            _context.Orders.Add(order);
            var orderItems = products.Select(p => new Models.OrderItem
            {
                Order = order,
                Cost = p.product.Cost,
                Product = p.product,
                Count = p.count
            });

            _context.OrderItems.AddRange(orderItems);
            await _context.SaveChangesAsync();

            transaction.Commit();
            return new OrderCreateResponse(shop.User.PublicId, amount, order.Guid);
        }

        public record Status(
            string Value,
            DateTime Date);

        public record Transaction(
            Status Status);

        public record TransactionStatusResponse(
            string Code,
            Transaction Transaction);

        const string CheckPaymentUrl = "https://test.ecom.raiffeisen.ru/api/payments/v1/orders/{0}/transaction";
        [HttpPost("Payment")]
        public async Task<ActionResult> Payment(string orderId)
        {
            var order = await _context.Orders.Where(o => o.Guid == orderId).FirstOrDefaultAsync();
            if (order is null)
            {
                return NotFound("Not found order");
            }
            WebRequest request = WebRequest.Create(String.Format(CheckPaymentUrl, orderId));
            request.Method = "POST";
            request.ContentType = "application/json;charset=UTF-8";
            request.Headers.Add("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMDAwMDMzMzMzMjgwMDctMzMzMjgwMDciLCJqdGkiOiI2ZTFlMjEyMi1mYTY4LTQ3MWMtOTAyYS01MGZhMmQ0ZmM4ZDMifQ.o5H_dRFPaefFp1cOJNZizzE1kg2i4hwOi7fSK_-FjW8");
            WebResponse response = await request.GetResponseAsync();
            using Stream stream = response.GetResponseStream();
            using StreamReader reader = new StreamReader(stream);
            using JsonTextReader jsonReader = new JsonTextReader(reader);
            JsonSerializer ser = new JsonSerializer();
            var transactionStatus = ser.Deserialize<TransactionStatusResponse>(jsonReader);

            return new OkResult();
        }
    }
}
