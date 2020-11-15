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
    public class CategoryController : ControllerBase
    {
        private readonly Models.ApplicationContext _context;
        private readonly ILogger<CategoryController> _logger;

        public CategoryController(Models.ApplicationContext context,
            ILogger<CategoryController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        [Route("get/{id}")]
        [Route("/api/Category/get/{id}")]
        public async Task<ActionResult<Models.Category>> Get(int id)
        {
            var category = await _context.Categories
                .Where(c => c.Id == id)
                .Include(c => c.Products)
                .AsNoTracking()
                .FirstOrDefaultAsync();
            if (category is null)
            {
                return NotFound("Category not found");
            }
            return category;
        }

        public record CategoryCreateResponse(
            [Required][MinLength(3)] string Slug,
            [Required] string Name,
            [Required] int SiteId);

        [HttpPost("Create")]
        public async Task<ActionResult<Models.Category>> Create(CategoryCreateResponse response)
        {
            using var transaction = _context.Database.BeginTransaction();
            var user = new Models.User { Id = 1 };
            _context.Attach(user);

            var site = await _context
                .Sites
                .Where(s => s.Id == response.SiteId)
                .Include(s => s.Categories)
                .FirstOrDefaultAsync();
            if (site is null)
            {
                return NotFound("Site not exist");
            }

            if (!site.Categories.Any(c => c.Slug == response.Slug))
            {
                return BadRequest("Exist slug");
            }

            var category = new Models.Category
            {
                Name = response.Name,
                Slug = response.Slug,
                Site = site,
            };

            _context.Categories.Add(category);

            await _context.SaveChangesAsync();
            transaction.Commit();
            return category;
        }

        public record CategoryChangeResponse(
            [Required] int Id,
            [Required] string Name);

        [HttpPut("change")]
        public async Task<ActionResult> Change(CategoryChangeResponse response)
        {
            var user = new Models.User { Id = 1 };
            _context.Attach(user);

            var category = await _context
                .Categories
                .Where(s => s.Id == response.Id).FirstOrDefaultAsync();
            if (category is null)
            {
                return NotFound("Category not found");
            }
            category.Name = response.Name;
            await _context.SaveChangesAsync();
            return new OkResult();
        }

        [HttpDelete("delete")]
        public async Task<ActionResult> Delete(int id)
        {
            var category = await _context
                .Categories
                .Where(s => s.Id == id).FirstOrDefaultAsync();
            if (category is null)
            {
                return NotFound("Category not found");
            }
            _context.Categories.Remove(category);
            return new OkResult();
        }
    }
}
