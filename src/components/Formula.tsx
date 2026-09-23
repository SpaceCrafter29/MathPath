import katex from "katex"
import "katex/dist/katex.min.css"
import { useMemo } from "react"

interface FormulaProps {
  tex: string
  display?: boolean
  className?: string
}

export function Formula({ tex, display = false, className }: FormulaProps) {
  const html = useMemo(
    () =>
      katex.renderToString(tex, {
        displayMode: display,
        throwOnError: false,
      }),
    [tex, display],
  )
  // eslint-disable-next-line react/no-danger
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />
}
