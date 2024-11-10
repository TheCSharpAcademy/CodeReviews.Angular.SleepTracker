var builder = WebApplication.CreateBuilder(args);

var MyAllowSpecificOrgins = "_myAllowSpecificOrigins";

var configuration = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json")
    .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production"}.json", true)
    .Build();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrgins,
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<SleepDbContext>(options =>
{
    options.UseSqlServer(configuration.GetConnectionString("MSSQLConnection"));
});

builder.Services.AddScoped<SleepDbContext>()
    .AddScoped<ISleepRepository, SleepRepository>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrgins);

app.UseAuthorization();

app.MapControllers();

app.Run();
