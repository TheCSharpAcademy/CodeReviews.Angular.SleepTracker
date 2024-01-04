using Microsoft.EntityFrameworkCore;
using SleepTracker.UgniusFalze.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<SleepRecordContext>(optionsBuilder =>
{
    var serverVersion = new MySqlServerVersion(new Version(8, 0, 34));
    optionsBuilder.UseMySql("server=localhost; database=SleepRecord; user=;password=", serverVersion);
});

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
