import "@/app/globals.css"
import { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"

import { ThemeProvider } from "@/app/src/components/theme-provider"
import SiteFooter from "@/app/src/components/ui/SiteFooter"
import { SiteHeader } from "@/app/src/components/ui/SiteHeader"
import { TailwindIndicator } from "@/app/src/components/ui/TailwindIndicator"
import { siteConfig } from "@/app/src/config/site"
import {
  fontHeadline,
  fontMono,
  fontSans,
  fontSerif,
} from "@/app/src/lib/fonts"
import { cn } from "@/app/src/lib/utils"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [{ color: "white" }],
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
            fontSerif.variable,
            fontMono.variable,
            fontHeadline.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            enableSystem={false}
            defaultTheme="light"
          >
            <div className="relative flex min-h-screen flex-col">
              <div className="flex-1">{children}</div>
              <SiteFooter />
            </div>
            <TailwindIndicator />
          </ThemeProvider>
          <Analytics />
        </body>
      </html>
    </>
  )
}
