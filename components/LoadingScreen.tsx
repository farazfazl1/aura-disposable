"use client"

import { motion } from "framer-motion"

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#f7f6f2]">
      <div className="relative">
        {/* Center logo/text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-32 h-32 rounded-full flex items-center justify-center"
        >
          <span className="text-4xl font-bold tracking-widest text-[#17201b]">AURA</span>
        </motion.div>

        {/* Outer rotating circle */}
        <motion.div
          className="absolute left-1/2 top-1/2 -ml-24 -mt-24 h-48 w-48 rounded-full border border-[#17201b]/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        {/* Loading circle animation */}
        <motion.div
          className="absolute left-1/2 top-1/2 -ml-24 -mt-24 h-48 w-48"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="h-full w-full rounded-full border-2 border-transparent border-t-[#6f42c1]"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 1.5,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        </motion.div>

        {/* Inner circle glow effect */}
        <motion.div
          className="absolute left-1/2 top-1/2 -ml-20 -mt-20 h-40 w-40 rounded-full bg-[#d9c8f3]/40 blur-md"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  )
}

export default LoadingScreen
