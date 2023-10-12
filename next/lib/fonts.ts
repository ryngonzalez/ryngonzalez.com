import { DM_Mono as FontMono, Inter as FontSans, Boogaloo as FontHeadline, DM_Sans as FontSerif } from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  // weight: ["400", "500", "700"],
  variable: "--font-sans",
})

export const fontSerif = FontSerif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
})

export const fontHeadline = FontHeadline({
  subsets: ["latin"],
  variable: "--font-headline",
  weight: "400"
})


export const fontMono = FontMono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
})
