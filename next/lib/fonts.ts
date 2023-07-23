import { DM_Mono as FontMono, DM_Sans as FontSans, Boogaloo as FontSerif } from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sans",
})

export const fontSerif = FontSerif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
})

