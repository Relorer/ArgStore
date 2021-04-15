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
