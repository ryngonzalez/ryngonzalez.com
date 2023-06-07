import { JetBrains_Mono as FontMono, Inter as FontSans, DM_Serif_Display as FontSerif } from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-sans",
})

export const fontSerif = FontSerif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})
