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
}
