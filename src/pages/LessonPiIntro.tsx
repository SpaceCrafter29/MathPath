import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { LessonHeader } from "../components/LessonHeader"
import { ScrollProgressBar } from "../components/ScrollProgressBar"
import { Scrollytelling } from "../components/Scrollytelling"
import { Formula } from "../components/Formula"
import { PiIntroGraphic } from "../lessons/pi-intro/PiIntroGraphic"

function Step({ children }: { children: ReactNode }) {
  return <div className="max-w-md">{children}</div>
}

const steps = [
  <Step key="0">
    <p className="text-2xl sm:text-3xl leading-snug font-hand text-ink">
      Was verbindet eigentlich <span className="text-accent">jeden Kreis</span> miteinander —
      egal wie groß?
    </p>
    <p className="mt-4 text-ink-soft">Schauen wir's uns an.</p>
  </Step>,

  <Step key="1">
    <p className="text-ink-soft">
      Jeder Kreis hat einen <span className="text-accent font-bold">Durchmesser d</span> — die
      Strecke von einem Rand zum anderen, durch die Mitte.
    </p>
  </Step>,

  <Step key="2">
    <p className="text-ink-soft">
      Und einen <span className="text-accent font-bold">Umfang U</span> — die Strecke einmal
      komplett herum.
    </p>
  </Step>,

  <Step key="3">
    <p className="text-ink-soft mb-3">
      Nehmen wir einen kleinen Kreis mit Durchmesser <strong>d = 2 cm</strong>. Sein Umfang:
      U ≈ 6,28 cm.
    </p>
    <Formula tex="U \div d \approx 3{,}14159" display />
  </Step>,

  <Step key="4">
    <p className="text-ink-soft mb-3">
      Ein viel größerer Kreis, <strong>d = 10 cm</strong>. Umfang U ≈ 31,42 cm.
    </p>
    <Formula tex="U \div d \approx 3{,}14159" display />
    <p className="mt-3 text-ink-soft">Genau dasselbe Verhältnis wie beim kleinen Kreis.</p>
  </Step>,

  <Step key="5">
    <p className="text-ink-soft mb-3">
      Sogar ein riesiger Kreis, <strong>d = 1.000 m</strong>. Umfang U ≈ 3.141,59 m.
    </p>
    <Formula tex="U \div d \approx 3{,}14159" display />
    <p className="mt-3 text-ink-soft">Immer noch exakt dasselbe.</p>
  </Step>,

  <Step key="6">
    <p className="text-ink-soft mb-3">
      Egal wie groß der Kreis ist — das Verhältnis von Umfang zu Durchmesser bleibt{" "}
      <span className="text-accent">exakt gleich</span>. Diese Konstante nennen wir{" "}
      <span className="text-accent font-hand text-2xl">π</span>.
    </p>
  </Step>,

  <Step key="7">
    <p className="text-ink-soft mb-3">
      Damit lässt sich der Umfang jedes Kreises berechnen — man muss nur Radius oder
      Durchmesser kennen:
    </p>
    <Formula tex="U = \pi \cdot d = 2\pi \cdot r" display />
  </Step>,

  <Step key="8">
    <p className="text-ink-soft mb-3">
      Aber woher kommt eigentlich die Zahl <span className="text-accent">3,14159…</span>? Kann
      man π berechnen, ohne einen echten Kreis abzumessen?
    </p>
    <p className="mt-4 text-ink-faint text-sm">
      Genau das schauen wir uns in der nächsten Lektion an — mit Vielecken.
    </p>
    <Link
      to="/lesson/pi-vielecke"
      className="mt-4 inline-block font-hand text-lg text-accent hover:underline"
    >
      Weiter zu "Wie berechnet man π genau?" →
    </Link>
  </Step>,
]

export function LessonPiIntro() {
  return (
    <div className="min-h-screen pt-16 pb-24">
      <ScrollProgressBar />
      <LessonHeader topicName="Geometrie" />

      <div className="max-w-3xl mx-auto px-5 mb-16 sm:mb-24 text-center">
        <h1 className="font-hand text-4xl sm:text-5xl text-ink mb-4">
          Was ist <span className="text-accent">π</span>?
        </h1>
        <p className="text-ink-soft text-lg">
          Eine Konstante, die in jedem Kreis steckt — scroll einfach weiter.
        </p>
      </div>

      <Scrollytelling steps={steps} graphic={(step) => <PiIntroGraphic step={step} />} />

      <div className="max-w-md mx-auto px-5 mt-20 text-center">
        <Link to="/" className="font-hand text-lg text-accent hover:underline">
          ← Zurück zum Board
        </Link>
      </div>
    </div>
  )
}
