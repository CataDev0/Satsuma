using Microsoft.AspNetCore.Mvc;
using Satsuma.Api.Models;

namespace Satsuma.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class Maintenance : ControllerBase
{
    private string? Make { get; set; }
    private string? Model { get; set; }
    private string? Year { get; set; }
    private string? Color { get; set; }
    private string? Vin { get; set; }

    [HttpGet(Name = "GetMaintenance")]
    internal MaintenanceData Get()
    {
        return new MaintenanceData
            {
                DrivenDistance = 10000,
            };
    }
}
