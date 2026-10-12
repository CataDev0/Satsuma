using System.Diagnostics.CodeAnalysis;

namespace Satsuma.Api.Models;

public class Tires : Part
{
    [SetsRequiredMembers]
    public Tires(string name, PartCondition condition, Side position)
    {
        Name = name;
        Condition = condition;
        Position = position;
        Type = PartType.Tires;
    }

    public string? TireBrand { get; set; }
    public TireType TireType { get; set; }
    public TireSize? TireSize { get; set; }
    public DateOnly? TireProductionDate { get; set; }
}
