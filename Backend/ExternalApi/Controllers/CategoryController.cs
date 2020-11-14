using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
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

        [HttpGet("all")]
        public IEnumerable<Models.Category> All()
        {
            return new Models.Category[]
                {
                    new Models.Category
                    {
                        Id = 0,
                        Name = "Первое",
                        Slug = "First",
                    },
                    new Models.Category
                    {
                        Id = 1,
                        Name = "Второе",
                        Slug = "Second",
                    },
                };
        }

        [HttpGet]
        [Route("get/{id}")]
        [Route("/api/Category/get/{id}")]
        public async Task<Models.Category> Get(int id)
        {
            return new Models.Category
            {
                Id = 0,
                Name = "Первое",
                Slug = "First",
                Products = new Models.Product[]
                {
                    new Models.Product
                    {
                        Categories = null,
                        Id = 0,
                        Cost = 10000,
                        Description = "лук, томат, огурцы соленые, картофель, маслины, курица, сосиски, свинина",
                        Name = "Солянка мясная"
                    },
                    new Models.Product
                    {
                        Categories = null,
                        Id = 1,
                        Cost = 10000,
                        Description = "Морковь, лук, лапша, курица, помидоры",
                        Name = "Суп-лапша \"По-Казачьи\""
                    }
                }
            };
        }

        [HttpPost("Create")]
        public async Task<Models.Category> Create(Models.Category category)
        {
            return category;
        }

        [HttpPut("change")]
        public async Task<ActionResult> Change(Models.Category site)
        {
            return new OkResult();
        }

        [HttpDelete("delete")]
        public async Task<ActionResult> Delete(int id)
        {
            return new OkResult();
        }
    }
}
