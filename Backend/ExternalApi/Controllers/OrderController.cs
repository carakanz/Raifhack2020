using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
            [Required] string Name,
            [Required][Phone] string Phone,
            [Required][EmailAddress] string Email,
            [Required] string Address,
            [Required] DateTime DateTime,
            [Required][MinLength(1)] int[] Products);

        [HttpPost("Create")]
        public async Task<ActionResult<OrderCreateResponse>> Create(OrderCreateRequest category)
        {
            return new OrderCreateResponse("500", 10000, "000003333328007-33328007");
        }
    }
}
