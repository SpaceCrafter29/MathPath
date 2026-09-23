# MathPath

Mathe verstehen, nicht nur auswendig lernen. MathPath ist ein Board mit Mathe-Lektionen,
sortiert nach Themen. Jede Lektion ist ein Scrollytelling-Artikel: eine sticky Grafik
verändert sich Schritt für Schritt, während links der erklärende Text erscheint.

## Stack

- **React + TypeScript + Vite**
- **Tailwind CSS v4** für Styling (Cream/Beige-Hintergrund, schwarze Linien, oranger Akzent)
- **Framer Motion** für sanfte Übergänge zwischen den Grafik-Schritten
- **rough.js** für den handgezeichneten SVG-Look (Achsen, Vielecke, Kurven)
- **KaTeX** für Formeln
- **React Router** für Board- und Lektionsseiten
- Fonts: [Kalam](https://fonts.google.com/specimen/Kalam) (Überschriften/handschriftlich) +
  [Karla](https://fonts.google.com/specimen/Karla) (Fließtext), selbst gehostet via
  `@fontsource`

## Struktur

```
src/
  components/       # Scrollytelling, RoughCanvas, Formula, Header, ProgressBar
  data/lessons.ts    # Board-Inhalt: Themen + Lektionen
  lessons/           # Grafik-Logik je Lektion (e/, pi/)
  pages/             # Board.tsx, LessonE.tsx, LessonPi.tsx, NotFound.tsx
```

Neue Lektion hinzufügen:

1. Eintrag in `src/data/lessons.ts` (Status `"available"` setzen).
2. Grafik-Komponente unter `src/lessons/<slug>/` mit `RoughCanvas`.
3. Seite unter `src/pages/` mit `<Scrollytelling steps={...} graphic={...} />`.
4. Route in `src/App.tsx` ergänzen.

## Entwicklung

```bash
npm install
npm run dev       # Dev-Server
npm run build     # Production-Build (tsc + vite build)
npm run lint       # oxlint
```
