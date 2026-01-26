'use client'

import { useEffect, useRef } from "react"
import { initPhysics } from "./usePhysics"

export default function PhysicsBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // init physics and get cleanup
    const cleanup = initPhysics(containerRef.current)

    return () => {
      cleanup?.()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 1,
      }}
    />
  )
}
