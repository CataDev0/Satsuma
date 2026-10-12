namespace Satsuma.Api.Models;

public class Part
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public string? PartNumber { get; set; }
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
    public required PartType Type { get; set; }
    public required PartCondition Condition { get; set; }
    public required Side Position { get; set; }
}
