import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_Georgian } from "next/font/google"
import "./globals.css"

const georgianFont = Noto_Sans_Georgian({
  weight: ["400", "500", "700"],
  subsets: ["georgian"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "TenderIntel Pro - AI-ზე დაფუძნებული ტენდერების ანალიზი",
  description: "საქართველოს სახელმწიფო შესყიდვების ტენდერების AI-ზე დაფუძნებული კვლევა და ანალიზი",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ka" className={`${georgianFont.variable} antialiased`}>
      <body>{children}</body>
    </html>
  )
}
