
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    id: 1,
    question: "What is Tenix?",
    answer:
      "Tenix is a next-generation Web3 finance platform powered by the 402x protocol. It enables users to swap, send, and manage digital assets instantly through seamlessly integrated backend APIs and cutting-edge security."  },
  {
    id: 2,
    question: "How does Tenix work?",
    answer:
      "Tenix connects directly to the Solana blockchain and 402x API to execute ultra-fast swaps, track assets in real time, and allow secure token transfers via encrypted links—all in a non-custodial environment."
  },
  {
    id: 3,
    question: "What is 402x?",
    answer:
      "402x is a next-generation payment protocol built on Solana, designed for ultra-fast and low-cost blockchain transactions. It powers instant swaps, secure transfers, and on-chain asset management within our platform."
  },
  {
    id: 4,
    question: "How do Swap Rewards work?",
    answer:
      "Every swap performed on Tenix earns users reward points based on trade volume. These points can be redeemed for token bonuses, fee discounts, or exclusive ecosystem perks."
  },
  {
    id: 5,
    question: "What is the Early HODLers Reward System?",
    answer:
      "Early community members who hold $TENIX tokens for longer durations receive tier-based rewards, including staking multipliers, NFT airdrops, and early access to future ecosystem utilities."
  },
  {
    id: 6,
    question: "How does the Secure Link transfer feature work?",
    answer:
      "The Secure Link feature allows users to send and receive tokens safely via encrypted one-time links powered by the 402x protocol—eliminating address errors and ensuring privacy."
  },
  {
    id: 7,
    question: "Is my wallet and transaction data secure?",
    answer:
      "Yes. Tenix uses AES-256 encryption, TLS protocols, and a non-custodial wallet system. Your funds stay in your wallet—Tenix never stores your private keys."
  },
  {
    id: 8,
    question: "What can I do with the dApp?",
    answer:
      "Users can connect their Solana wallets, perform instant swaps, view live portfolio analytics, send tokens securely, and earn rewards for participation and holding."
  },
  {
    id: 9,
    question: "What is the roadmap for upcoming features?",
    answer:
      "Future updates include cross-chain bridge integration, AI-based asset tracking, DAO voting system, and expanded utility for $TENIX token holders."
  },
  {
    id: 10,
    question: "Will the platform have staking and yield farming?",
    answer:
      "Yes. Tenix will soon introduce staking and liquidity pool features, allowing users to earn passive income while supporting ecosystem liquidity."
  },
  {
    id: 11,
    question: "How can developers integrate the 402x API?",
    answer:
      "Developers can integrate 402x via REST and Web3 APIs for payment processing, wallet authentication, and smart contract automation. A full SDK and documentation will be provided."
  },
  {
    id: 12,
    question: "How does the referral and loyalty system work?",
    answer:
      "Invite friends using your unique referral code to earn rewards. Each referral unlocks points that can be converted into $TENIX tokens, NFT drops, or fee discounts."
  },
]

export default function FAQSection() {
  const [expandedId, setExpandedId] = useState(null)
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const itemsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        },
      )

      itemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(
            item,
            { opacity: 0, x: -50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              delay: index * 0.1,
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
              },
            },
          )
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
   <section
  ref={containerRef}
  className="relative w-full py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 bg-black overflow-hidden"
>
  <div className="max-w-4xl mx-auto">
    {/* Section Title */}
    <div ref={titleRef} className="mb-12 md:mb-16">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-center text-balance">
        Frequently Asked Questions
      </h2>
      <p className="text-sm sm:text-base md:text-lg text-gray-400 text-center max-w-2xl mx-auto">
        Find answers to common questions about our finance tracking platform and services.
      </p>
    </div>

    {/* FAQ Items */}
    <div className="space-y-3 sm:space-y-4 md:space-y-5">
      {faqs.map((faq, index) => (
        <div
          key={faq.id}
          ref={(el) => {
            itemsRef.current[index] = el
          }}
          className="border border-gray-700 rounded-lg overflow-hidden bg-gray-900/30 hover:bg-gray-900/50 transition-colors"
        >
          <motion.button
            onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
            className="w-full px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 flex items-center justify-between gap-4 text-left hover:bg-gray-800/50 transition-colors"
            whileHover={{ backgroundColor: "rgba(31, 41, 55, 0.3)" }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-base sm:text-lg md:text-xl font-semibold text-white pr-4">
              {faq.question}
            </span>
            <motion.div
              animate={{ rotate: expandedId === faq.id ? 45 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
            >
              <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
            </motion.div>
          </motion.button>

          {/* Answer */}
          <AnimatePresence>
            {expandedId === faq.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-gray-700 overflow-hidden"
              >
                <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 bg-gray-800/20">
                  <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  </div>

  {/* ✨ Thin Glossy Bottom Line */}
  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
</section>

  )
}
