// RipplePulseSphere.tsx
"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function RipplePulseSphere() {
  const ringsRef = useRef([])

  useEffect(() => {
    ringsRef.current.forEach((ring, i) => {
      gsap.to(ring, {
        scale: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2,
        transformOrigin: "center",
      })
    })
  }, [])

  return (
    <div className="flex justify-center items-center py-24 h-96 relative" >

    <svg viewBox="0 0 400 400" className="w-96 h-96">
      {Array.from({ length: 6 }).map((_, i) => (
        <circle
          key={i}
          ref={el => ringsRef.current[i] = el}
          cx="200"
          cy="200"
          r={60 + i * 20}
          stroke="#ffffff"
          strokeWidth="2"
          fill="none"
          opacity={0.6 - i * 0.1}
        />
      ))}
    </svg>
    </div>
  )
}
