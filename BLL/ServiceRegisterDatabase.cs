using Data.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace BLL
{
    public static class ServiceRegisterDatabase
    {
        /// <summary>
        /// Метод расширения для регистрации реализации IUnitOfWork и контекста базы данных
        /// </summary>
        /// <param name="services">The services available in the application.</param>
        /// <param name="connection">Строка подключения к бд</param>
        /// <returns>The services.</returns>
        public static IServiceCollection RegisterDatabase(this IServiceCollection services, string connection)
        {
            services.AddScoped(typeof(IUnitOfWork), typeof(UnitOfWork));
            services.RegisterBaseContext(connection);
            return services;
        }
    }
}
