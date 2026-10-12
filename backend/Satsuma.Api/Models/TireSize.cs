using System.Diagnostics.CodeAnalysis;

namespace Satsuma.Api.Models;

public sealed record TireSize : IParsable<TireSize>
{
    private const int MinWidth = 1;
    private const int MaxWidth = 1000;
    private const int MinProfile = 1;
    private const int MaxProfile = 100;
    private const int MinDiameter = 1;
    private const int MaxDiameter = 30;

    public TireSize(int width, int profile, int diameter)
    {
        ArgumentOutOfRangeException.ThrowIfLessThan(width, MinWidth);
        ArgumentOutOfRangeException.ThrowIfGreaterThan(width, MaxWidth);
        ArgumentOutOfRangeException.ThrowIfLessThan(profile, MinProfile);
        ArgumentOutOfRangeException.ThrowIfGreaterThan(profile, MaxProfile);
        ArgumentOutOfRangeException.ThrowIfLessThan(diameter, MinDiameter);
        ArgumentOutOfRangeException.ThrowIfGreaterThan(diameter, MaxDiameter);

        Width = width;
        Profile = profile;
        Diameter = diameter;
    }

    public int Width { get; init; }
    public int Profile { get; init; }
    public int Diameter { get; init; }

    public string TireString => $"{Width}/{Profile}R{Diameter}";

    public override string ToString()
    {
        return TireString;
    }

    public static TireSize Parse(string s, IFormatProvider? provider)
    {
        return TryParse(s, provider, out var size)
            ? size
            : throw new FormatException($"Invalid tire size '{s}'. Expected format: '245/35R19'.");
    }

    public static bool TryParse(
        [NotNullWhen(true)] string? s,
        IFormatProvider? provider,
        [MaybeNullWhen(false)] out TireSize result)
    {
        result = null;

        var parts = s?.Split('/');
        if (parts is not { Length: 2 })
        {
            return false;
        }

        var profileAndDiameter = parts[1].Split('R', 'r');
        if (profileAndDiameter.Length != 2)
        {
            return false;
        }

        if (!int.TryParse(parts[0], out var width) ||
            !int.TryParse(profileAndDiameter[0], out var profile) ||
            !int.TryParse(profileAndDiameter[1], out var diameter))
        {
            return false;
        }

        if (width is < MinWidth or > MaxWidth ||
            profile is < MinProfile or > MaxProfile ||
            diameter is < MinDiameter or > MaxDiameter)
        {
            return false;
        }

        result = new TireSize(width, profile, diameter);
        return true;
    }
}
