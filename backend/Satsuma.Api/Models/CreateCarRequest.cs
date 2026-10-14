namespace Satsuma.Api.Models;

/// <summary>
/// Shape of the POST /Car request body. Deliberately separate from
/// <see cref="Vehicle"/>: binding straight to the entity would let a caller set
/// Id and MaintenanceEntries too, which is not theirs to choose (over-posting).
///
/// Properties, not fields — System.Text.Json ignores public fields by default
/// (JsonSerializerOptions.IncludeFields is false). A class full of fields
/// deserializes to all-defaults without any error.
/// </summary>
public class CreateCarRequest
{
    public required string Make { get; init; }
    public required string Model { get; init; }
    public int Year { get; init; }
    public string? Color { get; init; }
    public string? Vin { get; init; }
    public int OdometerReading { get; init; }
}
