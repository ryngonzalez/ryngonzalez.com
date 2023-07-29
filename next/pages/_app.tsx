import * as React from "react"

import "@/app/globals.css"
// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css"
// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css"
import { Analytics } from "@vercel/analytics/react"

interface MyAppProps {
  Component: React.ComponentType
  pageProps: any
}

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

export default MyApp
