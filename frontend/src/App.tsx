import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCars, type Car } from "./api"
import { formatDistance } from "./format"
import { accentFor } from "./CarPage/carColor"
import heroImg from "./assets/satsuma-cyl.svg"
import "./App.css"
import React from "react"
import { resources } from "./resources"
import { AddCarDialog } from "./components/AddCarDialog"

function App() {
  const [carsState, setCars] = useState<Car[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    getCars(controller.signal)
      .then(setCars)
      .catch((cause: unknown) => {
        if (controller.signal.aborted) return
        setError(cause instanceof Error ? cause.message : "Failed to load cars")
      })

    return () => controller.abort()
  }, [])

  const ResourceList = (
    <>
      {resources.map((resource) => (
        <li key={resource.url}>
          <a href={resource.url} target="_blank" rel="noreferrer">
            <img className="button-icon" src={resource.icon} alt="" />
            {resource.name}
          </a>
        </li>
      ))}
    </>
  )

  return (
    <>
      <section id="center">
        <div className="hero">
          <img
            src={heroImg}
            className="base p-1.5 -mb-20 overflow-visible"
            width="100"
            height="120"
            alt=""
          />
        </div>
        <div className="w-full max-w-3xl px-gutter pb-5">
          {error && (
            <p role="alert" className="rounded-card border border-line bg-surface p-4 text-sm">
              {error}
            </p>
          )}
          {carsState.length > 0 && (
            <>
              <h2 className="mb-gutter text-left">Garage</h2>
              <div className="mb-gutter flex justify-end">
                <AddCarButton />
              </div>
              <CarList cars={carsState} />
            </>
          )}
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Useful Resources</h2>
          <p>Car and Maintenance</p>
          <ul>{ResourceList}</ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Report issues to the Team</p>
          <ul>
            <li>
              <a href="https://github.com/catadev0/satsuma" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App

class CarList extends React.Component<{ cars: Car[] }> {
  render() {
    const { cars } = this.props
    return (
      <ul className="grid list-none gap-4 p-0 text-left sm:grid-cols-2">
        {cars.map((car) => (
          <li key={car.id} style={{ "--accent": accentFor(car.color) } as React.CSSProperties}>
            <Link
              to={`/car/${car.id}`}
              className="flex h-full flex-col rounded-card border border-line bg-surface p-gutter shadow-card transition-colors hover:border-[var(--accent)]"
            >
              <p className="flex items-center gap-2 text-xs text-ink-subtle">
                <span className="accent-dot size-2.5 shrink-0 rounded-pill" aria-hidden="true" />
                {car.color ?? "N/A"}
              </p>

              {/*
                Display car information
                {car.imageUrl && <img src={car.imageUrl} alt={`${car.make} ${car.model}`} />}
              */}

              <h3 className="mt-2 font-display text-lg leading-snug font-semibold text-ink">
                {car.year} {car.make} {car.model}
              </h3>

              <p className="mt-4 font-mono text-sm text-ink-muted tabular-nums">
                {formatDistance(car.odometerReading)}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    )
  }
}

function AddCarButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex cursor-pointer items-center gap-1 rounded-pill bg-brand-500 px-2 py-1 text-sm font-medium text-brand-900 transition-colors hover:bg-brand-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <span className="text-sm font-medium text-brand-900">Add Car</span>
      </button>

      <AddCarDialog open={open} onClose={() => setOpen(false)} />
    </>
  )
}
