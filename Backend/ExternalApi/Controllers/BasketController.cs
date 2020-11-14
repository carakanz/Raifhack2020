using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExternalApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private readonly Models.ApplicationContext _context;
        private readonly ILogger<BasketController> _logger;

        public BasketController(Models.ApplicationContext context,
            ILogger<BasketController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost("Buy")]
        public async Task<Models.BuyResponse> Buy(Models.BuyRequest category)
        {
            return new Models.BuyResponse
            {
                Amount = 10000,
                OrderId = 500,
                PublicId = "000003333328007-33328007",
            };
        }
    }
}
