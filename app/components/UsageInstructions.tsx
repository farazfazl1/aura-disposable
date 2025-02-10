"use client"

import type React from "react"
import { motion } from "framer-motion"
import { CloudFog, Zap } from "lucide-react"

interface UsageInstructionsProps {
  theme: "dark" | "light"
  productName: string
}

const UsageInstructions: React.FC<UsageInstructionsProps> = ({ theme, productName }) => {
  const isDark = theme === "dark"

  const bgColor = isDark ? "bg-gray-900" : "bg-gray-100"
  const textColor = isDark ? "text-white" : "text-gray-900"
  const mutedTextColor = isDark ? "text-gray-300" : "text-gray-700"
  const accentColor = isDark ? "text-primary" : "text-gray-900"

  const steps = [
    { title: "Activate", description: "Click the button 5 times rapidly to power on" },
    { title: "Draw", description: "Inhale gently for up to 3 seconds" },
    { title: "Enjoy", description: "Savor the flavor and effects" },
    { title: "Rest", description: "Wait 10-15 minutes between sessions" },
  ]

  const Icon = productName === "Sativa" ? Zap : CloudFog

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
              className={`p-4 rounded-lg ${isDark ? "bg-gray-800" : "bg-white"} shadow`}
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

