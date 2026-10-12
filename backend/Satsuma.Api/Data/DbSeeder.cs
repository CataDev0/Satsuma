using Microsoft.EntityFrameworkCore;
using Satsuma.Api.Models;

namespace Satsuma.Api.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(SatsumaDbContext db, CancellationToken cancellationToken = default)
    {
        if (await db.Vehicles.AnyAsync(cancellationToken))
        {
            return;
        }

        var tires = new Tires("Hankook Ventus S1 Evo3 K127", PartCondition.New, Side.None)
        {
            PartNumber = "K127",
            Description = "245/35R19 93Y XL",
            Price = 199m,
            Quantity = 4,
            TireBrand = "Hankook",
            TireType = TireType.Summer,
            TireSize = new TireSize(245, 35, 19),
            TireProductionDate = new DateOnly(2025, 3, 1)
        };

        var oilFilter = new Part
        {
            Name = "Oil filter",
            PartNumber = "OF-152",
            Description = "Spin-on oil filter",
            Price = 12.5m,
            Quantity = 1,
            Type = PartType.Engine,
            Condition = PartCondition.New,
            Position = Side.None
        };

        var satsuma = new Vehicle
        {
            Make = "Satsuma",
            Model = "AMP",
            Year = 1974,
            Color = "Yellow",
            Vin = "SUMP0000000000001",
            OdometerReading = 132_450,
            MaintenanceEntries =
            {
                new MaintenanceEntry
                {
                    PerformedOn = new DateOnly(2026, 4, 2),
                    OdometerReading = 126_500,
                    Kind = MaintenanceKind.TireChange,
                    Description = "Fitted new summer tires",
                    Cost = 796m,
                    Parts = { tires }
                },
                new MaintenanceEntry
                {
                    PerformedOn = new DateOnly(2026, 5, 12),
                    OdometerReading = 128_000,
                    Kind = MaintenanceKind.OilChange,
                    Description = "Oil and filter change",
                    Cost = 57.5m,
                    Parts = { oilFilter }
                }
            }
        };

        var rivett = new Vehicle
        {
            Make = "Corris",
            Model = "Rivett",
            Year = 1971,
            Color = "Yellow",
            Vin = "BBDUKBBPLT870481NEBNBF-AJG184BMB",
            OdometerReading = 187_212,
        };

        db.Vehicles.Add(satsuma);
        db.Vehicles.Add(rivett);

        await db.SaveChangesAsync(cancellationToken);
    }
}
