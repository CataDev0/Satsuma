using Microsoft.AspNetCore.Mvc;
using Satsuma.Api.Models;
using Satsuma.Api.Services;

namespace Satsuma.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class Car(CarService cars) : ControllerBase
{
    [HttpGet(Name = "GetCars")]
    public async Task<ActionResult<List<Vehicle>>> Get(CancellationToken cancellationToken)
    {
        return await cars.GetAllAsync(cancellationToken);
    }

    [HttpGet("{id:int}", Name = "GetCar")]
    public async Task<ActionResult<Vehicle>> GetById(int id, CancellationToken cancellationToken)
    {
        var vehicle = await cars.GetByIdAsync(id, cancellationToken);
        return vehicle is null ? NotFound() : vehicle;
    }
}
