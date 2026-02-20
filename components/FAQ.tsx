"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { MoonIcon, SunIcon } from "./Icons"

const FAQItem = ({ question, answer }: { question: string; answer: string | JSX.Element }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-black border border-gray-800 rounded-3xl p-6 hover:bg-gray-900 transition-colors duration-300 cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-medium text-white">{question}</h3>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            {isOpen ? (
              <ChevronUp className="w-6 h-6 text-gray-400" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-400" />
            )}
          </motion.div>
        </div>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gray-400 leading-relaxed pt-2 border-t border-gray-800">{answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

const FAQ = () => {
  const faqs = [
    {
      question: "How many puffs does each device deliver?",
      answer:
        "Each Aura vape is engineered to deliver approximately 500 puffs, ensuring a consistent, premium experience from start to finish.",
    },
    {
      question: "What distinguishes Indica from Sativa?",
      answer: (
        <span>
          <MoonIcon className="inline-block mr-2" width={18} height={18} /> Indica offers a bold, intense experience
          with earthy and pine notes, while <SunIcon className="inline-block mx-2" width={18} height={18} /> Sativa
          provides a crisp, uplifting sensation with sweet berry undertones.
        </span>
      ),
    },
    {
      question: "How do I operate the Aura vape?",
      answer:
        "Simply draw on the mouthpiece to activate. For initial activation, click the button five times; for voltage adjustment, click three times; for preheating, click twice.",
    },
    {
      question: "What ingredients are used in Aura products?",
      answer:
        "Our vapes contain premium THC distillate, live resin, and carefully selected natural terpenes to preserve unique flavor profiles and potency.",
    },
    {
      question: "What safety precautions should I observe?",
      answer:
        "Aura products are for adults 21+ only. Follow all printed instructions and safety warnings. Do not use while pregnant or operating machinery.",
    },
    {
      question: "Why choose Aura for my vaping experience?",
      answer:
        "Aura represents the pinnacle of disposable vaping, combining premium design with innovative technology for a superior, sophisticated experience.",
    },
  ]

  return (
    <section className="py-24 px-4 bg-black" id="faq">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">FAQ</h2>
          <p className="text-gray-400 text-lg">Everything you need to know about Aura Vape</p>
        </div>
        <motion.div
          className="grid gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ

