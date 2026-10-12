import { type ComponentPropsWithoutRef, type FormEvent, useEffect, useRef } from "react"
import type { LookupResonse } from "../types/Lookups/noNO"

/**
 * Outline only — the form does not POST yet. See the TODO in handleSubmit.
 *
 * Uses the native <dialog> element rather than a positioned div: showModal()
 * promotes it to the browser's top layer (so it clears the sticky header in
 * Layout.tsx without any z-index), makes the page behind it inert, traps focus,
 * wires Escape to close, and returns focus to the trigger afterwards.
 */
type AddCarDialogProps = {
  open: boolean
  onClose: () => void
}

const FIELD =
  "rounded-lg border border-line bg-canvas px-3 py-2 text-ink outline-none transition-colors focus-visible:border-brand-500 focus-visible:ring-2 focus-visible:ring-brand-500/30"

/** Wrapping the input in the <label> associates the two without needing ids. */
function Field({ label, ...input }: { label: string } & ComponentPropsWithoutRef<"input">) {
  return (
    <label className="grid gap-1.5 text-sm text-ink-muted">
      <span>{label}</span>
      <input className={FIELD} {...input} />
    </label>
  )
}

export function AddCarDialog({ open, onClose }: AddCarDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  // showModal()/close() are imperative, so React state has to be pushed into
  // the DOM. Escape is why onClose exists below: it closes the dialog natively
  // without touching `open`, and if state is left saying "open" the trigger
  // stops working — the effect sees no change and never calls showModal again.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // TODO: POST /api/Car with new FormData(event.currentTarget), then
    // close only on success and refetch the list. On failure, keep the
    // dialog open so the input isn't thrown away.
    onClose()
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
          {/* TODO: Possibly restrict to Makes that exist */}
          <Field label="Make *" name="make" required />
          <Field label="Model *" name="model" required />
          <Field label="Year *" name="year" type="number" required min={1886} />
          {/* TODO: Color Picker? */}
          <Field label="Colour" name="color" />
          <Field label="VIN" name="vin" />
          <Field label="Odometer (km)" name="odometerReading" type="number" min={0} />
        </div>

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
            className="rounded-pill bg-brand-500 px-4 py-2 text-sm font-medium text-brand-900 transition-colors hover:bg-brand-400"
          >
            Add car
          </button>
        </div>
      </form>
    </dialog>
  )
}

async function LookupByLicensePlate({ licensePlate }: { licensePlate: string }): Promise<LookupResonse> {
  const res = await fetch(`https://kjoretoyoppslag.atlas.vegvesen.no/ws/no/vegvesen/kjoretoy/kjoretoyoppslag/v3/oppslag/raw/${licensePlate}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  })
  const data = await res.json()
  return data as LookupResonse
}

