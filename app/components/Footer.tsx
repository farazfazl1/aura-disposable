import { Instagram, Mail } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="https://www.instagram.com/auradisposable"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block hover:text-gray-300 transition-colors duration-200"
          >
            <Instagram size={24} />
          </a>
          <a
            href="mailto:auradisposable@gmail.com"
            className="inline-block hover:text-gray-300 transition-colors duration-200"
          >
            <Mail size={24} />
          </a>
        </div>
        <p className="mb-2">&copy; {new Date().getFullYear()} Aura Vape. All rights reserved.</p>
        <p className="mb-2">For adult use only. Please vape responsibly.</p>
        <p className="mb-4">
          <strong>Wholesale inquiries only.</strong>
        </p>
        <p className="mb-4">
          Contact us:{" "}
          <a
            href="mailto:auradisposable@gmail.com?subject=Wholesale%20Inquiry%20for%20Aura%20Vape&body=Hello%20Aura%20Vape%20Team%2C%0A%0AI'm%20interested%20in%20your%20wholesale%20options.%20Please%20provide%20me%20with%20more%20information%20about%20your%20products%20and%20pricing.%0A%0ABest%20regards%2C%0A[Your%20Name]"
            className="underline"
          >
            auradisposable@gmail.com
          </a>
        </p>
        <button
          onClick={() =>
            (window.location.href =
              "mailto:auradisposable@gmail.com?subject=Wholesale%20Inquiry%20for%20Aura%20Vape&body=Hello%20Aura%20Vape%20Team%2C%0A%0AI'm%20interested%20in%20your%20wholesale%20options.%20Please%20provide%20me%20with%20more%20information%20about%20your%20products%20and%20pricing.%0A%0ABest%20regards%2C%0A[Your%20Name]")
          }
          className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
        >
          Contact Us
        </button>
      </div>
    </footer>
  )
}

export default Footer

