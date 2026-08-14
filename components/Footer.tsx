import { Instagram, Mail } from "lucide-react"

const Footer = () => {
  return (
    <footer className="border-t border-[#dfe5df] bg-[#eef1ea] px-4 py-8 text-[#17201b]">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="https://www.instagram.com/auradisposable"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-colors duration-200 hover:text-[#6f42c1]"
          >
            <Instagram size={24} />
          </a>
          <a
            href="mailto:auradisposable@gmail.com"
            className="inline-block transition-colors duration-200 hover:text-[#6f42c1]"
          >
            <Mail size={24} />
          </a>
        </div>
        <p className="mb-2">&copy; {new Date().getFullYear()} Aura Vape. All rights reserved.</p>
        <p className="mb-2">For adult use only. Please vape responsibly.</p>
        <p className="mb-4">
          <strong>Need help with a product or your order?</strong>
        </p>
        <p className="mb-4">
          Contact us:{" "}
          <a
            href="mailto:auradisposable@gmail.com?subject=Aura%20Store%20Support"
            className="underline"
          >
            auradisposable@gmail.com
          </a>
        </p>
        <a
          href="mailto:auradisposable@gmail.com?subject=Aura%20Store%20Support"
          className="inline-flex items-center justify-center rounded-full bg-[#17201b] px-6 py-2 text-white transition-colors duration-300 hover:bg-[#33423a]"
        >
          Email support
        </a>
      </div>
    </footer>
  )
}

export default Footer
