"use client";

import { useRef, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";

export default function MayaRobot() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  const fadeSlideLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.9, ease: "easeOut" },
    },
  };

  const fadeSlideRight = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.8, ease: "easeOut" },
    },
  });

  return (
    <main
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-16 py-16 md:py-24">

        {/* Left Content */}
        <motion.div
          className="flex-1 max-w-xl text-center lg:text-left mb-12 lg:mb-0"
          variants={fadeSlideLeft}
          initial="hidden"
          animate={controls}
        >
       
          {/* Headline */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight
                       bg-gradient-to-r from-white via-gray-200 to-gray-400
                       bg-clip-text text-transparent"
            variants={fadeUp(0.4)}
          >
           Intelligence That Understands You
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-base md:text-lg text-gray-400 mb-8 leading-relaxed max-w-md mx-auto lg:mx-0"
            variants={fadeUp(0.6)}
          >
           Tenix AGI is designed to learn, reason, and adapt alongside humans — turning data into meaningful intelligence.
          </motion.p>
        </motion.div>

        {/* Right Content - Image */}
        <motion.div
          className="flex-1 relative flex items-center justify-center w-full lg:w-1/2"
          variants={fadeSlideRight}
          initial="hidden"
          animate={controls}
        >
          <div className="relative w-[70%] h-120 flex items-center justify-center">

            {/* Neutral Glow */}
            <motion.div
              className="absolute w-64 h-64 rounded-full blur-3xl opacity-30 bg-white"
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Image */}
            <motion.img
              className="relative w-full h-full object-cover rounded-2xl"
               src="/mayaimg.png"
              //src="/maya2.mp4"
             // autoPlay
             // loop
              //muted 
              alt="Maya AI"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 40px rgba(255,255,255,0.25)",
              }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          </div>
        </motion.div>
      </div>
      {/* Glossy horizontal line at end */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </main>
    
  );
}
