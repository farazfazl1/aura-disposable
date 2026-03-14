"use client"

import { motion } from "framer-motion"

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="relative">
        {/* Center logo/text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-32 h-32 rounded-full flex items-center justify-center"
        >
          <span className="text-white text-4xl font-bold tracking-widest">AURA</span>
        </motion.div>

        {/* Outer rotating circle */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-48 h-48 -ml-24 -mt-24 border border-white/20 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        {/* Loading circle animation */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-48 h-48 -ml-24 -mt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-full h-full rounded-full border-2 border-transparent border-t-white"
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
          className="absolute top-1/2 left-1/2 w-40 h-40 -ml-20 -mt-20 rounded-full bg-white/5 blur-md"
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

