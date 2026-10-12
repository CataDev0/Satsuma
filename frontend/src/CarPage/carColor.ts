// Turns the car's `color` field into an accent the page can paint with.
// The API stores it as free text ("Yellow"), not a hex value, so names are
// mapped here and a raw hex passes straight through.

/** Used when a car has no colour on file, or one we don't recognise. */
export const DEFAULT_ACCENT = "#f0b429"

const NAMED: Record<string, string> = {
  beige: "#d8cdb4",
  black: "#1f1d1b",
  blue: "#2f6fd0",
  bronze: "#a9713c",
  brown: "#8a5a34",
  burgundy: "#7d2a3a",
  champagne: "#d9c9a3",
  cream: "#efe6d0",
  gold: "#c9a227",
  green: "#3f7d4e",
  grey: "#8a8781",
  gray: "#8a8781",
  maroon: "#6e2533",
  navy: "#1f3a63",
  orange: "#d9761f",
  pink: "#d17a92",
  purple: "#6d4a9c",
  red: "#c0392b",
  silver: "#b9bcc0",
  teal: "#2c7f7b",
  turquoise: "#3aa8a0",
  white: "#e8e6e1",
  yellow: "#e0b020",
}

const HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i

export function accentFor(color: string | null | undefined): string {
  if (!color) return DEFAULT_ACCENT

  const value = color.trim()
  if (HEX.test(value)) return value

  return NAMED[value.toLowerCase()] ?? DEFAULT_ACCENT
}
