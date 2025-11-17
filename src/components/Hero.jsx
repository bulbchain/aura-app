import { useEffect, useRef, forwardRef, useImperativeHandle } from "react"
import gsap from "gsap"

const Hero = forwardRef((props, ref) => {
  const headingRef = useRef(null)
  const subheadingRef = useRef(null)
  const buttonsRef = useRef(null)
  const heroSectionRef = useRef(null)

  // 🎬 Animate elements on mount
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSectionRef.current,
        start: "top 80%", // starts animating when 80% from top of viewport
      },
    })

    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      0
    )
      .fromTo(
        subheadingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        0.2
      )
      .fromTo(
        buttonsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        0.4
      )
  }, [])

  // 🧭 Expose scroll control to Navigation
  useImperativeHandle(ref, () => ({
    scrollToHero: () => {
      heroSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    },
  }))

  return (
    <section
      ref={heroSectionRef}
      id="hero"
      className="flex flex-col items-center justify-center pt-16 pb-24 px-4"
    >
      <h1
        ref={headingRef}
        className="text-4xl md:text-5xl font-bold text-center mb-6 max-w-3xl"
      >
        Power Your Financial Intelligence
      </h1>

      <p
        ref={subheadingRef}
        className="text-center text-white/70 max-w-2xl mb-8 text-lg"
      >
        Tenix is your all-in-one crypto command center — built on the advanced
        x402 tech stack. Track, manage, compare, send, and swap assets seamlessly
        in one unified dashboard. It’s not just finance. It’s precision insight.
      </p>

      <div ref={buttonsRef} className="flex gap-4 justify-center">
        <button  onClick={props.scrollToChart} className="px-6 py-3 rounded-full bg-white text-black hover:bg-white/90 transition-colors font-medium flex items-center gap-2">
          Get started
          <span>→</span>
        </button>
        <button onClick={props.scrollToChart} className="px-6 py-3 rounded-full border border-white/30 hover:border-white transition-colors font-medium flex items-center gap-2">
          Read more
          <span>→</span>
        </button>
      </div>
    </section>
  )
})

export default Hero
