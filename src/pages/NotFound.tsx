import { Link } from "react-router-dom"

export function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 text-center gap-4">
      <h1 className="font-hand text-5xl text-ink">Seite nicht gefunden</h1>
      <p className="text-ink-soft">Diese Lektion gibt es (noch) nicht.</p>
      <Link to="/" className="font-hand text-lg text-accent hover:underline">
        ← Zurück zum Board
      </Link>
    </div>
  )
}
