import { ThemeProvider } from "next-themes"
import "./globals.css"
import type { ReactNode } from "react"

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </body>
    </html>
  )
}

