import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState, type ReactNode } from "react"

interface ScrollytellingProps {
  steps: ReactNode[]
  graphic: (activeStep: number) => ReactNode
  onStepChange?: (step: number) => void
}

export function Scrollytelling({ steps, graphic, onStepChange }: ScrollytellingProps) {
  const [active, setActive] = useState(0)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-step-index"))
            setActive(idx)
            onStepChange?.(idx)
          }
        }
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    )
    const refs = stepRefs.current
    refs.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps.length])

  return (
    <div className="relative flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 max-w-6xl mx-auto px-5">
      <div className="order-2 lg:order-1">
        {steps.map((content, i) => (
          <div
            key={i}
            ref={(el) => {
              stepRefs.current[i] = el
            }}
            data-step-index={i}
            className="min-h-[62vh] lg:min-h-[80vh] flex items-center py-6"
          >
            <div
              className={`transition-all duration-500 ${
                active === i ? "opacity-100 translate-y-0" : "opacity-35 translate-y-1"
              }`}
            >
              {content}
            </div>
          </div>
        ))}
      </div>

      <div className="order-1 lg:order-2 sticky top-16 h-[42vh] lg:h-[calc(100vh-4rem)] flex items-center justify-center z-10 bg-paper lg:bg-transparent border-b border-ink/10 lg:border-none shadow-[0_8px_16px_-12px_rgba(28,26,23,0.35)] lg:shadow-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.94, rotate: -0.6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-full flex items-center justify-center"
          >
            {graphic(active)}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
