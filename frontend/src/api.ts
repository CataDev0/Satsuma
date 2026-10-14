// Wire types mirroring the C# models in backend/Satsuma.Api/Models.
// Names are camelCase here because ASP.NET Core's default JSON naming policy
// is camelCase; the C# types keep PascalCase.

export type Side = "Left" | "Right" | "Front" | "Rear" | "None"

export type PartCondition = "New" | "Used" | "Refurbished" | "Damaged"

export type PartType =
  | "Engine"
  | "Transmission"
  | "Suspension"
  | "Brakes"
  | "Electrical"
  | "Exhaust"
  | "Body"
  | "Interior"
  | "Tires"
  | "Other"

export type MaintenanceKind = "OilChange" | "TireChange" | "Inspection" | "Repair" | "Other"

export type Part = {
  id: number
  name: string
  partNumber: string | null
  description: string | null
  price: number
  quantity: number
  type: PartType
  condition: PartCondition
  position: Side
}

export type MaintenanceEntry = {
  id: number
  vehicleId: number
  /** DateOnly serializes as "2026-04-02" — a plain string, not a Date. */
  performedOn: string
  odometerReading: number
  kind: MaintenanceKind
  description: string | null
  cost: number
  parts: Part[]
}

export type Car = {
  id: number
  make: string
  model: string
  year: number
  color: string | null
  vin: string | null
  odometerReading: number
  maintenanceEntries: MaintenanceEntry[]
}

/** The writable half of a Car — mirrors CreateCarRequest.cs. */
export type NewCar = {
  make: string
  model: string
  year: number
  color: string | null
  vin: string | null
  odometerReading: number
}

/**
 * One request returns every car with its maintenance entries embedded.
 * Throws on a non-2xx response: fetch only rejects on network failure.
 */
export async function getCars(signal?: AbortSignal): Promise<Car[]> {
  const response = await fetch("/api/Car", { signal })

  if (!response.ok) {
    throw new Error(`GET /api/Car failed: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export async function getCar(carId: string, signal?: AbortSignal): Promise<Car | null> {
  const response = await fetch(`/api/Car/${carId}`, { signal })

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`GET /api/Car/${carId} failed: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export async function createCar(car: NewCar): Promise<Car> {
  const response = await fetch("/api/Car", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(car),
  })

  if (!response.ok) {
    throw new Error(`POST /api/Car failed: ${response.status} ${response.statusText}`)
  }

  return response.json()
}
