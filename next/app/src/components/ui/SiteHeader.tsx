"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { useMediaQuery, useTimeout } from "usehooks-ts"

import { siteConfig } from "@/app/src/config/site"
import { cn } from "@/app/src/lib/utils"

import { Icons } from "../icons"
import { HeaderLink } from "./HeaderLink"
import { NavigationLinks } from "./NavigationLinks"

const MotionLink = motion(Link)

export function SiteHeader({ showLogo = true }) {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const headerLinks = [
    {
      href: siteConfig.links.github,
      icon: <Icons.gitHub className="h-5 w-5 fill-current" />,
    },
    {
      href: siteConfig.links.twitter,
      icon: <Icons.twitter className="h-5 w-5 fill-current" />,
    },
    {
      href: siteConfig.links.threads,
      icon: <Icons.threads className="h-5 w-5 fill-current" />,
    },
  ]

  const isDesktopScreen = useMediaQuery("(min-width: 768px)", {
    defaultValue: true,
    initializeWithValue: false,
  })

  const [visible, setVisible] = useState(false)

  const show = () => {
    setVisible(true)
  }

  // Prevent initial flicker when showing the logo
  //
  useTimeout(show, 100)

  return (
    <motion.header
      className={cn("sticky top-0 z-50 w-full")}
      initial={false}
      animate={isHome ? "home" : "notHome"}
      variants={{ home: { marginTop: 24 }, notHome: { marginTop: 0 } }}
    >
      <motion.div
        className={cn(
          "@container px-4 md:px-8 grid py-2 grid-rows-1 grid-flow-col-dense items-center justify-between bg-background/70 backdrop-blur-lg"
        )}
        layout
        layoutRoot
        transition={{ type: "spring", stiffness: 200, damping: 40, mass: 0.75 }}
        variants={{
          home: {
            gridTemplateColumns: "0fr 2fr 1fr",
            borderBottom: "1px solid transparent",
            height: "3.5rem",
          },
          notHome: {
            gridTemplateColumns: "1fr 1fr 1fr",
            borderBottom: "1px solid #f4f4f4",
            height: "4rem",
          },
        }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {!isHome && (
            <motion.ul
              key="social-links"
              className={cn("gap-2 hidden md:flex")}
              initial={{ opacity: 0, x: -10, width: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10, width: 0 }}
              layout
            >
              {headerLinks.map((link, index) => (
                <HeaderLink
                  key={index}
                  href={link.href}
                  target="_blank"
                  className="aspect-square"
                >
                  {link.icon}
                </HeaderLink>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
        {visible && (
          <MotionLink
            key={isDesktopScreen ? "logoDesktop" : "logoMobile"}
            href="/"
            layout
            initial={{ opacity: 0 }}
            className={cn(
              "flex items-center gap-2 font-headline uppercase tracking-widest col-start-1 col-span-2 md:col-start-2 md:col-span-1 origin-left"
            )}
            variants={{
              home: { justifyContent: "flex-start", opacity: 1 },
              notHome: {
                justifyContent: isDesktopScreen ? "center" : "flex-start",
                opacity: 1,
              },
            }}
          >
            <span className="inline-block text-2xl @md:hidden">KG</span>
            <span className="text-2xl hidden @md:inline-block">
              Kathryn Gonzalez
            </span>
          </MotionLink>
        )}

        <NavigationLinks
          key="navigation-links"
          className="col-start-3 col-span-1"
        />
      </motion.div>
    </motion.header>
  )
}
