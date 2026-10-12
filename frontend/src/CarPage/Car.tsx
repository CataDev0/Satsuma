import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getCar, type Car } from "../api"
import CarDetails from "./CarDetails"

function Loading() {
  return (
    <div
      className="mx-auto max-w-3xl animate-pulse px-gutter pt-8"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading car…</span>
      <div className="h-3 w-24 rounded-pill bg-surface-sunken" />
      <div className="mt-4 h-9 w-2/3 rounded-lg bg-surface-sunken" />
      <div className="mt-section h-48 rounded-card bg-surface-sunken" />
    </div>
  )
}

function Message({ title, body }: { title: string; body: string }) {
  return (
    <div className="mx-auto max-w-3xl px-gutter py-section" role="alert">
      <div className="rounded-card border border-line bg-surface p-gutter shadow-card">
        <h1 className="font-display text-lg font-semibold text-ink">{title}</h1>
        <p className="mt-1 text-sm break-words text-ink-muted">{body}</p>
        <Link
          to="/"
          className="mt-gutter inline-flex rounded-pill bg-brand-500 px-4 py-2 text-sm font-medium text-brand-900 transition-colors hover:bg-brand-400"
        >
          Back to all cars
        </Link>
      </div>
    </div>
  )
}

export default function CarPage() {
  const { carId } = useParams()

  const [result, setResult] = useState<{ carId: string; car: Car | null } | null>(null)
  const [failure, setFailure] = useState<{ carId: string; message: string } | null>(null)

  useEffect(() => {
    if (!carId) return

    const controller = new AbortController()

    getCar(carId, controller.signal)
      .then((car) => {
        if (controller.signal.aborted) return
        setResult({ carId, car })
      })
      .catch((cause: unknown) => {
        if (controller.signal.aborted) return
        setFailure({
          carId,
          message: cause instanceof Error ? cause.message : "Failed to load car",
        })
      })

    // Aborting also stops the setters above from firing after unmount.
    return () => controller.abort()
  }, [carId])

  // Derived state
  const loading = Boolean(carId) && result?.carId !== carId && failure?.carId !== carId
  const error = failure && failure.carId === carId ? failure.message : null
  const car = result && result.carId === carId ? result.car : null

  return (
    <div className="flex-1 bg-canvas text-left">
      {loading && <Loading />}

      {!loading && error && <Message title="Couldn't load this car" body={error} />}

      {!loading && !error && !car && (
        <Message title="No such car" body={`Nothing in the garage has id ${carId}.`} />
      )}

      {!loading && !error && car && <CarDetails car={car} />}
    </div>
  )
}
