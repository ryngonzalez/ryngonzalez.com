import * as React from "react"
import Document, { Head, Html, Main, NextScript } from "next/document"

import { ThemeProvider } from "@/app/src/components/theme-provider"
import SiteFooter from "@/app/src/components/ui/SiteFooter"
import {
  fontHeadline,
  fontMono,
  fontSans,
  fontSerif,
} from "@/app/src/lib/fonts"
import { cn } from "@/app/src/lib/utils"

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
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
            <Main />
            <SiteFooter />
            <NextScript />
          </ThemeProvider>
        </body>
      </Html>
    )
  }
}
