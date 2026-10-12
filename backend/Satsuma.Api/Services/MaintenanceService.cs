using Microsoft.EntityFrameworkCore;
using Satsuma.Api.Data;
using Satsuma.Api.Models;

namespace Satsuma.Api.Services;

public class MaintenanceService(SatsumaDbContext db)
{
    public async Task<MaintenanceData> GetSummaryAsync(CancellationToken cancellationToken = default)
    {
        var vehicle = await db.Vehicles
            .OrderBy(v => v.Id)
            .Select(v => new { v.Id, v.OdometerReading })
            .FirstOrDefaultAsync(cancellationToken);

        if (vehicle is null)
        {
            return new MaintenanceData();
        }

        var entries = db.MaintenanceEntries.Where(e => e.VehicleId == vehicle.Id);

        var latestTireChange = await entries
            .Where(e => e.Kind == MaintenanceKind.TireChange)
            .OrderByDescending(e => e.PerformedOn)
            .ThenByDescending(e => e.Id)
            .Include(e => e.Parts)
            .FirstOrDefaultAsync(cancellationToken);

        return new MaintenanceData
        {
            OdometerReading = vehicle.OdometerReading,
            LastOilChange = await entries
                .Where(e => e.Kind == MaintenanceKind.OilChange)
                .MaxAsync(e => (DateOnly?)e.PerformedOn, cancellationToken),
            LastTireChange = latestTireChange?.PerformedOn,
            Tires = latestTireChange?.Parts.OfType<Tires>().FirstOrDefault()
        };
    }
}
