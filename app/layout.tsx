import type React from "react"
import type { Metadata } from "next"
import { Space_Mono, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Providers } from "@/components/providers"
import { AuthProvider } from "@/components/auth-provider"

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "WeClub - YAWZ Ecosystem",
  description: "An on-chain club exclusive to real product owners",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} ${spaceMono.variable} antialiased`}>
        <Providers>
          <AuthProvider>
            <Navbar />
            <main className="min-h-screen">
              <Suspense fallback={null}>{children}</Suspense>
            </main>
            <Footer />
            <Analytics />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}
