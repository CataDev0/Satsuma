// Locale-aware formatters. Everything user-visible that isn't a plain string
// goes through here, so switching LOCALE/CURRENCY in config.ts changes the
// whole app rather than one screen.

import { CURRENCY, DISTANCE, LOCALE } from "./config"

const integer = new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 0 })

const money = new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency: CURRENCY,
})

export function formatDistance(kilometres: number): string {
  const value = integer.format(kilometres / DISTANCE.perKilometre)
  return `${value} ${DISTANCE.label}`
}

export function formatMoney(value: number): string {
  return money.format(value)
}

/**
 * "2026-04-02" -> "2 Apr 2026".
 *
 * Split by hand instead of `new Date(iso)`: a bare ISO date is parsed as UTC
 * midnight, so west of Greenwich it renders as the *previous* day. Building
 * from local parts sidesteps the timezone entirely.
 */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number)
  return new Date(year, month - 1, day).toLocaleDateString(LOCALE, {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}
