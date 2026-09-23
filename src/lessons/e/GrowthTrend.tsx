import { E, E_STEP_N, compoundValue } from "./eMath"

const W = 240
const H = 130
const PAD_L = 32
const PAD_R = 10
const PAD_T = 10
const PAD_B = 8
const PLOT_W = W - PAD_L - PAD_R
const PLOT_H = H - PAD_T - PAD_B

const N_MAX = 200_000
const V_START = 2
const GRID = [0, 0.2, 0.4, 0.6, 0.8, 1]

function progress(value: number): number {
  const t = (value - V_START) / (E - V_START)
  return Math.min(1, Math.max(0, t))
}

function xForN(n: number): number {
  const f = Math.log(n) / Math.log(N_MAX)
  return PAD_L + Math.min(1, f) * PLOT_W
}

function yForT(t: number): number {
  return PAD_T + (1 - t) * PLOT_H
}

function buildCurve(): string {
  const samples = 100
  const pts: string[] = []
  for (let i = 0; i <= samples; i++) {
    const logN = (i / samples) * Math.log(N_MAX)
    const n = Math.exp(logN)
    const value = n <= 1 ? V_START : compoundValue(n)
    pts.push(`${xForN(n).toFixed(1)},${yForT(progress(value)).toFixed(1)}`)
  }
  return pts.join(" ")
}

const CURVE_POINTS = buildCurve()

interface GrowthTrendProps {
  step: number
}

export function GrowthTrend({ step }: GrowthTrendProps) {
  const n = E_STEP_N[step]
  if (n === null) return null

  const value = n === Infinity ? E : compoundValue(n)
  const markerX = n === Infinity ? PAD_L + PLOT_W : xForN(n)
  const markerY = yForT(progress(value))

  return (
    <div className="mt-5 inline-block border border-ink/15 rounded-lg px-4 py-3 bg-paper-dark/50">
      <div className="text-xs text-ink-faint mb-2 tracking-wide">Wie sich der Wert e nähert</div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="block">
        {GRID.map((t) => (
          <g key={t}>
            <line
              x1={PAD_L}
              y1={yForT(t)}
              x2={W - PAD_R}
              y2={yForT(t)}
              stroke="var(--color-ink)"
              strokeOpacity={t === 1 ? 1 : 0.12}
              strokeWidth={t === 1 ? 1.75 : 1}
            />
            <text
              x={PAD_L - 5}
              y={yForT(t) + 3}
              fontSize={8.5}
              textAnchor="end"
              fill="var(--color-ink-faint)"
            >
              {t.toFixed(1).replace(".", ",")}
            </text>
          </g>
        ))}

        <polyline points={CURVE_POINTS} fill="none" stroke="var(--color-ink)" strokeWidth={1.75} />

        <line
          x1={markerX}
          y1={markerY}
          x2={markerX}
          y2={PAD_T + PLOT_H}
          stroke="var(--color-accent)"
          strokeWidth={1}
          strokeDasharray="3 3"
        />
        <circle cx={markerX} cy={markerY} r={4.5} fill="var(--color-accent)" stroke="var(--color-ink)" strokeWidth={1} />

        <text x={PAD_L} y={H - 1} fontSize={8.5} fill="var(--color-ink-faint)">
          n = 1
        </text>
        <text x={W - PAD_R} y={H - 1} fontSize={8.5} textAnchor="end" fill="var(--color-ink-faint)">
          n → ∞
        </text>
      </svg>
      <div className="text-xs font-bold text-accent mt-1">
        n = {n === Infinity ? "∞" : n.toLocaleString("de-DE")} → {value.toFixed(4).replace(".", ",")}
      </div>
    </div>
  )
}
