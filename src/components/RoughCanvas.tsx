import { useEffect, useRef, type DependencyList } from "react"
import rough from "roughjs"
import type { RoughSVG } from "roughjs/bin/svg"

interface RoughCanvasProps {
  width: number
  height: number
  draw: (rc: RoughSVG, svg: SVGSVGElement) => void
  deps: DependencyList
  className?: string
  viewBox?: string
}

export function RoughCanvas({ width, height, draw, deps, className, viewBox }: RoughCanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    while (svg.firstChild) svg.removeChild(svg.firstChild)
    const rc = rough.svg(svg)
    draw(rc, svg)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      viewBox={viewBox ?? `0 0 ${width} ${height}`}
      className={className}
    />
  )
}

export const INK = "#1c1a17"
export const ACCENT = "#d9541f"
