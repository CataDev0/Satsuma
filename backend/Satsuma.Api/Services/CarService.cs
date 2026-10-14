using Microsoft.EntityFrameworkCore;
using Satsuma.Api.Data;
using Satsuma.Api.Models;

namespace Satsuma.Api.Services;

public class CarService(SatsumaDbContext db)
{
    public async Task<List<Vehicle>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await db.Vehicles
            .OrderBy(v => v.Id)
            .Include(v => v.MaintenanceEntries)
                .ThenInclude(e => e.Parts)
            .ToListAsync(cancellationToken);
    }

    public async Task<Vehicle?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await db.Vehicles
            .Include(v => v.MaintenanceEntries)
                .ThenInclude(e => e.Parts)
            .FirstOrDefaultAsync(v => v.Id == id, cancellationToken);
    }

    public async Task<Vehicle> CreateCarAsync(CreateCarRequest request, CancellationToken cancellationToken = default)
    {
        var car = new Vehicle
        {
            Make = request.Make,
            Model = request.Model,
            Year = request.Year,
            Color = request.Color,
            Vin = request.Vin,
            OdometerReading = request.OdometerReading,
        };

        await db.Vehicles
            .AddAsync(car, cancellationToken);

        await db.SaveChangesAsync(cancellationToken);
        return car;
    }
}