import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { number: 2000, suffix: "+", label: "active users" },
  { number: 15, suffix: "+", label: "experience in the field" },
   { number: 8, suffix: "+", label: "Analysts & Developers" },
  { number: 98, suffix: "%", label: "Data Accuracy Rate" },
  { number: 8, suffix: "K+", label: "Portfolios Synced" },
  { number: 99, suffix: "%", label: "API Uptime" },
   { number: 5, suffix: "+", label: "Ecosystem Integrations" },
   { number: 50, suffix: "+", label: "AI Models & Signals" },
]

export default function StatsSection() {
  const cardsRef = useRef([])
  const numbersRef = useRef([])

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean)
    const numbers = numbersRef.current.filter(Boolean)

    // Fade-in animation for cards
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.1,
        }
      )
    })

    // Counter animation
    numbers.forEach((numberEl, index) => {
      const statCard = stats[index]
      const obj = { val: 0 }

      gsap.to(obj, {
        val: statCard.number,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: numberEl,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
        onUpdate() {
          if (numberEl) {
            numberEl.textContent = Math.floor(obj.val) + statCard.suffix
          }
        },
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="relative px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 bg-black/50 overflow-hidden">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-7xl mx-auto">
        {stats.map((stat, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="p-4 sm:p-6 rounded-lg sm:rounded-2xl border border-white/20 bg-black/40 hover:border-white/40 transition-colors backdrop-blur-md"
          >
            <div
              ref={(el) => (numbersRef.current[index] = el)}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 text-white"
            >
              0{stat.suffix}
            </div>
            <div className="text-white/60 text-xs sm:text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Glossy horizontal line at end */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </div>
  )
}
