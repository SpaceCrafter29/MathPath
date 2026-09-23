import { CONV_N, E, E_STEP_N, convValue } from "./eMath"

const W = 200
const H = 60
const PAD = 8
const V_MIN = 1.9
const V_MAX = 2.8

function x(i: number): number {
  return PAD + (i / (CONV_N.length - 1)) * (W - PAD * 2)
}

function y(v: number): number {
  const t = (v - V_MIN) / (V_MAX - V_MIN)
  return H - PAD - t * (H - PAD * 2)
}

interface GrowthTrendProps {
  step: number
}

export function GrowthTrend({ step }: GrowthTrendProps) {
  const n = E_STEP_N[step]
  if (n === null) return null

  const revealCount = Math.min(step, CONV_N.length)
  if (revealCount < 2) return null

  const shown = CONV_N.slice(0, revealCount)
  const points = shown.map((nn, i) => [x(i), y(convValue(nn))] as const)
  const path = points.map(([px, py]) => `${px},${py}`).join(" ")

  const delta = convValue(CONV_N[revealCount - 1]) - convValue(CONV_N[revealCount - 2])

  return (
    <div className="mt-5 inline-block border border-ink/15 rounded-lg px-4 py-3 bg-paper-dark/50">
      <div className="text-xs text-ink-faint mb-1.5 tracking-wide">Zuwachs pro Schritt</div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="block">
        <line
          x1={PAD}
          y1={y(E)}
          x2={W - PAD}
          y2={y(E)}
          stroke="var(--color-ink-faint)"
          strokeWidth={1}
          strokeDasharray="3 3"
        />
        <polyline
          points={path}
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map(([px, py], i) => {
          const isLast = i === points.length - 1
          return (
            <circle
              key={i}
              cx={px}
              cy={py}
              r={isLast ? 4.5 : 3}
              fill={isLast ? "var(--color-accent)" : "var(--color-paper)"}
              stroke="var(--color-ink)"
              strokeWidth={1.2}
            />
          )
        })}
      </svg>
      <div className="text-xs font-bold text-accent mt-1.5">
        +{delta.toFixed(delta < 0.01 ? 5 : 4).replace(".", ",")} ggü. vorher
      </div>
    </div>
  )
}
