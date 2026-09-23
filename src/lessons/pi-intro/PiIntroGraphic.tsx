import type { RoughSVG } from "roughjs/bin/svg"
import { ACCENT, INK, RoughCanvas } from "../../components/RoughCanvas"

const W = 380
const H = 380
const CX = 190
const CY = 190

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

function drawCircle(rc: RoughSVG, svg: SVGSVGElement, r: number, accent = false) {
  svg.appendChild(
    rc.circle(CX, CY, r * 2, {
      stroke: accent ? ACCENT : INK,
      strokeWidth: 2.2,
      roughness: 1.4,
      fill: "none",
    }),
  )
}

type Scenario =
  | { kind: "intro" }
  | { kind: "diameter" }
  | { kind: "circumference" }
  | { kind: "ratio"; r: number; d: string; u: string }
  | { kind: "constant" }
  | { kind: "formula" }
  | { kind: "teaser" }

const SCENARIOS: Scenario[] = [
  { kind: "intro" },
  { kind: "diameter" },
  { kind: "circumference" },
  { kind: "ratio", r: 55, d: "2 cm", u: "6,28 cm" },
  { kind: "ratio", r: 100, d: "10 cm", u: "31,42 cm" },
  { kind: "ratio", r: 150, d: "1.000 m", u: "3.141,59 m" },
  { kind: "constant" },
  { kind: "formula" },
  { kind: "teaser" },
]

export function PiIntroGraphic({ step }: { step: number }) {
  const scenario = SCENARIOS[Math.min(step, SCENARIOS.length - 1)]

  return (
    <RoughCanvas
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      className="max-w-full h-auto"
      deps={[step]}
      draw={(rc, svg) => {
        if (scenario.kind === "intro") {
          drawCircle(rc, svg, 110)
          addText(svg, CX, CY + 14, "?", { size: 48, color: ACCENT, anchor: "middle", weight: "bold" })
          return
        }

        if (scenario.kind === "diameter") {
          drawCircle(rc, svg, 110)
          svg.appendChild(
            rc.line(CX - 110, CY, CX + 110, CY, { stroke: ACCENT, strokeWidth: 2.2, roughness: 1.2 }),
          )
          addText(svg, CX, CY - 12, "d", { size: 20, color: ACCENT, anchor: "middle", weight: "bold" })
          addText(svg, CX, H - 30, "Durchmesser: einmal quer durch die Mitte", { size: 12.5, color: INK, anchor: "middle" })
          return
        }

        if (scenario.kind === "circumference") {
          drawCircle(rc, svg, 110, true)
          addText(svg, CX, CY + 4, "U", { size: 20, color: ACCENT, anchor: "middle", weight: "bold" })
          addText(svg, CX, H - 30, "Umfang: einmal komplett herum", { size: 12.5, color: INK, anchor: "middle" })
          return
        }

        if (scenario.kind === "ratio") {
          drawCircle(rc, svg, scenario.r)
          svg.appendChild(
            rc.line(CX - scenario.r, CY, CX + scenario.r, CY, {
              stroke: ACCENT,
              strokeWidth: 1.8,
              roughness: 1.2,
            }),
          )
          addText(svg, CX, CY - 8, `d = ${scenario.d}`, { size: 13, color: ACCENT, anchor: "middle", weight: "bold" })
          addText(svg, CX, 30, `U = ${scenario.u}`, { size: 13, color: INK, anchor: "middle" })
          addText(svg, CX, H - 22, "U ÷ d ≈ 3,14159…", {
            size: 17,
            color: ACCENT,
            anchor: "middle",
            weight: "bold",
          })
          return
        }

        if (scenario.kind === "constant") {
          const positions = [
            { cx: 90, cy: 230, r: 38 },
            { cx: 190, cy: 180, r: 62 },
            { cx: 300, cy: 250, r: 88 },
          ]
          for (const p of positions) {
            svg.appendChild(rc.circle(p.cx, p.cy, p.r * 2, { stroke: INK, strokeWidth: 1.8, roughness: 1.4, fill: "none" }))
            svg.appendChild(
              rc.line(p.cx - p.r, p.cy, p.cx + p.r, p.cy, { stroke: ACCENT, strokeWidth: 1.4, roughness: 1.2 }),
            )
          }
          addText(svg, CX, 60, "U ÷ d ist bei allen dreien exakt gleich", { size: 14, color: INK, anchor: "middle" })
          addText(svg, CX, 340, "π ≈ 3,14159265…", { size: 26, color: ACCENT, anchor: "middle", weight: "bold" })
          return
        }

        if (scenario.kind === "formula") {
          drawCircle(rc, svg, 120)
          svg.appendChild(
            rc.line(CX, CY, CX + 120, CY, { stroke: ACCENT, strokeWidth: 2, roughness: 1.2 }),
          )
          addText(svg, CX + 55, CY - 10, "r", { size: 18, color: ACCENT, anchor: "middle", weight: "bold" })
          addText(svg, CX, CY + 60, "π", { size: 40, color: ACCENT, anchor: "middle", weight: "bold" })
          addText(svg, CX, H - 30, "U = π · d = 2π · r", { size: 15, color: INK, anchor: "middle" })
          return
        }

        drawCircle(rc, svg, 110)
        svg.appendChild(
          rc.polygon(
            Array.from({ length: 6 }, (_, k) => {
              const angle = -Math.PI / 2 + (k * 2 * Math.PI) / 6
              return [CX + 110 * Math.cos(angle), CY + 110 * Math.sin(angle)] as [number, number]
            }),
            { stroke: INK, strokeWidth: 1.4, roughness: 1.6, fill: "none" },
          ),
        )
        addText(svg, CX, H - 30, "Aber wie berechnet man π genau …?", { size: 14, color: INK, anchor: "middle" })
      }}
    />
  )
}
