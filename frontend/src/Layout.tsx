import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import ThemeToggle from "./ThemeToggle"
import { ArrowLeftIcon } from "@heroicons/react/16/solid"

export default function Layout() {
  let location = useLocation()
  let navigate = useNavigate()
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-line bg-surface/85 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-gutter px-gutter py-2.5">
          <Link
            to="/"
            className="font-display text-xs font-semibold tracking-[0.14em] text-ink uppercase"
          >
            Satsuma
          </Link>
          {location.pathname !== "/" && (
            <>
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-1 rounded-pill bg-brand-500 px-2 py-1 text-sm font-medium text-brand-900 transition-colors hover:bg-brand-400"
              >
                <ArrowLeftIcon className="ml-1 inline-block size-3" />
                Back
              </button>
            </>
          )}
          <ThemeToggle />
        </div>
      </header>

      <Outlet />
    </>
  )
}
