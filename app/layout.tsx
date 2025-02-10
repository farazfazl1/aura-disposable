import { ThemeProvider } from "next-themes"
import type { Metadata } from "next"
import "./globals.css"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "AURA - Premium Disposable Vapes",
  description:
    "Experience the art of premium disposable vaping with AURA. Discover our collection of premium Indica and Sativa vapes.",
  icons: {
    icon: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO-vkTxr7AVIvz95MEazBJ1jHjkPbCnwx.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO-vkTxr7AVIvz95MEazBJ1jHjkPbCnwx.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO-vkTxr7AVIvz95MEazBJ1jHjkPbCnwx.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO-vkTxr7AVIvz95MEazBJ1jHjkPbCnwx.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "AURA - Premium Disposable Vapes",
    description: "Experience the art of premium disposable vaping with AURA.",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO-vkTxr7AVIvz95MEazBJ1jHjkPbCnwx.png",
        width: 800,
        height: 600,
        alt: "AURA Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AURA - Premium Disposable Vapes",
    description: "Experience the art of premium disposable vaping with AURA.",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO-vkTxr7AVIvz95MEazBJ1jHjkPbCnwx.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO-vkTxr7AVIvz95MEazBJ1jHjkPbCnwx.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO-vkTxr7AVIvz95MEazBJ1jHjkPbCnwx.png"
        />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </body>
    </html>
  )
}

