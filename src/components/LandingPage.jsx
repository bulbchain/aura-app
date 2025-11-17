"use client";

import { useNavigate } from "react-router-dom";
import "./landingpage.css";
import ParticleBackground from "./ParticleBackground";
import NeonSphere from "./NeonSphere";
import Sphere from "./Sphere";
import PurpleSphere from "./PurpleSphere";
import BlueSphere from "./BlueSphere";

export default function LandingPage() {
  const navigate = useNavigate();

  const avatars = [
    { name: "Alice", img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "James", img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Sophia", img: "https://randomuser.me/api/portraits/women/68.jpg" },
    { name: "Michael", img: "https://randomuser.me/api/portraits/men/83.jpg" },
    { name: "Liam", img: "https://randomuser.me/api/portraits/men/12.jpg" },
  ];

  return (
    <>
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-[#0a0a16] to-[#0f0f28] flex flex-col items-center justify-center text-center px-4">

      <ParticleBackground />

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

          <BlueSphere/>


      {/* Neon ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] pointer-events-none blur-[130px]"
        style={{
          background:
            "radial-gradient(circle at 50% 60%, rgba(80,120,255,0.25), rgba(120,70,255,0.2), transparent 70%)",
        }}
      />

      {/* NEON ARC UNDER CARD */}
      <div className="absolute bottom-[22%] left-1/2 -translate-x-1/2 w-[90%] max-w-3xl pointer-events-none">
        <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0,250 Q500,0 1000,250"
            fill="none"
            stroke="url(#neonArc)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="neonArc" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#9333ea" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Badge */}
        <div className="inline-block px-5 py-2 rounded-full bg-black/50 border border-blue-400/40 mb-8 backdrop-blur-md shadow-[0_0_30px_rgba(100,120,255,0.35)]">
          <span className="text-xs sm:text-sm text-blue-300 tracking-wide">
            Smarter. Faster. Borderless Finance.
          </span>
        </div>

            {/* Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
          Take Control of Your{" "}
          <span className="bg-gradient-to-r from-white via-lime-200 to-lime-400 bg-clip-text text-transparent">
            Financial Universe
          </span>
        </h1>


          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-[#9AFFC7] max-w-2xl mx-auto leading-relaxed mb-12">
            Visualize, track, and execute — all from one powerful dashboard built for modern crypto users.
          </p>


        {/* Dashboard Card */}
        <div className="relative mx-auto w-full max-w-3xl bg-gradient-to-br from-[#0e0e22]/60 to-[#181830]/40 border border-purple-500/20 rounded-3xl shadow-[0_0_60px_rgba(120,80,255,0.3)] backdrop-blur-xl p-6 sm:p-8 overflow-hidden hover:shadow-[0_0_100px_rgba(140,90,255,0.45)] transition-shadow duration-700">

          {/* Neon animated rim */}
          <div className="absolute inset-0 rounded-3xl pointer-events-none animate-borderSweepNeon" />

          {/* Header */}
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center overflow-hidden">
                <img
                  src="/tenix-logo.png"
                  alt="Soro Logo"
                  className="w-14 h-14 object-contain scale-110"
                />
              </div>
              <h3 className="text-lg font-semibold text-white">Tenix</h3>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0AFF4D] animate-pulse shadow-[0_0_8px_#0AFF4D]"></div>
              <span className="text-sm text-[#0AFF4D] font-medium">Active</span>
            </div>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 text-left relative z-10">
            {[
              { title: "Current Balance", value: "$7,000.75", change: "+3.45%", color: "blue" },
              { title: "Total Savings", value: "$5,300.50", change: "+4.21%", color: "blue" },
              { title: "Total Income", value: "$28,750.75", change: "+12.1%", color: "blue" },
              { title: "Total Expenses", value: "$21,450.00", change: "−3.2%", color: "red" },
            ].map((item, i) => (
              <div
                key={i}
                className="p-4 bg-[#0e0e22]/40 rounded-xl border border-[#1e1e3d] hover:bg-[#171738]/40 transition-all duration-300"
              >
                <p className="text-xs text-gray-400 mb-1">{item.title}</p>
                <h4 className="text-xl font-semibold text-white">{item.value}</h4>
                <p
                  className={`text-xs ${
                    item.color === "blue" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {item.change}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">

            <div className="flex -space-x-3">
              {avatars.map((user, i) => (
                <img
                  key={i}
                  src={user.img}
                  alt={user.name}
                  className="w-9 h-9 rounded-full border-2 border-[#1a1a33] hover:z-10 hover:scale-110 transition-transform duration-300"
                />
              ))}
            </div>

            <button
              onClick={() => navigate("/home")}
              className="px-6 py-3 rounded-full 
                        bg-gradient-to-r from-[#00FF7F] via-[#00D27F] to-[#00A86B]
                        text-black font-medium
                        hover:scale-105 transition-transform
                        shadow-[0_0_25px_rgba(0,255,127,0.45)]"
            >
              Explore →
            </button>

          </div>
        </div>
      </div>
    </div>
    </>
  );
}
