import { Link } from "react-router-dom"

interface LessonHeaderProps {
  topicName: string
}

export function LessonHeader({ topicName }: LessonHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 py-3 backdrop-blur-sm bg-paper/80 border-b border-ink/10">
      <Link
        to="/"
        className="flex items-center gap-2 font-hand text-lg text-ink hover:text-accent transition-colors"
      >
        <span aria-hidden>←</span> MathPath
      </Link>
      <span className="font-hand text-sm text-ink-faint hidden sm:block">{topicName}</span>
    </header>
  )
}
