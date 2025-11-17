
import { useState } from "react"
import { Plus } from "lucide-react"

export default function Rocket() {
  const [isHovered, setIsHovered] = useState(false)

  const avatars = [
    { id: 1, initials: "JD", color: "from-fuchsia-500 to-purple-700" },
    { id: 2, initials: "SJ", color: "from-cyan-400 to-blue-600" },
    { id: 3, initials: "MR", color: "from-amber-400 to-pink-600" },
  ]

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden">
      {/* Floating stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full blur-[1px]"
            style={{
              width: Math.random() * 2 + "px",
              height: Math.random() * 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              opacity: Math.random() * 0.6 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Glass container */}
      <div className="relative w-full max-w-2xl mx-auto px-6">
        <div
          className={`rounded-3xl p-12 backdrop-blur-xl bg-black/40 border border-white/10 transition-all duration-300 shadow-[0_0_60px_rgba(139,92,246,0.15)] ${
            isHovered ? "scale-[1.02]" : "scale-100"
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Decorative glow layers */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 via-blue-500/10 to-transparent blur-3xl opacity-20" />
          </div>

          {/* Header */}
          <div className="relative z-10 text-center mb-14">
            <h1 className="text-4xl font-bold text-white drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]">
              Refine through Feedback
            </h1>
            <p className="text-gray-400 mt-3 text-lg">
              Improve your project with real-time feedback after each step.
            </p>
          </div>

          {/* Keyboard visualization */}
          <div className="relative flex flex-col items-center justify-center min-h-80">
            {/* Row 1 */}
            <div className="flex gap-3 mb-10">
              {["A", "S", "D"].map((key) => (
                <div
                  key={key}
                  className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-white text-lg font-bold shadow-[inset_0_0_15px_rgba(255,255,255,0.1),0_0_10px_rgba(139,92,246,0.2)] hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-200"
                >
                  {key}
                </div>
              ))}
            </div>

            {/* Row 2 */}
            <div className="flex gap-3 mb-10">
              {["Z", "X", "C"].map((key) => (
                <div
                  key={key}
                  className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-white text-lg font-bold shadow-[inset_0_0_15px_rgba(255,255,255,0.1),0_0_10px_rgba(139,92,246,0.2)] hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-200"
                >
                  {key}
                </div>
              ))}
            </div>

            {/* Avatars */}
            <div className="flex gap-8 mt-6">
              {avatars.map((avatar) => (
                <div
                  key={avatar.id}
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${avatar.color} flex items-center justify-center text-white font-semibold text-sm border border-white/20 shadow-[0_0_25px_rgba(139,92,246,0.3)] hover:scale-105 transition-transform`}
                >
                  {avatar.initials}
                </div>
              ))}
            </div>

            {/* Button */}
            <button
              className="mt-10 px-8 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white font-medium flex items-center gap-2 hover:bg-white/20 hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] transition-all duration-300"
              onClick={() => console.log("Feedback clicked")}
            >
              <Plus size={20} />
              <span>Feedback</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
