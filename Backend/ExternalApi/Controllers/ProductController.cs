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
    [Route("api/admin/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly Models.ApplicationContext _context;
        private readonly ILogger<ProductController> _logger;

        public ProductController(Models.ApplicationContext context,
            ILogger<ProductController> logger)
        {
            _context = context;
            _logger = logger;
        }

        public record ProductCreateResponse(
            [Required][MinLength(3)] string Name,
            [Required][Range(0, int.MaxValue, ErrorMessage = "Cost for {0} must be between {1} and {2}.")] int Cost,
            [Required] string Description,
            [Required] int CategoryId);

        [HttpPost("create")]
        public async Task<ActionResult<Models.Product>> Create(ProductCreateResponse response)
        {
            var category = await _context
                .Categories
                .Where(c => c.Id == response.CategoryId)
                .FirstOrDefaultAsync();
            if (category is null)
            {
                return NotFound("Category not found");
            }
            var product = new Models.Product
            {
                Name = response.Name,
                Cost = response.Cost,
                Description = response.Description,
                Categories = new Models.Category[] 
                {
                    category
                }
            };
            _context.Add(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public record ProductChangeResponse(
            [Required] int Id,
            [MinLength(3)] string Name,
            [Range(0, int.MaxValue, ErrorMessage = "Cost for {0} must be between {1} and {2}.")] int? Cost,
            string Description);

        [HttpPut("change")]
        public async Task<ActionResult> Change(ProductChangeResponse response)
        {
            var product = await _context.Products.Where(p => p.Id == response.Id).FirstOrDefaultAsync();
            if (product is null)
            {
                return NotFound("Product not found");
            }

            product.Name = response.Name ?? product.Name;
            product.Cost = response.Cost ?? product.Cost;
            product.Description = response.Description ?? product.Description;

            await _context.SaveChangesAsync();
            return new OkResult();
        }

        [HttpDelete("delete")]
        public async Task<ActionResult> Delete(int id)
        {
            var product = await _context.Products.Where(p => p.Id == id).FirstOrDefaultAsync();
            if (product is null)
            {
                return NotFound("Product not found");
            }
            _context.Products.Remove(product);

            await _context.SaveChangesAsync();
            return new OkResult();
        }

        [HttpGet]
        [Route("get/{id}")]
        [Route("/api/Product/get/{id}")]
        public async Task<ActionResult<Models.Product>> Product(int id)
        {
            var product = await _context
                .Products
                .Where(p => p.Id == id)
                .AsNoTracking()
                .FirstOrDefaultAsync();
            if (product is null)
            {
                return NotFound("Product not found");
            }
            return product;
        }
    }
}
