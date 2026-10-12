import { useState } from "react"

export function ClickToCopy({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <button
      title="Click to copy"
      aria-label="Click to copy"
      className="cursor-pointer px-2 py-1 text-sm font-mono text-ink-muted transition-colors hover:bg-surface-hover hover:text-ink"
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      }}
    >
      {text}
      <span className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink">
        {copied ? <CheckIcon /> : <CopyIcon />}
      </span>
    </button>
  )
}

function CopyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-4"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
      <span className="sr-only"> Copied</span>
    </>
  )
}
