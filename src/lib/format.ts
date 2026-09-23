export function fmt(n: number, digits = 4): string {
  return n.toLocaleString("de-DE", { minimumFractionDigits: digits, maximumFractionDigits: digits })
}

export function fmtInt(n: number): string {
  return n.toLocaleString("de-DE")
}
