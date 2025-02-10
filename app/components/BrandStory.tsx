"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const BrandStory = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section ref={ref} className="py-24 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
        >
          THE AURA JOURNEY
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate={controls} variants={fadeInUp}>
            <p className="text-lg mb-6">
              At Aura, we're redefining disposable vaping by uniting cutting-edge technology with minimalist design. Our
              vision: to transform vaping into a true art form.
            </p>
            <p className="text-lg mb-6">
              Every element of our products, from the precision-engineered vapor delivery to the timeless monochrome
              aesthetic, is meticulously crafted to elevate your experience.
            </p>
            <blockquote className="text-2xl font-italic my-8 pl-4 border-l-4 border-white">
              "Vaping, Redefined."
            </blockquote>
          </motion.div>
          <motion.div initial="hidden" animate={controls} variants={fadeInUp} className="grid gap-6">
            {[
              {
                title: "Innovation",
                description: "State-of-the-art technology ensures a consistent, premium experience with every puff.",
              },
              {
                title: "Design",
                description:
                  "Sleek, minimalist aesthetics meet ergonomic functionality for a truly elevated vaping experience.",
              },
              {
                title: "Quality",
                description: "Premium materials and rigorous quality control ensure excellence in every Aura product.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={controls}
                variants={fadeInUp}
                className="bg-gray-900 p-6 rounded-lg transition-all duration-300 hover:bg-gray-800"
              >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default BrandStory

