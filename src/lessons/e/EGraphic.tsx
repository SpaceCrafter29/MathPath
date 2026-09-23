import type { RoughSVG } from "roughjs/bin/svg"
import { ACCENT, INK, RoughCanvas } from "../../components/RoughCanvas"

const W = 440
const H = 340
const PAD_L = 58
const PAD_R = 26
const PAD_T = 30
const PAD_B = 46

const V_MIN = 1
const V_MAX = 2.85
const E = Math.E

function valueToY(v: number): number {
  const t = (v - V_MIN) / (V_MAX - V_MIN)
  return H - PAD_B - t * (H - PAD_B - PAD_T)
}

function fracToX(f: number): number {
  return PAD_L + f * (W - PAD_L - PAD_R)
}

function compoundValue(n: number): number {
  return (1 + 1 / n) ** n
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

export const E_STEP_N: (number | typeof Infinity | null)[] = [
  null, // 0 intro
  1,
  2,
  4,
  12,
  365,
  8760,
  Infinity,
  Infinity,
]

function drawAxes(rc: RoughSVG, svg: SVGSVGElement) {
  const axisOpts = { stroke: INK, strokeWidth: 1.5, roughness: 1.6 }
  svg.appendChild(
    rc.line(PAD_L, PAD_T - 6, PAD_L, H - PAD_B, axisOpts),
  )
  svg.appendChild(
    rc.line(PAD_L, H - PAD_B, W - PAD_R, H - PAD_B, axisOpts),
  )
  addText(svg, PAD_L - 10, H - PAD_B + 22, "0", { size: 13, color: INK, anchor: "middle" })
  addText(svg, W - PAD_R, H - PAD_B + 22, "1 Jahr", { size: 13, color: INK, anchor: "end" })
  addText(svg, PAD_L - 10, valueToY(1) + 4, "1€", { size: 13, color: INK, anchor: "end" })
}

function drawEReference(svg: SVGSVGElement, rc: RoughSVG, strong: boolean) {
  const y = valueToY(E)
  const g = rc.line(PAD_L, y, W - PAD_R, y, {
    stroke: strong ? ACCENT : INK,
    strokeWidth: strong ? 2 : 1,
    strokeLineDash: [6, 5],
    roughness: 1.2,
  })
  svg.appendChild(g)
  addText(svg, W - PAD_R, y - 8, `e ≈ 2,71828…`, {
    size: strong ? 16 : 13,
    color: strong ? ACCENT : INK,
    anchor: "end",
    weight: strong ? "bold" : undefined,
  })
}

export function EGraphic({ step }: { step: number }) {
  return (
    <RoughCanvas
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      className="max-w-full h-auto"
      deps={[step]}
      draw={(rc, svg) => {
        drawAxes(rc, svg)
        const n = E_STEP_N[step]

        if (n === null) {
          const y0 = valueToY(1)
          svg.appendChild(rc.circle(PAD_L, y0, 10, { fill: INK, fillStyle: "solid", stroke: INK }))
          addText(svg, PAD_L + 16, y0 - 10, "Start: 1 €, 100 % Zins/Jahr", { size: 14, color: INK })
          return
        }

        const showE = step >= 5
        if (showE) drawEReference(svg, rc, step >= 7)

        if (n === Infinity) {
          const points: [number, number][] = []
          const steps = 60
          for (let i = 0; i <= steps; i++) {
            const f = i / steps
            const v = E ** f
            points.push([fracToX(f), valueToY(v)])
          }
          svg.appendChild(
            rc.curve(points, { stroke: ACCENT, strokeWidth: 2.5, roughness: 1.3 }),
          )
          const [lastX, lastY] = points[points.length - 1]
          svg.appendChild(rc.circle(lastX, lastY, 12, { fill: ACCENT, fillStyle: "solid", stroke: INK }))
          addText(svg, PAD_L + 6, PAD_T + 6, "n → ∞ (stetige Verzinsung)", { size: 13, color: INK })
          return
        }

        const useStairs = n <= 12
        const points: [number, number][] = []
        const samples = useStairs ? n : Math.min(n, 80)
        for (let k = 0; k <= samples; k++) {
          const frac = k / samples
          const nAtK = (frac * n)
          const v = nAtK === 0 ? 1 : (1 + 1 / n) ** nAtK
          points.push([fracToX(frac), valueToY(v)])
        }

        if (useStairs) {
          const stairPoints: [number, number][] = []
          for (let k = 0; k <= n; k++) {
            const v = (1 + 1 / n) ** k
            const x = fracToX(k / n)
            const y = valueToY(v)
            if (k > 0) stairPoints.push([x, stairPoints[stairPoints.length - 1][1]])
            stairPoints.push([x, y])
          }
          svg.appendChild(rc.linearPath(stairPoints, { stroke: INK, strokeWidth: 2, roughness: 1.4 }))
          for (let k = 0; k <= n; k++) {
            const v = (1 + 1 / n) ** k
            svg.appendChild(
              rc.circle(fracToX(k / n), valueToY(v), 7, {
                fill: k === n ? ACCENT : "#f4ead4",
                fillStyle: "solid",
                stroke: INK,
                strokeWidth: 1.3,
              }),
            )
          }
        } else {
          svg.appendChild(rc.curve(points, { stroke: INK, strokeWidth: 2, roughness: 1.3 }))
          const [lastX, lastY] = points[points.length - 1]
          svg.appendChild(rc.circle(lastX, lastY, 9, { fill: ACCENT, fillStyle: "solid", stroke: INK }))
        }

        const finalValue = compoundValue(n)
        const [fx, fy] = points[points.length - 1]
        addText(svg, fx - 8, fy - 16, finalValue.toFixed(4).replace(".", ","), {
          size: 15,
          color: ACCENT,
          anchor: "end",
          weight: "bold",
        })
        addText(svg, PAD_L + 6, PAD_T + 6, `n = ${n.toLocaleString("de-DE")}`, { size: 14, color: INK })
      }}
    />
  )
}
