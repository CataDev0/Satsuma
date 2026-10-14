using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Satsuma.Api.Data;
using Satsuma.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

builder.Services.AddOpenApi();

builder.Services.AddDbContext<SatsumaDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Default") ?? throw new InvalidOperationException("Connection string 'Default' not found.")));

builder.Services.AddScoped<CarService>();
builder.Services.AddScoped<MaintenanceService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    if (!EF.IsDesignTime)
    {
        using var scope = app.Services.CreateScope();
        await DbSeeder.SeedAsync(scope.ServiceProvider.GetRequiredService<SatsumaDbContext>());
    }
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
