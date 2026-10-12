using System.Text.Json.Serialization;

namespace Satsuma.Api.Models;

public class MaintenanceEntry
{
    public int Id { get; set; }
    public int VehicleId { get; set; }
    [JsonIgnore] public Vehicle Vehicle { get; set; } = null!;
    public DateOnly PerformedOn { get; set; }
    public int OdometerReading { get; set; }
    public MaintenanceKind Kind { get; set; }
    public string? Description { get; set; }
    public decimal Cost { get; set; }
    public List<Part> Parts { get; set; } = [];
}
