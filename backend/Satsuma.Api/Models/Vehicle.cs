namespace Satsuma.Api.Models;

public class Vehicle
{
    public int Id { get; set; }
    public required string Make { get; set; }
    public required string Model { get; set; }
    public int Year { get; set; }
    public string? Color { get; set; }
    public string? Vin { get; set; }
    public int OdometerReading { get; set; }
    public List<MaintenanceEntry> MaintenanceEntries { get; } = [];
}
