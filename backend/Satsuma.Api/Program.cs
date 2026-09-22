using Microsoft.EntityFrameworkCore;
using Satsuma.Api.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddOpenApi();

builder.Services.AddDbContext<SatsumaDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Default") ?? throw new InvalidOperationException("Connection string 'SatsumaDbContext' not found.")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

var tires = new Tires("Tires", Part.PartCondition.New, Part.Side.None)
{
    PartNumber = "123456789",
    Description = "Hankook Ventus S1 Evo3 K127 245/35R19 93Y XL",
    Price = 199,
    Quantity = 4
};

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

internal class SatsumaDbContext : DbContext
{
    public SatsumaDbContext(DbContextOptions<SatsumaDbContext> options) : base(options)
    {
    }
}