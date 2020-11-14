using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExternalApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.WithOrigins("http://localhost",
                                            "http://127.0.0.1",
                                            "http://a8a60a5d0ba8.sn.mynetname.net");
                    });
            });
            // Read db settings
            var databaseSettings = Configuration.GetSection(nameof(Models.DatabaseOptions));
            services.Configure<Models.DatabaseOptions>(databaseSettings);

            services.AddSingleton<Models.IDatabaseOptions>(sp =>
                sp.GetRequiredService<IOptions<Models.DatabaseOptions>>().Value);

            // Add MySql
            services.AddDbContext<Models.ApplicationContext>(
                options => options
                .UseNpgsql(
                   databaseSettings[nameof(Models.DatabaseOptions.PostgreSqlConnection)]));

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "ExternalApi", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ExternalApi v1"));
            app.UseRouting();
            app.UseStatusCodePagesWithRedirects("/swagger/index.html");

            app.UseCors();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
