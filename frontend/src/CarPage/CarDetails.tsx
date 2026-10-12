import { Fragment, type CSSProperties, type ReactNode } from "react"
import type { Car, MaintenanceKind, Part } from "../api"
import { formatDate, formatDistance, formatMoney } from "../format"
import { accentFor } from "./carColor"
import { ClickToCopy } from "../components/ClickToCopy"

const KIND_LABEL: Record<MaintenanceKind, string> = {
  OilChange: "Oil change",
  TireChange: "Tire change",
  Inspection: "Inspection",
  Repair: "Repair",
  Other: "Other",
}

/** A titled block: small caps label, then a card holding a table. */
function Section({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <section className="mt-section first:mt-0">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="font-display text-xs font-semibold tracking-[0.14em] text-ink-subtle uppercase">
          {title}
        </h2>
        {hint && <span className="text-xs text-ink-subtle">{hint}</span>}
      </div>
      <div className="overflow-hidden rounded-card border border-line bg-surface shadow-card">
        {children}
      </div>
    </section>
  )
}

/** Label/value pairs — the workhorse for the spec sections. */
function SpecTable({ rows }: { rows: { label: string; value: ReactNode; mono?: boolean }[] }) {
  return (
    <table className="w-full border-collapse text-left">
      <tbody>
        {rows.map((row) => (
          <tr key={row.label} className="border-t border-line first:border-t-0">
            <th
              scope="row"
              className="w-2/5 px-gutter py-4 align-top text-sm font-normal text-ink-muted sm:w-1/3"
            >
              {row.label}
            </th>
            <td
              className={[
                "px-gutter py-4 align-top text-ink",
                row.mono ? "font-mono text-sm break-all" : "text-base",
              ].join(" ")}
            >
              {row.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs tracking-[0.1em] text-ink-subtle uppercase">{label}</dt>
      <dd className="mt-1 font-display text-xl text-ink tabular-nums sm:text-2xl">{value}</dd>
    </div>
  )
}

function PartList({ parts }: { parts: Part[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {parts.map((part) => (
        <li
          key={part.id}
          className="rounded-pill border border-line bg-surface-sunken px-3 py-1.5 text-xs text-ink-muted"
        >
          <span className="font-medium text-ink">{part.name}</span>
          {part.partNumber && (
            <span className="ml-1.5 font-mono text-ink-subtle">{part.partNumber}</span>
          )}
          <span className="ml-1.5 tabular-nums text-ink-subtle">×{part.quantity}</span>
        </li>
      ))}
    </ul>
  )
}

function MaintenanceTable({ entries }: { entries: Car["maintenanceEntries"] }) {
  if (entries.length === 0) {
    return (
      <p className="px-gutter py-10 text-center text-sm text-ink-muted">
        No maintenance recorded for this car yet.
      </p>
    )
  }

  return (
    <table className="w-full border-collapse text-left">
      <thead>
        <tr className="bg-surface-sunken">
          {["Date", "Service", "Odometer", "Cost"].map((heading, index) => (
            <th
              key={heading}
              scope="col"
              className={[
                "px-gutter py-3 text-xs font-semibold tracking-[0.1em] text-ink-subtle uppercase",
                index === 0 ? "w-32" : "",
                index > 1 ? "text-right" : "",
              ].join(" ")}
            >
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {entries.map((entry) => (
          <Fragment key={entry.id}>
            <tr className="border-t border-line align-top">
              <td className="px-gutter py-4 text-sm whitespace-nowrap text-ink-muted tabular-nums">
                {formatDate(entry.performedOn)}
              </td>
              <td className="px-gutter py-4">
                <span className="accent-soft inline-flex rounded-pill px-2.5 py-1 text-xs font-medium">
                  {KIND_LABEL[entry.kind]}
                </span>
                {entry.description && (
                  <p className="mt-2 text-sm text-ink-muted">{entry.description}</p>
                )}
              </td>
              <td className="px-gutter py-4 text-right text-sm whitespace-nowrap text-ink tabular-nums">
                {formatDistance(entry.odometerReading)}
              </td>
              <td className="px-gutter py-4 text-right font-mono text-sm whitespace-nowrap text-ink tabular-nums">
                {formatMoney(entry.cost)}
              </td>
            </tr>
            {entry.parts.length > 0 && (
              <tr>
                <td colSpan={4} className="px-gutter pb-4">
                  <PartList parts={entry.parts} />
                </td>
              </tr>
            )}
          </Fragment>
        ))}
      </tbody>
    </table>
  )
}

export default function CarDetails({ car }: { car: Car }) {
  const accent = accentFor(car.color)

  // Newest first. ISO dates sort correctly as plain strings, so this needs no
  // Date objects — and returns a copy, leaving the prop untouched.
  const entries = [...car.maintenanceEntries].sort((a, b) =>
    b.performedOn.localeCompare(a.performedOn),
  )

  const totalSpent = entries.reduce((sum, entry) => sum + entry.cost, 0)

  return (
    <article className="text-left" style={{ "--accent": accent } as CSSProperties}>
      <header className="accent-glow relative overflow-hidden border-b border-line">
        <div className="mx-auto max-w-3xl px-gutter pt-12 pb-10 sm:pt-16">
          <p className="flex items-center gap-2 text-sm text-ink-muted">
            <span className="accent-dot size-2.5 shrink-0 rounded-pill" aria-hidden="true" />
            {car.color ?? "Colour not recorded"}
          </p>

          <h1 className="mt-3 font-display text-3xl leading-tight font-semibold tracking-tight text-ink sm:text-4xl">
            {car.year} {car.make} {car.model}
          </h1>

          {car.vin && (
            <p className="mt-2 font-mono text-sm break-all text-ink-subtle">
              <ClickToCopy text={car.vin} />
            </p>
          )}

          <dl className="mt-section grid grid-cols-2 gap-gutter border-t border-line pt-6 sm:grid-cols-4">
            <Stat label="Odometer" value={formatDistance(car.odometerReading)} />
            <Stat label="Services" value={String(entries.length)} />
            <Stat
              label="Last service"
              value={entries[0] ? formatDate(entries[0].performedOn) : "—"}
            />
            <Stat label="Total spent" value={formatMoney(totalSpent)} />
          </dl>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-gutter py-section">
        <Section title="Vehicle">
          <SpecTable
            rows={[
              { label: "Make", value: car.make },
              { label: "Model", value: car.model },
              { label: "Year", value: String(car.year) },
              { label: "VIN", value: <ClickToCopy text={car.vin ?? "—"} />, mono: true },
            ]}
          />
        </Section>

        <Section title="Condition & usage">
          <SpecTable
            rows={[
              {
                label: "Colour",
                value: (
                  <span className="flex items-center gap-2">
                    <span
                      className="accent-dot size-3.5 shrink-0 rounded-pill ring-1 ring-line"
                      aria-hidden="true"
                    />
                    {car.color ?? "—"}
                  </span>
                ),
              },
              { label: "Odometer", value: formatDistance(car.odometerReading) },
            ]}
          />
        </Section>

        <Section title="Maintenance history" hint={`${entries.length} recorded`}>
          <MaintenanceTable entries={entries} />
        </Section>
      </div>
    </article>
  )
}
