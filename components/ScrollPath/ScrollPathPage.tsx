'use client'

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { svgDrawOnScroll } from "@/gsap/animations/svgDraw"
import { ScrollPath } from "./ScrollPath"

const ScrollPathPage = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useGSAP(() => {
    if (!sectionRef.current || !pathRef.current) return

    svgDrawOnScroll({
      path: pathRef.current,
      trigger: sectionRef.current,
      start: "top center",
      end: "bottom center",
      scrub: 1,
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} style={{ minHeight: "200vh" }}>
      <h2>Scroll to draw the path</h2>
      <ScrollPath pathRef={pathRef} />
    </section>
  )
}

export default ScrollPathPage;