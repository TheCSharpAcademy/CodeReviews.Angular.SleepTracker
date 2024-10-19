using Asp.Versioning;
using FluentValidation;
using Microsoft.AspNetCore.Http.Json;
using Microsoft.Extensions.Options;
using SleepTracker.Api.OpenApi;
using SleepTracker.Api.Routes;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace SleepTracker.Api.Installers;

/// <summary>
/// Registers dependencies and adds any required middleware for the API layer.
/// </summary>
public static class ApiInstaller
{
    public static IServiceCollection AddApi(this IServiceCollection services)
    {
        services.AddCors();

        services.AddAuthorization();

        services.AddApiVersioning(options =>
        {
            options.DefaultApiVersion = new ApiVersion(1);
            options.ReportApiVersions = true;
            options.AssumeDefaultVersionWhenUnspecified = true;
            options.ApiVersionReader = new UrlSegmentApiVersionReader();
        })
        .AddApiExplorer(options =>
        {
            options.GroupNameFormat = "'v'V";
            options.SubstituteApiVersionInUrl = true;
        });

        services.AddEndpointsApiExplorer();

        services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();

        services.AddSwaggerGen(options => options.OperationFilter<SwaggerDefaultValues>());

        services.ConfigureHttpJsonOptions(options =>
        {
            options.SerializerOptions.WriteIndented = true;
            options.SerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
        });

        services.Configure<JsonOptions>(options =>
        {
            options.SerializerOptions.WriteIndented = true;
            options.SerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
        });

        services.AddValidatorsFromAssemblyContaining<Program>();

        return services;
    }

    public static WebApplication AddMiddleware(this WebApplication app)
    {
        // NOTE: Required before UseSwaggerUI to ensure correct definitions are available to swagger.
        app.MapSleepTrackerEndpoints();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                foreach (var description in app.DescribeApiVersions())
                {
                    var url = $"/swagger/{description.GroupName}/swagger.json";
                    var name = description.GroupName.ToUpperInvariant();
                    options.SwaggerEndpoint(url, name);
                }
            });
        }

        app.UseHttpsRedirection();

        app.UseCors(options =>
        {
            options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
        });

        app.UseAuthorization();

        return app;
    }

    public static WebApplication SetUpDatabase(this WebApplication app)
    {
        // Performs any database migrations and seeds the database.
        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;
        services.SeedDatabase();

        return app;
    }
}
