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
    public class SitesController : ControllerBase
    {
        private readonly Models.ApplicationContext _context;
        private readonly ILogger<SitesController> _logger;

        public SitesController(Models.ApplicationContext context,
            ILogger<SitesController> logger)
        {
            _context = context;
            _logger = logger;
        }

        public record SiteCreateResponse(
            [Required][MinLength(3)][MaxLength(100)] string Slug,
            [Required] string Type,
            [Required] string Name,
            string Description,
            [Phone]string Phone,
            string Address);

        [HttpPost("create")]
        public async Task<ActionResult<Models.Site>> Create(SiteCreateResponse response)
        {
            var user = new Models.User { Id = 1 };

            using var transaction = _context.Database.BeginTransaction();

            _context.Attach(user);

            var existSite = await _context.Sites.Where(s => s.Slug == response.Slug).FirstOrDefaultAsync();
            if (existSite != null)
            {
                return BadRequest("Exist slug");
            }

            var site = new Models.Site
            {
                Address = response.Address ?? "Москва, Первомайская 28А",
                Deliveries = null,
                Description = response.Description ?? "Федеральная сеть столовх BestFood - это демократичные столовые, расположенные в различных районах Москвы и Московской области. Мы взяли все самое лучшее из советского общепита и сделали наши блюда вкусными, разнообразными и по-настоящему домашними. Почти все, что мы предлагаем Вам, приготовлено по собственным рецептам – включая выпечку и напитки. Широкий ассортимент позволит каждому гостю подобрать блюдо по вкусу. Также мы готовим специальное меню к таким праздникам, как Новый год, Масленица, Великий пост и многим другим. И пусть Вас не пугают очереди в наших столовых! Стоять долго не придется, потому что Вы всегда можете оформить заказ на нашем сайте \"Veryfood.ru\" и оплатить с помощью банковской карты или наличными. Наши курьеры доставят Вам заказ в кратчайшие сроки вместе с комплектом приборов, чтобы вы могли насладиться едой без лишних неудобств. Мы вседа рады новым клиентам, приятного аппетита!",
                Name = response.Name,
                Phone = response.Phone ?? "+7(915)123-45-67",
                Categories = null,
                Slug = response.Slug,
                Type = response.Type,
                User = user,
            };

            _context.Sites.Add(site);

            var delivery = new Models.Delivery
            {
                Id = 0,
                Type = "courier",
                Cost = 30,
                Description = "Наша доставка еды по Подмосковью работает ежедневно с 10:00 до 21:40. Мы готовы принять ваш заказ и оформить доставку еды в офис, квартиру, общежитие или университет. Примерное время доставки еды составляет 30 минут. Время доставки еды может меняться в зависимости от вашего местонахождения, загрузки обслуживающего персонала.",
                Site = site,
            };
            
            _context.Deliveries.Add(delivery);
            await _context.SaveChangesAsync();
            transaction.Commit();
            return site;
        }

        [HttpGet("all")]
        public IAsyncEnumerable<Models.Site> All()
        {
            var user = new Models.User { Id = 1 };
            _context.Attach(user);

            return _context.Sites
                .Where(s => s.User == user)
                .AsNoTracking()
                .AsAsyncEnumerable();
        }

        public record SiteDeliveryChangeResponse(
            [Required]  string Type,
            [Required]  int Cost,
            [Required]  string Description);

        public record SiteChangeResponse(
            [Required] int Id,
            string Name,
            string Description,
            [Phone]
            string Phone,
            string Address,
            ICollection<SiteDeliveryChangeResponse> Deliveries);

        [HttpPut("change")]
        public async Task<ActionResult> Change(SiteChangeResponse response)
        {
            var user = new Models.User { Id = 1 };
            _context.Attach(user);

            var site = await _context.Sites.Where(s => s.Id == response.Id).FirstOrDefaultAsync();
            if (site is null)
            {
                return NotFound("Site not exist");
            }

            site.Name = response.Name ?? site.Name;
            site.Description = response.Description ?? site.Description;
            site.Phone = response.Phone ?? site.Phone;
            site.Address = response.Address ?? site.Address;

            var oldDeliveries = _context.Deliveries.Where(d => d.Site == site);
            _context.Deliveries.RemoveRange(oldDeliveries);

            var newDeliveries = response.Deliveries
                .Select(d => new Models.Delivery
                {
                    Type = d.Type,
                    Cost = d.Cost,
                    Description = d.Description,
                    Site = site
                });
            _context.Deliveries.AddRange(newDeliveries);
            await _context.SaveChangesAsync();

            return new OkResult();
        }

        [HttpDelete("delete")]
        public async Task<ActionResult> Delete(int id)
        {
            var user = new Models.User { Id = 1 };
            _context.Attach(user);

            var site = await _context.Sites.Where(s => s.Id == id).FirstOrDefaultAsync();
            if (site is null)
            {
                return NotFound("Site not exist");
            }

            var oldDeliveries = _context.Deliveries.Where(d => d.Site == site);
            _context.Deliveries.RemoveRange(oldDeliveries);
            _context.Sites.Remove(site);
            await _context.SaveChangesAsync();

            return new OkResult();
        }

        [HttpGet]
        [Route("get/{slug}")]
        [Route("/api/Sites/get/{slug}")]
        public async Task<ActionResult<Models.Site>> Get(string slug)
        {
            var site = await _context.Sites
                .Where(s => s.Slug == slug)
                .Include(s => s.Deliveries)
                .Include(s => s.Categories)
                .AsNoTracking()
                .FirstOrDefaultAsync();
            if (site is null)
            {
                return NotFound("Site not found");
            }
            return site;
        }
    }
}
