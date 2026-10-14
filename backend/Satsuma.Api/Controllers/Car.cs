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

    /// <summary>
    /// [ApiController] infers [FromBody] for a complex-type parameter, and the
    /// JSON input formatter deserializes the request body into it. The action
    /// never sees a string — declaring the parameter type *is* the parsing.
    /// </summary>
    [HttpPost(Name = "CreateCar")]
    public async Task<ActionResult<Vehicle>> CreateCar(CreateCarRequest request, CancellationToken cancellationToken)
    {
        var vehicle = await cars.CreateCarAsync(request, cancellationToken);

        // 201 + Location: /Car/{id}, using the route name declared above.
        return CreatedAtRoute("GetCar", new { id = vehicle.Id }, vehicle);
    }
}
