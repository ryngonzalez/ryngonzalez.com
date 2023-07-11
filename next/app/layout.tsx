import "@/app/globals.css"
import { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"

import { siteConfig } from "@/config/site"
import { fontSans, fontSerif } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import DndProvider from "@/components/dnd-provider"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [{ color: "black" }],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen max-h-screen bg-background font-sans antialiased",
            fontSans.variable,
            fontSerif.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            enableSystem={false}
            defaultTheme="light"
          >
            <DndProvider>
              <div className="relative flex min-h-screen flex-col">
                <SiteHeader />
                <div className="flex-1">{children}</div>
                <Footer />
              </div>
            </DndProvider>
            <TailwindIndicator />
          </ThemeProvider>
          <Analytics />
        </body>
      </html>
    </>
  )
}
