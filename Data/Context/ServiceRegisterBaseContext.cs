using Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Context
{
    public static class ServiceRegisterBaseContext
    {
        /// <summary>
        /// Метод расширения для регистрации контекста базы данных
        /// </summary>
        /// <param name="services">The services available in the application.</param>
        /// <param name="connection">Строка подключения к бд</param>
        /// <returns>The services.</returns>
        public static IServiceCollection RegisterBaseContext(this IServiceCollection services, string connection)
        {
            services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<BaseContext>();
            services.AddScoped(typeof(DbContext), typeof(BaseContext));
            services.AddDbContext<BaseContext>(options => options.UseSqlServer(connection));
            return services;
        }
    }
}
