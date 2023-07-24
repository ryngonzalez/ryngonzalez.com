import * as React from "react"
import Document, { Head, Html, Main, NextScript } from "next/document"

import { fontMono, fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import Footer from "@/components/ui/footer"
import { ThemeProvider } from "@/components/theme-provider"

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body
          className={cn(
            "min-h-screen max-h-screen bg-background font-sans antialiased",
            fontSans.variable,
            fontMono.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            enableSystem={false}
            defaultTheme="light"
          >
            <Main />
            <Footer />
            <NextScript />
          </ThemeProvider>
        </body>
      </Html>
    )
  }
}
