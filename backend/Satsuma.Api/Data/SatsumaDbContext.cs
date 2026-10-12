using Microsoft.EntityFrameworkCore;
using Satsuma.Api.Models;

namespace Satsuma.Api.Data;

public class SatsumaDbContext(DbContextOptions<SatsumaDbContext> options) : DbContext(options)
{
    public DbSet<Part> Parts => Set<Part>();
    public DbSet<Tires> Tires => Set<Tires>();
    public DbSet<Vehicle> Vehicles => Set<Vehicle>();
    public DbSet<MaintenanceEntry> MaintenanceEntries => Set<MaintenanceEntry>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Part>(part =>
        {
            part.Property(p => p.Price).HasPrecision(18, 2);
            part.Property(p => p.Type).HasConversion<string>();
            part.Property(p => p.Condition).HasConversion<string>();
            part.Property(p => p.Position).HasConversion<string>();
        });

        modelBuilder.Entity<Tires>(tires =>
        {
            tires.Property(t => t.TireType).HasConversion<string>();
            tires.ComplexProperty(t => t.TireSize!);
        });

        modelBuilder.Entity<Vehicle>(vehicle =>
        {
            vehicle
                .HasMany(v => v.MaintenanceEntries)
                .WithOne(e => e.Vehicle)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<MaintenanceEntry>(entry =>
        {
            entry.Property(e => e.Kind).HasConversion<string>();
            entry.Property(e => e.Cost).HasPrecision(18, 2);
            entry.HasIndex(e => new { e.VehicleId, e.PerformedOn });
            entry.HasMany(e => e.Parts).WithMany();
        });
    }
}
