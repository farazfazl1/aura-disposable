"use client"

import type React from "react"
import { motion } from "framer-motion"
import { CloudFog, Sparkles, Zap } from "lucide-react"

interface UsageInstructionsProps {
  theme: "dark" | "light"
  productName: string
}

const UsageInstructions: React.FC<UsageInstructionsProps> = ({ productName }) => {
  const isHybrid = productName === "Hybrid"

  const bgColor = isHybrid ? "border border-[#a6d7c3] bg-[#e7f5ee]" : "border border-[#dfe5df] bg-white"
  const textColor = "text-[#17201b]"
  const mutedTextColor = "text-[#5a665e]"
  const accentColor = isHybrid ? "text-[#087f5b]" : productName === "Sativa" ? "text-[#a16207]" : "text-[#6f42c1]"
  const stepBgColor = isHybrid ? "border border-[#b8dfce] bg-white/70" : "border border-[#e7ebe5] bg-[#f7f6f2]"

  const steps = [
    { title: "Activate", description: "Click the button 5 times rapidly to power on" },
    { title: "Draw", description: "Inhale gently for up to 3 seconds" },
    { title: "Enjoy", description: "Savor the flavor and effects" },
    { title: "Rest", description: "Wait 10-15 minutes between sessions" },
  ]

  const Icon = productName === "Sativa" ? Zap : productName === "Hybrid" ? Sparkles : CloudFog

  return (
    <section className="mb-24">
      <h2 className={`text-4xl font-bold mb-12 text-center ${textColor}`}>How to Enjoy Your {productName}</h2>
      <div className={`${bgColor} p-8 rounded-lg shadow-lg max-w-4xl mx-auto`}>
        <div className="flex flex-col md:flex-row items-center mb-8">
          <div className="mb-6 md:mb-0 md:mr-8">
            <Icon size={80} className={accentColor} />
          </div>
          <p className={`text-lg leading-relaxed ${mutedTextColor}`}>
            {productName === "Sativa"
              ? "Experience the uplifting and energizing effects of our Sativa blend. Perfect for daytime use, it promotes creativity and focus."
              : productName === "Hybrid"
                ? "Enjoy a balanced fusion of calm and clarity. Our Hybrid blend delivers a smooth, versatile experience designed for any moment."
                : "Indulge in the relaxing and calming properties of our Indica blend. Ideal for evening use, it helps you unwind and achieve deep relaxation."}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`p-4 rounded-lg ${stepBgColor} shadow`}
            >
              <h3 className={`text-xl font-semibold mb-2 ${accentColor}`}>{step.title}</h3>
              <p className={mutedTextColor}>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UsageInstructions
