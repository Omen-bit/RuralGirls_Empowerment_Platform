import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { FirebaseProvider } from "@/lib/firebase/firebase-provider"
import { Toaster } from "@/components/ui/toaster"
import Loading from "@/components/ui/Loading"; 
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rural Girls Digital Empowerment Platform",
  description: "Empowering rural girls through AI-driven mentorship and digital skills",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FirebaseProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            {children}
            <Toaster />
          </ThemeProvider>
        </FirebaseProvider>
      </body>
    </html>
  )
}


import './globals.css'