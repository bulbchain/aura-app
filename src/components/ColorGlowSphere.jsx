// ColorGlowSphere.tsx
"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function ColorGlowSphere() {
  const ringsRef = useRef([])

  useEffect(() => {
    ringsRef.current.forEach((ring, i) => {
      gsap.to(ring, {
        stroke: "#ff00ff",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: i * 0.1,
      })
    })
  }, [])

  return (
    <div className="flex justify-center items-center py-24 h-96 relative" >

    <svg viewBox="0 0 400 400" className="w-96 h-96">
      <defs>
        <radialGradient id="colorGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#00ffff" />
          <stop offset="100%" stopColor="#0000ff" />
        </radialGradient>
      </defs>
      {Array.from({ length: 20 }).map((_, i) => (
        <circle
          key={i}
          ref={el => ringsRef.current[i] = el}
          cx="200"
          cy="200"
          r={50 + i * 5}
          stroke="url(#colorGlow)"
          strokeWidth="1.5"
          fill="none"
          opacity={0.8 - i * 0.03}
        />
      ))}
    </svg>
    </div>
  )
}
