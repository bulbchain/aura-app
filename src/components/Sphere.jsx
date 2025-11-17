"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function Sphere() {
  const containerRef = useRef(null)
  const ringsRef = useRef([])

  useEffect(() => {
    // Animate sphere container into view
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out", delay: 0.6 },
    )

    // Animate inner rings with subtle rotation and pulsing
    ringsRef.current.forEach((ring, i) => {
      gsap.to(ring, {
        rotation: 360,
        transformOrigin: "50% 50%",
        duration: 10 + i * 0.2,
        repeat: -1,
        ease: "linear",
      })
      gsap.to(ring, {
        opacity: 0.6 + i * 0.01,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.05,
      })
    })
  }, [])

  return (
    
    <div ref={containerRef} className="flex justify-center items-center py-24 h-96 relative">
      
      {/* Glowing sphere background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-80 h-80 rounded-full bg-gradient-to-b from-white/20 to-transparent blur-3xl" />
      </div>

      {/* SVG Sphere with wavy lines */}
      <svg className="w-96 h-96 relative z-10" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="sphereGradient" cx="50%" cy="40%">
            <stop offset="0%" stopColor="#444444" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#222222" stopOpacity="0.2" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
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
              stroke={i % 3 === 0 ? "#ffffff" : "#999999"}
              strokeWidth={i % 5 === 0 ? 2 : 0.5}
              opacity={1 - i / 40}
            />
          ))}
        </g>

        {/* Darker outer rim */}
        <circle cx="200" cy="200" r="180" fill="none" stroke="url(#sphereGradient)" strokeWidth="3" />
      </svg>
       <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </div>
  )
}
