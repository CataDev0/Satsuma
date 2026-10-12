namespace Satsuma.Api.Models;

public class MaintenanceData
{
    public int OdometerReading { get; set; }
    public DateOnly? LastOilChange { get; set; }
    public DateOnly? LastTireChange { get; set; }
    public Tires? Tires { get; set; }
}
