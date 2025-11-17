"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function Rocket() {
  const rocketRef = useRef(null)
  const flameRef = useRef(null)

  useEffect(() => {
    // Fade-in + scale animation for rocket
    gsap.fromTo(
      rocketRef.current,
      { opacity: 0, scale: 0.8, y: 100 },
      { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "power2.out" }
    )

    // Flame pulsing effect
    gsap.to(flameRef.current, {
      scaleY: 1.3,
      opacity: 0.9,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      duration: 0.2,
    })

    // Slight floating animation for rocket
    gsap.to(rocketRef.current, {
      y: "-=10",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      duration: 2.5,
    })
  }, [])

  return (
    <div className="flex justify-center items-center h-screen bg-black relative overflow-hidden">
      {/* Glowing ambient background */}
      <div className="absolute w-[600px] h-[600px] bg-cyan-500/20 blur-[150px] rounded-full"></div>

      {/* Rocket SVG */}
      <svg
        ref={rocketRef}
        className="relative z-10 w-48 h-96 drop-shadow-[0_0_15px_rgba(0,200,255,0.4)]"
        viewBox="0 0 200 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="rocketBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#222" />
            <stop offset="100%" stopColor="#000" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Rocket Body */}
        <polygon
          points="100,10 130,100 130,300 70,300 70,100"
          fill="url(#rocketBody)"
          stroke="#0ff"
          strokeWidth="0.8"
          filter="url(#glow)"
        />

        {/* Cockpit */}
        <ellipse cx="100" cy="70" rx="15" ry="20" fill="none" stroke="#0ff" strokeWidth="1" />

        {/* Wings */}
        <polygon points="70,200 40,250 70,260" fill="none" stroke="#0ff" strokeWidth="0.8" />
        <polygon points="130,200 160,250 130,260" fill="none" stroke="#0ff" strokeWidth="0.8" />

        {/* Engine */}
        <rect x="85" y="300" width="30" height="40" fill="none" stroke="#0ff" strokeWidth="1" />
      </svg>

      {/* Blue Flame */}
      <div
        ref={flameRef}
        className="absolute bottom-[120px] left-1/2 -translate-x-1/2 w-10 h-32 bg-gradient-to-b from-cyan-300 via-blue-600 to-transparent blur-2xl rounded-full opacity-80"
      ></div>
    </div>
  )
}
