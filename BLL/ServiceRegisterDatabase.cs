using Data.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace BLL
{
    public static class ServiceRegisterDatabase
    {
        public static IServiceCollection RegisterDatabase(this IServiceCollection services, string connection)
        {
            services.AddScoped(typeof(IUnitOfWork), typeof(UnitOfWork));
            services.RegisterBaseContext(connection);
            return services;
        }
    }
}
