using SleepTracker.Api.Services;

namespace SleepTracker.Api.Installers;

/// <summary>
/// Registers dependencies for the Application layer.
/// </summary>
public static class ApplicationInstaller
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<ISleepRecordService, SleepRecordService>();

        return services;
    }
}
