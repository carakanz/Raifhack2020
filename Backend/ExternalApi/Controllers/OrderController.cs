using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
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

            var productsTask = groupProducts
                .Select(async productId =>
                {
                    var product = await _context.Products
                    .Where(p => p.Id == productId.id)
                    .Include(p => p.Categories)
                    .ThenInclude(c => c.Site).FirstOrDefaultAsync();
                    if (product is null)
                    {
                        return null;
                    }
                    return new { product = product.Categories.All(c => c.Site.Id == request.ShopId) ? product : null, productId.count };
                });

            var products = await Task.WhenAll(productsTask);

            if (products.Any(p => p is null))
            {
                return NotFound("Product not found");
            }

            var amount = products.Sum(p => p.product.Cost * p.count);
            var order = new Models.Order
            {
                Name = request.Name,
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
            return new OrderCreateResponse(shop.User.PublicId, amount, order.Id.ToString());
        }
    }
}
