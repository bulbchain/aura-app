"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function NeonSphere() {
  const containerRef = useRef(null)
  const ringsRef = useRef([])

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1.3, ease: "power2.out" }
    )

    ringsRef.current.forEach((ring, i) => {
      gsap.to(ring, {
        rotation: 360,
        duration: 10 + i * 0.2,
        repeat: -1,
        ease: "linear",
        transformOrigin: "50% 50%",
      })
      gsap.to(ring, {
        opacity: 0.6 + i * 0.01,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    })
  }, [])

  return (
    <div
      ref={containerRef}
      className="
        fixed 
        top-1/2 left-1/2 
        -translate-x-1/2 -translate-y-1/2
        w-[1000px] h-[1000px]
        pointer-events-none
        opacity-100
        -z-50
        overflow-visible
      "
    >
      {/* background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[800px] rounded-full bg-white/10 blur-[120px]" />
      </div>

      {/* sphere */}
      <svg className="w-full h-full" viewBox="0 0 400 400">
        <defs>
          <radialGradient id="sphereGradient" cx="50%" cy="40%">
            <stop offset="0%" stopColor="#888" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#222" stopOpacity="0.2" />
          </radialGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter="url(#glow)">
          {Array.from({ length: 40 }).map((_, i) => (
            <ellipse
              key={i}
              ref={el => ringsRef.current[i] = el}
              cx="200"
              cy="200"
              rx="180"
              ry={100 + Math.sin(i * 0.2) * 40}
              fill="none"
              stroke="#aaa"
              strokeWidth={i % 5 === 0 ? 2 : 0.5}
              opacity={1 - i / 40}
            />
          ))}
        </g>

        <circle cx="200" cy="200" r="180" fill="none" stroke="url(#sphereGradient)" strokeWidth="3" />
      </svg>
    </div>
  )
}
