import Link from "next/link"

import { siteConfig } from "@/app/src/config/site"
import { cn } from "@/app/src/lib/utils"

import { Icons } from "../icons"
import { HeaderLink } from "./HeaderLink"
import { NavigationLinks } from "./NavigationLinks"

export function SiteHeader({ showLogo = true }) {
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

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div
        className={cn(
          "@container container pl-5 pr-5 grid grid-rows-1 grid-cols-2 h-16 items-center justify-between",
          showLogo ? "md:grid-cols-3" : "grid-cols-2"
        )}
      >
        <ul className={cn("gap-2 md:flex", showLogo ? "hidden" : "flex")}>
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
        </ul>

        <Link
          href="/"
          className={cn(
            "hidden items-center gap-2 justify-start md:justify-center font-headline",
            showLogo ? "flex" : "hidden"
          )}
        >
          <span className="inline-block text-2xl @md:hidden">KG</span>
          <span className="text-2xl hidden @md:inline-block">
            Kathryn Gonzalez
          </span>
        </Link>

        <NavigationLinks />
      </div>
    </header>
  )
}
