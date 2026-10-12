import { useState } from "react"

type Mode = "light" | "dark"

/**
 * Must match the key read by the inline script in index.html. That script runs
 * before first paint — which is what stops a dark-mode reload flashing white —
 * and it can't import from here, so the string is unavoidably written twice.
 */
export const THEME_STORAGE_KEY = "satsuma-theme"

const SUN =
  "M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"

const MOON =
  "M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"

/**
 * What is on screen right now: the stored choice if the inline script applied
 * one, otherwise whatever the OS asked for. Reading the DOM rather than
 * localStorage keeps this in sync with the pre-paint script by construction.
 */
function currentMode(): Mode {
  const root = document.documentElement
  if (root.classList.contains("dark")) return "dark"
  if (root.classList.contains("light")) return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode>(currentMode)

  function toggle() {
    const next: Mode = mode === "dark" ? "light" : "dark"

    // The class is the whole mechanism: theme.css keys off [data-theme] via
    // color-scheme, and every token is a light-dark() pair resolved from it.
    const root = document.documentElement
    root.classList.toggle("dark", next === "dark")
    root.classList.toggle("light", next === "light")
    setMode(next)

    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // Storage blocked (private mode, disabled cookies): the toggle still
      // works for this page, it just won't be remembered next visit.
    }
  }

  const target = mode === "dark" ? "light" : "dark"

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${target} theme`}
      title={`Switch to ${target} theme`}
      className="inline-flex size-9 items-center justify-center rounded-pill border border-line text-ink-muted transition-colors hover:bg-surface-sunken hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
    >
      {/* Icon shows where the click takes you, matching the label. */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-5"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={mode === "dark" ? SUN : MOON} />
      </svg>
    </button>
  )
}
