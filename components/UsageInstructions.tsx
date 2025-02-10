"use client"

import { motion } from "framer-motion"

interface UsageInstructionsProps {
  theme: "dark" | "light"
  productName: string
}

const UsageInstructions = ({ theme, productName }: UsageInstructionsProps) => {
  const isDark = theme === "dark"

  const bgColor = isDark ? "bg-gray-900" : "bg-gray-100"
  const textColor = isDark ? "text-white" : "text-gray-900"
  const mutedTextColor = isDark ? "text-gray-300" : "text-gray-700"
  const stepBgColor = isDark ? "bg-gray-800" : "bg-white"
  const stepNumberColor = isDark ? "text-primary" : "text-gray-900"

  const steps = [
    "Activate device with 5 rapid clicks",
    "Draw gently for up to 3 seconds",
    "Wait 10-15 minutes between sessions",
  ]

  return (
    <section className="mb-24">
      <h2 className={`text-4xl font-bold mb-12 text-center ${textColor}`}>How to Enjoy Your {productName}</h2>
      <div className={`${bgColor} p-8 rounded-lg hover-lift max-w-3xl mx-auto`}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`text-lg leading-relaxed mb-8 ${mutedTextColor}`}
        >
          For an optimal {productName.toLowerCase()} experience, simply draw gently on the mouthpiece. We recommend{" "}
          {productName === "Sativa" ? "keeping your draw under" : "a draw duration of no more than"} three seconds to{" "}
          {productName === "Sativa"
            ? "fully appreciate the smooth, balanced flavor"
            : "preserve the quality of each puff"}
          . Allow 10 to 15 minutes between sessions to{" "}
          {productName === "Sativa"
            ? "let the effects evolve naturally"
            : "fully appreciate the evolving flavor and effects"}
          . Our intuitive design ensures that every {productName === "Sativa" ? "puff" : "use"} is as effortless as it
          is {productName === "Sativa" ? "inspiring" : "rewarding"}.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid gap-6"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="flex items-center"
            >
              <div
                className={`w-12 h-12 ${stepBgColor} rounded-full flex items-center justify-center mr-4 ${isDark ? "" : "shadow-md"}`}
              >
                <span className={`${stepNumberColor} font-bold text-lg`}>{index + 1}</span>
              </div>
              <span className={`${mutedTextColor} text-lg`}>{step}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default UsageInstructions

