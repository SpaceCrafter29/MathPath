import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { LessonHeader } from "../components/LessonHeader"
import { ScrollProgressBar } from "../components/ScrollProgressBar"
import { Scrollytelling } from "../components/Scrollytelling"
import { Formula } from "../components/Formula"
import { PiGraphic } from "../lessons/pi/PiGraphic"

function Step({ children }: { children: ReactNode }) {
  return <div className="max-w-md">{children}</div>
}

const steps = [
  <Step key="0">
    <p className="text-2xl sm:text-3xl leading-snug font-hand text-ink">
      Wie misst man den Umfang eines <span className="text-accent">Kreises</span> genau?
    </p>
    <p className="mt-4 text-ink-soft">
      Ein Kreis mit Durchmesser 1. Sein Umfang ist genau <span className="text-accent">π</span>
      — aber woher wissen wir das eigentlich?
    </p>
  </Step>,

  <Step key="1">
    <p className="text-ink-soft mb-3">
      Idee von Archimedes: Zeichne ein Vieleck <span className="text-accent">in</span> den
      Kreis hinein. Ein Sechseck ist einfach zu berechnen.
    </p>
    <Formula tex="U_6 = 6 \cdot \sin(30^\circ) \approx 3{,}0000" display />
  </Step>,

  <Step key="2">
    <p className="text-ink-soft mb-3">Verdoppeln wir die Seiten: ein Zwölfeck.</p>
    <Formula tex="U_{12} = 12 \cdot \sin(15^\circ) \approx 3{,}1058" display />
    <p className="mt-3 text-ink-soft">Das Vieleck schmiegt sich enger an den Kreis.</p>
  </Step>,

  <Step key="3">
    <p className="text-ink-soft mb-3">Nochmal verdoppelt: 24 Ecken.</p>
    <Formula tex="U_{24} \approx 3{,}1326" display />
  </Step>,

  <Step key="4">
    <p className="text-ink-soft mb-3">48 Ecken — kaum noch vom Kreis zu unterscheiden.</p>
    <Formula tex="U_{48} \approx 3{,}1394" display />
  </Step>,

  <Step key="5">
    <p className="text-ink-soft mb-3">
      96 Ecken — genau die Zahl, mit der Archimedes um 250 v. Chr. gearbeitet hat.
    </p>
    <Formula tex="U_{96} \approx 3{,}1410" display />
  </Step>,

  <Step key="6">
    <p className="text-ink-soft mb-3">192 Ecken. Die Zahl bewegt sich kaum noch.</p>
    <Formula tex="U_{192} \approx 3{,}1414" display />
    <p className="mt-3 text-ink-soft">Sie nähert sich einem festen Wert an.</p>
  </Step>,

  <Step key="7">
    <p className="text-ink-soft mb-3">
      Je mehr Ecken, desto näher am Kreis. Im Grenzwert wird aus dem Vieleck der Kreis selbst.
    </p>
    <Formula tex="\pi = \lim_{n \to \infty} n \cdot \sin\!\left(\tfrac{180^\circ}{n}\right) \approx 3{,}14159265\ldots" display />
  </Step>,

  <Step key="8">
    <p className="text-ink-soft mb-3">
      So hat Archimedes π eingegrenzt — ganz ohne Trigonometrie-Tafeln oder Computer, nur mit
      Vielecken und viel Geduld.
    </p>
    <p className="mt-4 text-ink-faint text-sm">
      Heutige Computer nutzen andere Formeln, aber das Prinzip bleibt: eine unbekannte Zahl
      durch immer bessere Näherungen einkreisen.
    </p>
  </Step>,
]

export function LessonPi() {
  return (
    <div className="min-h-screen pt-16 pb-24">
      <ScrollProgressBar />
      <LessonHeader topicName="Geometrie" />

      <div className="max-w-3xl mx-auto px-5 mb-16 sm:mb-24 text-center">
        <h1 className="font-hand text-4xl sm:text-5xl text-ink mb-4">
          Wie berechnet man <span className="text-accent">π</span>?
        </h1>
        <p className="text-ink-soft text-lg">
          Eine Herleitung über eingeschriebene Vielecke — scroll einfach weiter.
        </p>
      </div>

      <Scrollytelling steps={steps} graphic={(step) => <PiGraphic step={step} />} />

      <div className="max-w-md mx-auto px-5 mt-20 text-center">
        <Link to="/" className="font-hand text-lg text-accent hover:underline">
          ← Zurück zum Board
        </Link>
      </div>
    </div>
  )
}
