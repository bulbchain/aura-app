// SwirlSphere.tsx
"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function SwirlSphere() {
  const groupRef = useRef(null)

  useEffect(() => {
    gsap.to(groupRef.current, {
      rotate: 360,
      duration: 20,
      repeat: -1,
      ease: "linear",
      transformOrigin: "center",
    })
  }, [])

  return (
        <div className="flex justify-center items-center py-24 h-96 relative" >

    <svg viewBox="0 0 400 400" className="w-96 h-96">
      <g ref={groupRef}>
        {Array.from({ length: 30 }).map((_, i) => (
          <ellipse
            key={i}
            cx="200"
            cy="200"
            rx="180"
            ry={100 + Math.sin(i * 0.2) * 40}
            stroke="#aaa"
            strokeWidth={i % 5 === 0 ? 2 : 0.5}
            fill="none"
            opacity={1 - i / 30}
          />
        ))}
      </g>
    </svg>
    </div>
  )
}
