import { Link } from "react-router-dom"
import { topics } from "../data/lessons"

const CARD_RADII = [
  "255px 12px 225px 12px / 12px 225px 12px 255px",
  "12px 255px 12px 225px / 225px 12px 255px 12px",
  "225px 15px 255px 12px / 12px 255px 15px 225px",
  "15px 225px 12px 255px / 255px 12px 225px 15px",
]

export function Board() {
  return (
    <div className="min-h-screen px-5 py-14 sm:py-20 max-w-5xl mx-auto">
      <header className="mb-16 sm:mb-24">
        <h1 className="font-hand text-5xl sm:text-6xl text-ink mb-3">
          Math<span className="text-accent">Path</span>
        </h1>
        <p className="text-ink-soft text-lg max-w-xl leading-relaxed">
          Mathe verstehen, nicht nur auswendig lernen. Wähle eine Lektion und scroll dich
          Schritt für Schritt durch die Herleitung.
        </p>
      </header>

      <div className="flex flex-col gap-16 sm:gap-20">
        {topics.map((topic) => (
          <section key={topic.id}>
            <div className="mb-6 flex items-baseline gap-3">
              <h2 className="font-hand text-3xl text-ink">{topic.name}</h2>
              <span className="h-px flex-1 bg-ink/15" aria-hidden />
            </div>
            <p className="text-ink-faint mb-6 -mt-3 text-sm">{topic.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {topic.lessons.map((lesson, i) => {
                const available = lesson.status === "available"
                const rotate = i % 2 === 0 ? "-0.4deg" : "0.5deg"
                const cardInner = (
                  <div
                    style={{
                      borderRadius: CARD_RADII[i % CARD_RADII.length],
                      transform: `rotate(${rotate})`,
                    }}
                    className={`h-full border-[1.5px] p-5 flex flex-col gap-3 transition-all duration-200 ${
                      available
                        ? "border-ink bg-paper hover:border-accent hover:-translate-y-1 hover:shadow-[3px_4px_0_0_var(--color-accent)]"
                        : "border-ink/25 bg-paper/60"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className={`font-hand text-xl leading-snug ${
                          available ? "text-ink" : "text-ink-faint"
                        }`}
                      >
                        {lesson.title}
                      </h3>
                    </div>
                    <p className={`text-sm leading-relaxed flex-1 ${available ? "text-ink-soft" : "text-ink-faint"}`}>
                      {lesson.teaser}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className={available ? "text-accent" : "text-ink-faint"}>
                        {available ? `${lesson.minutes} Min.` : "Bald verfügbar"}
                      </span>
                      {available && <span className="text-ink-faint">→ öffnen</span>}
                    </div>
                  </div>
                )

                return available ? (
                  <Link key={lesson.slug} to={`/lesson/${lesson.slug}`} className="block">
                    {cardInner}
                  </Link>
                ) : (
                  <div key={lesson.slug} className="cursor-not-allowed" aria-disabled>
                    {cardInner}
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-24 text-center text-ink-faint text-sm">
        Handgezeichnet. Schritt für Schritt. <span className="text-accent">MathPath</span>
      </footer>
    </div>
  )
}
