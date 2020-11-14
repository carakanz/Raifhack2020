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

        [HttpPost("create")]
        public async Task<IActionResult> Create(Models.Product site)
        {
            return new OkResult();
        }

        [HttpPut("change")]
        public async Task<ActionResult> Change(Models.Product site)
        {
            return new OkResult();
        }

        [HttpDelete("delete")]
        public async Task<ActionResult> Delete(int id)
        {
            return new OkResult();
        }

        [HttpGet]
        [Route("get/{id}")]
        [Route("/api/Product/get/{id}")]
        public async Task<Models.Product> Product(int id)
        {
            return new Models.Product
            {
                Categories = null,
                Id = 0,
                Cost = 10000,
                Description = "лук, томат, огурцы соленые, картофель, маслины, курица, сосиски, свинина",
                Name = "Солянка мясная"
            };
        }
    }
}
