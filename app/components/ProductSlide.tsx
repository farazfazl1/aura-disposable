import { motion } from "framer-motion"
import type React from "react"

interface ProductSlideProps {
  name: string
  tagline: string
  description: string
  flavors: string[]
  terpenes: string[]
  sizes: string[]
}

const ProductSlide: React.FC<ProductSlideProps> = ({ name, tagline, description, flavors, terpenes, sizes }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white text-black p-8 rounded-lg shadow-lg"
    >
      <h3 className="text-3xl font-bold mb-2">{name}</h3>
      <p className="text-xl text-gray-600 mb-4 italic">&quot;{tagline}&quot;</p>
      <p className="mb-6">{description}</p>
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">A Symphony of Natural Flavors</h4>
        <p>{flavors.join(", ")}</p>
        <p className="mt-2">Dominant Terpenes: {terpenes.join(", ")}</p>
      </div>
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Available Sizes</h4>
        <p>{sizes.join(", ")}</p>
      </div>
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">THC Content</h4>
        <p>THC of pen is 80-90%</p>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-2">Engineered for Excellence</h4>
        <p>
          At the heart of {name} is our dedication to purity and innovation. Using premium THC distillate, live resin,
          and a meticulously curated blend of natural terpenes, {name} captures the bold essence and exhilarating energy
          of its heritage.
        </p>
      </div>
    </motion.div>
  )
}

export default ProductSlide

