using Microsoft.EntityFrameworkCore;
using SleepTracker.Api.Data;
using SleepTracker.Api.Services;

namespace SleepTracker.Api.Installers;

/// <summary>
/// Registers any database dependencies and seeds data.
/// </summary>
public static class DatabaseInstaller
{
    public static IServiceCollection AddDatabase(this IServiceCollection services, IConfigurationRoot configuration)
    {
        var connectionString = configuration.GetConnectionString("SleepTracker") ?? throw new InvalidOperationException("Connection string 'SleepTracker' not found");

        services.AddDbContext<SleepTrackerDataContext>(options =>
        {
            options.UseSqlServer(connectionString);
        });

        services.AddScoped<ISleepTrackerRepository, SleepTrackerRepository>();
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped<ISeederService, SeederService>();

        return services;
    }

    public static IServiceProvider SeedDatabase(this IServiceProvider serviceProvider)
    {
        var context = serviceProvider.GetRequiredService<SleepTrackerDataContext>();
        context.Database.Migrate();

        var seeder = serviceProvider.GetRequiredService<ISeederService>();
        seeder.SeedDatabase();

        return serviceProvider;
    }
}
