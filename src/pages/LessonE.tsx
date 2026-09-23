import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { LessonHeader } from "../components/LessonHeader"
import { ScrollProgressBar } from "../components/ScrollProgressBar"
import { Scrollytelling } from "../components/Scrollytelling"
import { Formula } from "../components/Formula"
import { EGraphic } from "../lessons/e/EGraphic"

function Step({ children }: { children: ReactNode }) {
  return <div className="max-w-md">{children}</div>
}

const steps = [
  <Step key="0">
    <p className="text-2xl sm:text-3xl leading-snug font-hand text-ink">
      Stell dir vor, du legst <span className="text-accent">1 €</span> an — zu{" "}
      <span className="text-accent">100 % Zinsen</span> im Jahr.
    </p>
    <p className="mt-4 text-ink-soft">
      Was passiert, wenn die Bank dir die Zinsen nicht nur einmal, sondern immer öfter
      gutschreibt?
    </p>
  </Step>,

  <Step key="1">
    <p className="text-ink-soft mb-3">Die Bank schreibt die Zinsen einmal im Jahr gut.</p>
    <Formula tex="\left(1+1\right)^{1} = 2" display />
    <p className="mt-3 text-ink">
      Nach einem Jahr hast du <span className="text-accent font-bold">2 €</span>.
    </p>
  </Step>,

  <Step key="2">
    <p className="text-ink-soft mb-3">
      Jetzt gibt es die Zinsen zweimal im Jahr — jeweils zur Hälfte des Zinssatzes.
    </p>
    <Formula tex="\left(1+\tfrac{1}{2}\right)^{2} = 2{,}25" display />
    <p className="mt-3 text-ink-soft">Schon etwas mehr als vorher.</p>
  </Step>,

  <Step key="3">
    <p className="text-ink-soft mb-3">Vierteljährlich, also viermal im Jahr:</p>
    <Formula tex="\left(1+\tfrac{1}{4}\right)^{4} \approx 2{,}4414" display />
  </Step>,

  <Step key="4">
    <p className="text-ink-soft mb-3">Monatlich — zwölfmal im Jahr:</p>
    <Formula tex="\left(1+\tfrac{1}{12}\right)^{12} \approx 2{,}6130" display />
    <p className="mt-3 text-ink-soft">Der Zuwachs pro Schritt wird kleiner.</p>
  </Step>,

  <Step key="5">
    <p className="text-ink-soft mb-3">Täglich — 365-mal im Jahr:</p>
    <Formula tex="\left(1+\tfrac{1}{365}\right)^{365} \approx 2{,}7146" display />
    <p className="mt-3 text-ink-soft">
      Wir nähern uns einer ganz bestimmten Zahl — sieh dir die gestrichelte Linie an.
    </p>
  </Step>,

  <Step key="6">
    <p className="text-ink-soft mb-3">
      Stündlich, minütlich, sekündlich … was, wenn wir einfach{" "}
      <span className="text-accent">immer weiter</span> unterteilen?
    </p>
    <Formula tex="\left(1+\tfrac{1}{8760}\right)^{8760} \approx 2{,}7181" display />
  </Step>,

  <Step key="7">
    <p className="text-ink-soft mb-3">
      Je öfter wir verzinsen, desto näher kommen wir einer festen Grenze. Diese Zahl nennen
      wir <span className="text-accent font-hand text-2xl">e</span>.
    </p>
    <Formula tex="e = \lim_{n \to \infty} \left(1+\tfrac{1}{n}\right)^{n} \approx 2{,}718281828\ldots" display />
  </Step>,

  <Step key="8">
    <p className="text-ink-soft mb-3">
      Diese <span className="text-accent">Eulersche Zahl e</span> taucht überall dort auf, wo
      etwas kontinuierlich wächst oder zerfällt: Bakterienkulturen, radioaktiver Zerfall,
      stetige Verzinsung.
    </p>
    <Formula tex="A(t) = A_0 \cdot e^{rt}" display />
    <p className="mt-4 text-ink-faint text-sm">
      Und sie ist überraschend einfach entstanden: aus der Frage, wie oft man Zinsen
      gutschreiben kann.
    </p>
  </Step>,
]

export function LessonE() {
  return (
    <div className="min-h-screen pt-16 pb-24">
      <ScrollProgressBar />
      <LessonHeader topicName="Analysis" />

      <div className="max-w-3xl mx-auto px-5 mb-16 sm:mb-24 text-center">
        <h1 className="font-hand text-4xl sm:text-5xl text-ink mb-4">
          Woher kommt die Zahl <span className="text-accent">e</span>?
        </h1>
        <p className="text-ink-soft text-lg">
          Eine Herleitung über Zinseszins — scroll einfach weiter.
        </p>
      </div>

      <Scrollytelling steps={steps} graphic={(step) => <EGraphic step={step} />} />

      <div className="max-w-md mx-auto px-5 mt-20 text-center">
        <Link to="/" className="font-hand text-lg text-accent hover:underline">
          ← Zurück zum Board
        </Link>
      </div>
    </div>
  )
}
