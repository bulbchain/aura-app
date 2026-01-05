import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import gsap from "gsap";
import Navigation from "./Navigation";
import Hero from "./Hero";
import Sphere from "./Sphere";
import StatsSection from "./StatsSection";
import FAQSection from "./FAQSection";
import MarqueeSection from "./MarqueeSection";
import Roadmap from "./Roadmap";
import ContactUs from "./ContactUs";
import RevenueChart from "./RevenueChart";
import IntegrationSection from "./IntegrationSection";
import SwapPage from "./SwapPage";
import Footer from "./Footer";
import X402IntegrationSnippets from "./X402IntegrationSnippets";
import HostedPaymentWidget from "./HostedPaymentWidget";
import CategoryPieChart from "./CategoryPieChart";
import Partnership from "./Partnership";
import LandingPage from "./LandingPage";
import { ScrollTrigger } from "gsap/all";
import { FeatureShowcase } from "./FeatureShowcase";
import Analyze from "./Analyze";
import Infrastructure from "./Infrastructure";
import TokenUtility from "./TokenUtility";
import TenixRiskMetrics from "./TenixRiskMetrics";
import MayaRobot from "./MayaRobot";


// gsap.registerPlugin(ScrollTrigger);

const HomePage = forwardRef((props, ref) => {
  const heroRef = useRef(null);
  const chartRef = useRef(null);
  const contactRef = useRef(null);
  const faqRef = useRef(null);
  const roadmapRef = useRef(null);
  // const swapRef = useRef(null);

  useEffect(() => {
    // Starfield animation
    const stars = document.querySelectorAll(".star");
    stars.forEach((star, index) => {
      gsap.to(star, {
        opacity: gsap.utils.random(0.3, 1),
        duration: gsap.utils.random(3, 6),
        delay: index * 0.05,
        repeat: -1,
        yoyo: true,
      });
    });
  }, []);

  // ✅ Expose scroll methods to Navigation
  useImperativeHandle(ref, () => ({
    scrollToHero: () => heroRef.current?.scrollIntoView({ behavior: "smooth" }),
    scrollToChart: () => chartRef.current?.scrollIntoView({ behavior: "smooth" }),
    scrollToFAQ: () => faqRef.current?.scrollIntoView({ behavior: "smooth" }),
    scrollToRoadmap: () => roadmapRef.current?.scrollIntoView({ behavior: "smooth" }),
    // scrollToSwap: () => swapRef.current?.scrollIntoView({ behavior: "smooth" }),

    scrollToContact: () =>
      contactRef.current?.scrollIntoView({ behavior: "smooth" }),
  }));

  return (
    <>
    {/* <LandingPage/> */}
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Starfield */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="star absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <Navigation homeRef={ref} />
        <div ref={heroRef}>
          <Hero scrollToChart={() => chartRef.current?.scrollIntoView({ behavior: "smooth" })}  />
         
          <Sphere />
        </div>
      
        {/* <MarqueeSection /> */}
        <Partnership/>
        <Analyze/>
        
        <div ref={chartRef}>
          <StatsSection />
          <MayaRobot/>
          {/* <TenixRiskMetrics /> */}
          <RevenueChart />
          <CategoryPieChart />
          <FeatureShowcase />
          <Infrastructure />
          <TokenUtility />
          <IntegrationSection />
         <X402IntegrationSnippets />
          <HostedPaymentWidget/>
        </div>
                
        {/* <div ref={swapRef}>
          <SwapPage />
        </div> */}

        <div ref={roadmapRef}>
          <Roadmap />
        </div>


        <div ref={faqRef}>
          <FAQSection />
          </div>


        <div ref={contactRef}>
          <ContactUs />
        </div>
      <Footer homeRef={ref} />

      </div>
    </div>
    </>
  );
});

export default HomePage;
