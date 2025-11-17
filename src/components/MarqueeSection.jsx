import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const techStack = [
  "Kubernetes", "Kafka", "Solana", "React", "Node.js", "Docker", "TypeScript",
  "GraphQL", "MongoDB", "PostgreSQL", "Redis", "Next.js", "Tailwind CSS",
  "Ethereum", "Rust", "Web3.js", "IPFS", "gRPC", "Jenkins","Terraform","X402"
]

export default function MarqueeSection() {
  const marqueeRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".marquee-track", {
        xPercent: -50,
        repeat: -1,
        duration: 30,
        ease: "linear",
      })
    }, marqueeRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={marqueeRef}
      className="relative w-full py-12 sm:py-16 md:py-20 overflow-hidden"
    >
      {/* Glowing Egglets */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-purple-400 blur-2xl rounded-full opacity-50 animate-pulse z-10" />
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-purple-400 blur-2xl rounded-full opacity-50 animate-pulse z-10" />

      {/* Marquee */}
      <div className="relative overflow-hidden">
        <div className="marquee-track flex whitespace-nowrap gap-12 text-white text-xl sm:text-2xl font-semibold px-4">
          {[...techStack, ...techStack].map((tech, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
             <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </section>
  )
}
