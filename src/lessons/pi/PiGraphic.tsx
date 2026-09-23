import type { RoughSVG } from "roughjs/bin/svg"
import { ACCENT, INK, RoughCanvas } from "../../components/RoughCanvas"

const W = 380
const H = 380
const CX = 178
const CY = 178
const R = 132

export const PI_STEP_N: (number | typeof Infinity | null)[] = [
  null, // 0 intro
  6,
  12,
  24,
  48,
  96,
  192,
  Infinity,
  Infinity,
]

function approxPi(n: number): number {
  return n * Math.sin(Math.PI / n)
}

function polygonPoints(n: number): [number, number][] {
  const points: [number, number][] = []
  for (let k = 0; k < n; k++) {
    const angle = -Math.PI / 2 + (k * 2 * Math.PI) / n
    points.push([CX + R * Math.cos(angle), CY + R * Math.sin(angle)])
  }
  return points
}

function addText(
  svg: SVGSVGElement,
  x: number,
  y: number,
  text: string,
  opts: { size?: number; color?: string; anchor?: "start" | "middle" | "end"; weight?: string } = {},
) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", "text")
  el.setAttribute("x", String(x))
  el.setAttribute("y", String(y))
  el.setAttribute("font-family", "Kalam, cursive")
  el.setAttribute("font-size", String(opts.size ?? 15))
  el.setAttribute("fill", opts.color ?? INK)
  el.setAttribute("text-anchor", opts.anchor ?? "start")
  if (opts.weight) el.setAttribute("font-weight", opts.weight)
  el.textContent = text
  svg.appendChild(el)
}

function drawCircle(rc: RoughSVG, svg: SVGSVGElement, faint: boolean) {
  svg.appendChild(
    rc.circle(CX, CY, R * 2, {
      stroke: faint ? INK : ACCENT,
      strokeWidth: faint ? 1.2 : 2.2,
      roughness: 1.4,
      fill: "none",
    }),
  )
}

export function PiGraphic({ step }: { step: number }) {
  return (
    <RoughCanvas
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      className="max-w-full h-auto"
      deps={[step]}
      draw={(rc, svg) => {
        const n = PI_STEP_N[step]

        if (n === null) {
          drawCircle(rc, svg, false)
          addText(svg, CX, CY + 6, "d = 1", { size: 16, color: INK, anchor: "middle", weight: "bold" })
          svg.appendChild(
            rc.line(CX - R, CY, CX + R, CY, { stroke: INK, strokeWidth: 1.3, roughness: 1.3 }),
          )
          return
        }

        if (n === Infinity) {
          drawCircle(rc, svg, false)
          addText(svg, CX, CY - 6, "π", { size: 34, color: ACCENT, anchor: "middle", weight: "bold" })
          addText(svg, CX, CY + 22, "3,14159265…", { size: 15, color: INK, anchor: "middle" })
          addText(svg, 14, 26, "n → ∞: Vieleck = Kreis", { size: 13, color: INK })
          return
        }

        drawCircle(rc, svg, true)
        const pts = polygonPoints(n)
        svg.appendChild(
          rc.polygon(pts, { stroke: INK, strokeWidth: 2, roughness: 1.3, fill: "none" }),
        )
        if (n <= 24) {
          for (const [x, y] of pts) {
            svg.appendChild(
              rc.circle(x, y, 6, { fill: ACCENT, fillStyle: "solid", stroke: INK, strokeWidth: 1 }),
            )
          }
        }

        const value = approxPi(n)
        addText(svg, 14, 26, `n = ${n} Ecken`, { size: 14, color: INK })
        addText(svg, CX, H - 22, `≈ ${value.toFixed(4).replace(".", ",")}`, {
          size: 18,
          color: ACCENT,
          anchor: "middle",
          weight: "bold",
        })
      }}
    />
  )
}
