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
    public class UserController : ControllerBase
    {
        private readonly Models.ApplicationContext _context;
        private readonly ILogger<UserController> _logger;

        public UserController(Models.ApplicationContext context,
            ILogger<UserController> logger)
        {
            _context = context;
            _logger = logger;
        }

        public record UserCreateResponse(string PublicId);

        [HttpPost("Create")]
        public async Task<Models.User> Create(UserCreateResponse response)
        {
            var user = new Models.User
            {
                PublicId = response.PublicId,
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }
    }
}
