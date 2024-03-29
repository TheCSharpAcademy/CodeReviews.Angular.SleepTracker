using Microsoft.EntityFrameworkCore;
using SleepTracker;

var MyAllowedOrigins = "_myAllowOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
    { options.AddPolicy(name: MyAllowedOrigins,
        policy => { /*policy.WithOrigins("http://localhost:4200", "http://localhost:7218")*/
            policy.AllowAnyOrigin() 
            .AllowAnyHeader()
            .AllowAnyMethod(); });
    });
builder.Services.AddControllers();

builder.Services.AddDbContext<SleepTrackerContext>(opt =>
 opt.UseSqlServer(builder.Configuration.GetConnectionString("SleepTracker")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(MyAllowedOrigins);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
