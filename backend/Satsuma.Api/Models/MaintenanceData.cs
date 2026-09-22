using System.Diagnostics.CodeAnalysis;

namespace Satsuma.Api.Models;

public class MaintenanceData
{
    public long DrivenDistance { get; set; }
    public DateOnly LastOilChange { get; set; }
    public DateOnly LastTireChange { get; set; }
    public Tires? Tires { get; set; }
}

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

public class TireSize
{
    public int Width { get; set; }
    public int Profile { get; set; }
    public int Diameter { get; set; }
    public string TireString => $"{Width}/{Profile}R{Diameter}";
    public override string ToString()
    {
        return TireString;
    }
    public static TireSize FromString(string tireString)
    {
        var parts = tireString.Split('/');
        if (parts.Length != 2)
        {
            throw new ArgumentException("Invalid tire size format. Expected format: 'Width/ProfileRDiameter'");
        }

        var width = int.Parse(parts[0]);
        var profileAndDiameter = parts[1].Split('R');
        if (profileAndDiameter.Length != 2)
        {
            throw new ArgumentException("Invalid tire size format. Expected format: 'Width/ProfileRDiameter'");
        }

        var profile = int.Parse(profileAndDiameter[0]);
        var diameter = int.Parse(profileAndDiameter[1]);

        return new TireSize
        {
            Width = width,
            Profile = profile,
            Diameter = diameter
        };
    }
}

public enum TireType
{
    Summer,
    Winter,
    AllSeason,
    Performance,
    OffRoad
}
