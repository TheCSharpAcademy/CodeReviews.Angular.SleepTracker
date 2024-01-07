using Microsoft.EntityFrameworkCore;
using SleepTracker.UgniusFalze.Models;
using SleepTracker.UgniusFalze.Repositories;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options => options.AddPolicy(name: "SleepTrackerUI",
    policy =>
    {
        policy.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
    }));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<SleepRecordContext>(optionsBuilder =>
{
    optionsBuilder.UseNpgsql(@"Host=localhost;Database=SleepRecords;Username=postgres;Password=");
});
builder.Services.AddScoped<ISleepRecordRepository, SleepRecordRepository>();
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("SleepTrackerUI");

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
