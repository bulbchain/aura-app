import React, { useEffect } from "react";

export default function ParticleBackground() {
  useEffect(() => {
    const particleContainer = document.getElementById("particle-container");
    if (!particleContainer) return;

    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className = "particle";

      // Random position
      particle.style.left = Math.random() * 100 + "vw";
      particle.style.top = Math.random() * 100 + "vh";

      // Random size
      const size = Math.random() * 4 + 2; // 2–6px
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      // Random animation duration
      const duration = Math.random() * 10 + 8; // 8–18s
      particle.style.animationDuration = `${duration}s`;

      particleContainer.appendChild(particle);

      // Remove after animation ends
      setTimeout(() => particle.remove(), duration * 1000);
    };

    const interval = setInterval(createParticle, 10);
    return () => clearInterval(interval);
  }, []);

  return <div id="particle-container" className="absolute inset-0 overflow-hidden pointer-events-none z-0" />;
}
