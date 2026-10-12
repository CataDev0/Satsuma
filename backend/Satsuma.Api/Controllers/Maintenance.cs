using Microsoft.AspNetCore.Mvc;
using Satsuma.Api.Models;
using Satsuma.Api.Services;

namespace Satsuma.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class Maintenance(MaintenanceService maintenance) : ControllerBase
{
    [HttpGet(Name = "GetMaintenance")]
    public async Task<ActionResult<MaintenanceData>> Get(CancellationToken cancellationToken)
    {
        return await maintenance.GetSummaryAsync(cancellationToken);
    }
}
