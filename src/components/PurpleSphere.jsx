"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PurpleSphere() {
  const containerRef = useRef(null);
  const ringsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.82 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out", delay: 0.4 }
    );

    ringsRef.current.forEach((ring, i) => {
      gsap.to(ring, {
        rotation: 360,
        transformOrigin: "50% 50%",
        duration: 9 + i * 0.25,
        repeat: -1,
        ease: "linear",
      });

      gsap.to(ring, {
        opacity: 0.6 + i * 0.01,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.03,
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute left-1/2 top-[30%] sm:top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    >
      {/* Responsive wrapper */}
      <div
        className="relative flex justify-center items-center
                   w-[300px] h-[300px]
                   sm:w-[500px] sm:h-[500px]
                   md:w-[700px] md:h-[700px]
                   lg:w-[900px] lg:h-[900px]"
      >
        {/* Background Glow (Pink → Violet → Blue) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="
            w-[80%] h-[80%] rounded-full blur-[150px]
            bg-[radial-gradient(circle,
              rgba(217,69,255,0.45),
              rgba(164,140,255,0.25),
              rgba(0,166,255,0.20),
              transparent 70%
            )]
          " />
        </div>

        {/* Pink → Violet → Blue Neon Sphere Rings */}
        <svg
          className="w-full h-full relative z-10"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="neonRings" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D945FF" />   {/* neon pink */}
              <stop offset="50%" stopColor="#A48CFF" />  {/* violet */}
              <stop offset="100%" stopColor="#00A6FF" /> {/* electric blue */}
            </linearGradient>

            <filter id="ringGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g filter="url(#ringGlow)">
            {Array.from({ length: 40 }).map((_, i) => (
              <ellipse
                key={i}
                ref={(el) => (ringsRef.current[i] = el)}
                cx="200"
                cy="200"
                rx="180"
                ry={95 + Math.sin(i * 0.22) * 38}
                fill="none"
                stroke="url(#neonRings)"
                strokeWidth={i % 5 === 0 ? 2 : 0.7}
                opacity={1 - i / 38}
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
