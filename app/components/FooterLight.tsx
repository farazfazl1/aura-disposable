import { Instagram } from "lucide-react"

const FooterLight = () => {
  return (
    <footer className="bg-white text-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mb-4 hover:text-gray-600 transition-colors duration-200"
        >
          <Instagram size={24} />
        </a>
        <p>&copy; {new Date().getFullYear()} Aura Vape. All rights reserved.</p>
        <p className="mt-2 text-sm">For adult use only. Please vape responsibly.</p>
      </div>
    </footer>
  )
}

export default FooterLight

