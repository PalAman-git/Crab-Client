'use client'

export function ScrollPath({ pathRef }: { pathRef: any }) {
  return (
    <svg
      width="800"
      height="400"
      viewBox="0 0 800 400"
      fill="none"
    >
      <path
        ref={pathRef}
        d="M50 200 Q400 50 750 200"
        stroke="currentColor"
        strokeWidth="4"
      />
    </svg>
  )
}
