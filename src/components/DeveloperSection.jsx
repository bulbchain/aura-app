import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const developers = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Full Stack Developer",
    bio: "Java, Spring Boot, React, and creative branding. Loves animated portfolios.",
    avatar: "/dev33.jpg",
  },
  {
    id: 2,
    name: "Aisha Verma",
    role: "UI/UX Designer",
    bio: "Vibrant interfaces, seamless UX. Skilled in Figma and GSAP.",
    avatar: "/dev2.png",
  },
];

export default function DeveloperGrid() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {developers.map((dev) => (
        <DeveloperCard key={dev.id} dev={dev} />
      ))}
    </div>
  );
}

function DeveloperCard({ dev }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative bg-black/40 border border-white/20 hover:border-white/40 transition-all p-6 shadow-lg rounded-xl overflow-hidden">
      {/* Avatar */}
      <div className="w-full  h-40 mb-4 overflow-hidden rounded-md">
        <img
          src={dev.avatar}
          alt={dev.name}
          className="w-full h-full object-cover"
        />
      </div>
 <div className="h-px bg-white/20 mb-3" />
      {/* Header Row */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-xl font-semibold text-white">{dev.name}</h3>
          <p className="text-white/50 text-sm font-medium">{dev.role}</p>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white/70 hover:text-white text-xl font-bold focus:outline-none"
        >
          {isOpen ? "–" : "+"}
        </button>
      </div>

      {/* Animated Bio Dropdown */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-white/10"
          >
            <div className="py-4 text-white/60 text-sm leading-relaxed">
              {dev.bio}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
