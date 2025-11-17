// WaveformSphere.tsx
"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function WaveformSphere() {
  const linesRef = useRef([])

  useEffect(() => {
    linesRef.current.forEach((line, i) => {
      gsap.to(line, {
        y: Math.sin(i) * 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.1,
      })
    })
  }, [])

  return (
        <div className="flex justify-center items-center py-24 h-96 relative" >

    <svg viewBox="0 0 400 400" className="w-96 h-96">
      {Array.from({ length: 20 }).map((_, i) => (
        <path
          key={i}
          ref={el => linesRef.current[i] = el}
          d={`M20 ${20 + i * 15} Q200 ${40 + i * 10}, 380 ${20 + i * 15}`}
          stroke="#fff"
          strokeWidth="1"
          fill="none"
          opacity={0.7}
        />
      ))}
    </svg>
    </div>
  )
}
