import { type ComponentPropsWithoutRef, type FormEvent, type InputEvent, useEffect, useRef, useState } from "react"
import { createCar, type Car } from "../api"
import type { LookupResponse } from "../types/Lookups/noNO"
import React from "react"

/**
 * Uses the native <dialog> element rather than a positioned div: showModal()
 * promotes it to the browser's top layer (so it clears the sticky header in
 * Layout.tsx without any z-index), makes the page behind it inert, traps focus,
 * wires Escape to close, and returns focus to the trigger afterwards.
 */
type AddCarDialogProps = {
  open: boolean
  onClose: () => void
  /** The server's copy of the new car — id and all — so the list can show it. */
  onCreated: (car: Car) => void
}

const FIELD =
  "rounded-lg border border-line bg-canvas px-3 py-2 text-ink outline-none transition-colors focus-visible:border-brand-500 focus-visible:ring-2 focus-visible:ring-brand-500/30"

/** Wrapping the input in the <label> associates the two without needing ids. */
function Field({ label, ...input }: { label: string } & ComponentPropsWithoutRef<"input">, ref?: string) {
  return (
    <label className="grid gap-1.5 text-sm text-ink-muted">
      <span>{label}</span>
      <input id={ref} className={FIELD} {...input} />
    </label>
  )
}

export function AddCarDialog({ open, onClose, onCreated }: AddCarDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [failure, setFailure] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    if (open) {
      setFailure(null)
      setPending(false)
    }

    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Read the element before await. 
    const formEl = event.currentTarget

    const form = new FormData(formEl)
    const value = (name: string) => String(form.get(name) ?? "").trim()
    const optional = (name: string) => value(name) || null

    setPending(true)
    setFailure(null)

    try {
      const car = await createCar({
        make: value("make"),
        model: value("model"),
        year: Number(value("year")),
        color: optional("color"),
        vin: optional("vin"),
        odometerReading: Number(value("odometerReading")),
      })

      formEl.reset()
      onCreated(car)
      onClose()
    } catch (cause: unknown) {
      // Stay open so the input isn't thrown away.
      setFailure(cause instanceof Error ? cause.message : "Failed to add car")
      setPending(false)
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="add-car-title"
      // text-left: #root sets text-align: center for the landing page, so a
      // dialog with form labels inherits centering it doesn't want.
      className="m-auto max-h-[calc(100svh-2rem)] w-[min(32rem,calc(100vw-2rem))] rounded-card border border-line bg-surface text-left text-ink shadow-card"
    >
      <form onSubmit={handleSubmit} className="grid gap-gutter p-gutter">
        <div>
          <h2 id="add-car-title" className="font-display text-lg font-semibold text-ink">
            Add a car
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            Make, model and year are required. Everything else can be filled in later.
          </p>
        </div>

        {/* TODO: Add a lookup for the data using the license plate */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="licensePlateField" label="(Not Functional) Lookup details by license plate" name="license"></Field>
          <button type="button" onClick={(e) => LookupByLicensePlate(e, document.getElementById("licensePlateField")?.value)}>Submit</button>
          {/* TODO: Possibly restrict to Makes that exist */}
          <Field id="make" label="Make *" name="make" required />
          <Field id="model" label="Model *" name="model" required />
          <Field id="year" label="Year *" name="year" type="number" required min={1886} />
          {/* TODO: Color Picker? */}
          <Field id="color" label="Color" name="color" />
          <Field id="vin" label="VIN" name="vin" />
          <Field id="odometer" label="Odometer (km)" name="odometerReading" type="number" min={0} />
        </div>

        {failure && (
          <p role="alert" className="rounded-lg border border-line bg-surface-sunken px-3 py-2 text-sm text-ink">
            {failure}
          </p>
        )}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-pill px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-surface-sunken hover:text-ink"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={pending}
            className="rounded-pill bg-brand-500 px-4 py-2 text-sm font-medium text-brand-900 transition-colors hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Adding…" : "Add car"}
          </button>
        </div>
      </form>
    </dialog>
  )
}

async function LookupByLicensePlate(event: React.MouseEvent, licensePlate?: string): Promise<LookupResponse | void> {
  if (!licensePlate) {
    event.preventDefault();
    return;
  }
  const res = await fetch(`https://kjoretoyoppslag.atlas.vegvesen.no/ws/no/vegvesen/kjoretoy/kjoretoyoppslag/v3/oppslag/raw/${licensePlate}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    "referrerPolicy": "origin"
  })

  if (!res.ok) return;

  const data: LookupResponse = await res.json();
  const vehicle = data.kjoretoy;

  SetFieldData("make", vehicle.godkjenning.tekniskGodkjenning.tekniskeData.generelt.merke[0].merke);
  SetFieldData("model", vehicle.godkjenning.tekniskGodkjenning.tekniskeData.generelt.handelsbetegnelse[0]);
  SetFieldData("year", vehicle.godkjenning.forstegangsGodkjenning.forstegangRegistrertDato.slice(undefined, 4));
  SetFieldData("color", vehicle.godkjenning.tekniskGodkjenning.tekniskeData.karosseriOgLasteplan.rFarge[0].kodeNavn);
  SetFieldData("vin", vehicle.kjoretoyId.understellsnummer);
  SetFieldData("odometer", "0");

  return data as LookupResponse
}

function SetFieldData(field: string, value: string) {
  if (document.getElementById(field)) {
    document.getElementById(field)!.innerText = value
  }
}