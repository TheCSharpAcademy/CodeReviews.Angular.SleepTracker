using SleepTracker.Api.Installers;

namespace SleepTracker.Api;

/// <summary>
/// The entry point for the API.
/// This class is responsible for configuring and launching the application.
/// </summary>
public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.Services.AddApi();
        builder.Services.AddApplication();
        builder.Services.AddDatabase(builder.Configuration);

        var app = builder.Build();
        app.AddMiddleware();
        app.SetUpDatabase();
        app.Run();
    }
}
