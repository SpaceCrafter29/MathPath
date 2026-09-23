export type LessonStatus = "available" | "coming-soon"

export interface Lesson {
  slug: string
  title: string
  teaser: string
  minutes: number
  status: LessonStatus
}

export interface Topic {
  id: string
  name: string
  description: string
  lessons: Lesson[]
}

export const topics: Topic[] = [
  {
    id: "analysis",
    name: "Analysis",
    description: "Grenzwerte, Wachstum, das Unendliche in kleinen Schritten.",
    lessons: [
      {
        slug: "e-zinseszins",
        title: "Woher kommt die Zahl e?",
        teaser: "Zinsen, die immer öfter gutgeschrieben werden — bis eine Konstante übrig bleibt.",
        minutes: 6,
        status: "available",
      },
      {
        slug: "ableitung-x2",
        title: "Die Ableitung von x²",
        teaser: "Warum die Steigung an jedem Punkt genau 2x ist.",
        minutes: 5,
        status: "coming-soon",
      },
      {
        slug: "grenzwert-folgen",
        title: "Was ist ein Grenzwert?",
        teaser: "Folgen, die sich einem Wert annähern, ohne ihn je zu erreichen.",
        minutes: 4,
        status: "coming-soon",
      },
    ],
  },
  {
    id: "geometrie",
    name: "Geometrie",
    description: "Formen, Winkel und die Konstanten, die sie verbinden.",
    lessons: [
      {
        slug: "was-ist-pi",
        title: "Was ist π?",
        teaser: "Ein Verhältnis, das bei jedem Kreis exakt gleich bleibt — egal wie groß.",
        minutes: 4,
        status: "available",
      },
      {
        slug: "pi-vielecke",
        title: "Wie berechnet man π genau?",
        teaser: "Ein Kreis, eingeschlossen von immer mehr Vielecken.",
        minutes: 6,
        status: "available",
      },
      {
        slug: "satz-des-pythagoras",
        title: "Der Satz des Pythagoras",
        teaser: "Warum a² + b² wirklich immer c² ergibt.",
        minutes: 5,
        status: "coming-soon",
      },
    ],
  },
  {
    id: "algebra",
    name: "Algebra",
    description: "Gleichungen, Muster und die Regeln dahinter.",
    lessons: [
      {
        slug: "quadratische-gleichung",
        title: "Die Mitternachtsformel",
        teaser: "Woher die Formel für quadratische Gleichungen wirklich kommt.",
        minutes: 7,
        status: "coming-soon",
      },
      {
        slug: "binomische-formeln",
        title: "Die binomischen Formeln",
        teaser: "Warum (a+b)² nicht a²+b² ist — geometrisch erklärt.",
        minutes: 4,
        status: "coming-soon",
      },
    ],
  },
  {
    id: "wahrscheinlichkeit",
    name: "Wahrscheinlichkeit",
    description: "Zufall, Erwartung und warum unsere Intuition oft täuscht.",
    lessons: [
      {
        slug: "geburtstagsparadox",
        title: "Das Geburtstagsparadox",
        teaser: "Warum in 23 Personen meist zwei am selben Tag Geburtstag haben.",
        minutes: 5,
        status: "coming-soon",
      },
      {
        slug: "monty-hall",
        title: "Das Monty-Hall-Problem",
        teaser: "Wechseln oder bleiben? Die Antwort überrascht fast jeden.",
        minutes: 6,
        status: "coming-soon",
      },
    ],
  },
]

export function findLesson(slug: string): { lesson: Lesson; topic: Topic } | undefined {
  for (const topic of topics) {
    const lesson = topic.lessons.find((l) => l.slug === slug)
    if (lesson) return { lesson, topic }
  }
  return undefined
}
