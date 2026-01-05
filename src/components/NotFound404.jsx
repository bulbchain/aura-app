import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NotFound404() {
  const [eye, setEye] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setEye({
      x: Math.max(-4, Math.min(4, x / 25)),
      y: Math.max(-4, Math.min(4, y / 25)),
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 text-neutral-900 px-4"
    >
      <div className="flex items-center gap-4 relative">
        <span className="text-[120px] md:text-[160px] font-extrabold text-black">4</span>

        {/* Character 0 */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
          className="relative w-[130px] h-[170px] flex items-center justify-center"
        >
          {/* SVG Arms & Legs (clean outline like reference) */}
          <svg
            width="160"
            height="200"
            viewBox="0 0 160 200"
            className="absolute"
          >
            {/* Left arm */}
            <path
              d="M30 90 C 0 80, 0 110, 30 110"
              fill="none"
              stroke="#737373"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Right arm */}
            <path
              d="M130 90 C 160 80, 160 110, 130 110"
              fill="none"
              stroke="#737373"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Left leg */}
            <path
              d="M70 170 L 60 190"
              stroke="#737373"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Right leg */}
            <path
              d="M90 170 L 100 190"
              stroke="#737373"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>

          {/* Body */}
          <div className="w-[95px] h-[145px] rounded-full border-[8px] border-neutral-400 bg-neutral-100 relative flex items-center justify-center z-10">
            {/* Eyes */}
            <div className="absolute top-10 flex gap-4">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="w-5 h-5 bg-white rounded-full flex items-center justify-center"
                >
                  <motion.span
                    animate={{ x: eye.x, y: eye.y }}
                    className="w-2.5 h-2.5 bg-neutral-800 rounded-full"
                  />
                </div>
              ))}
            </div>

            {/* Mouth */}
            <div className="absolute top-[75px] w-6 h-3 border-b-2 border-neutral-600 rounded-b-full" />
          </div>
        </motion.div>

        <span className="text-[120px] md:text-[160px] font-extrabold text-black">4</span>
      </div>

      <h1 className="mt-8 text-2xl md:text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-neutral-600 text-center max-w-md">
        The page you are looking for doesn’t exist. Return home to continue.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block rounded-full bg-black px-6 py-3 text-white text-sm font-medium shadow-md hover:scale-105 transition"
      >
        Back to home
      </Link>
    </div>
  );
}
