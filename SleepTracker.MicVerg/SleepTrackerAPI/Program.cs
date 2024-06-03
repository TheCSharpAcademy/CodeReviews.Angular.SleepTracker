using Microsoft.EntityFrameworkCore;
using SleepTrackerAPI.Data;

var builder = WebApplication.CreateBuilder(args);
var MyAllowOrigins = "_myAllowOrigins";

// Add services to the container.
builder.Services.AddDbContext<SleepContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("SqlServerConnectionString")));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowOrigins,
    policy =>
    {
        policy.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
});

builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors(MyAllowOrigins);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
};

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
