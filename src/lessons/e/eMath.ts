export const E = Math.E

export function compoundValue(n: number): number {
  return (1 + 1 / n) ** n
}

export const CONV_N: (number | typeof Infinity)[] = [1, 2, 4, 12, 365, 8760, Infinity]

export function convValue(n: number | typeof Infinity): number {
  return n === Infinity ? E : compoundValue(n)
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
