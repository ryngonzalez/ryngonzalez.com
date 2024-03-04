import Link from "next/link"

import { siteConfig } from "@/app/src/config/site"
import { cn } from "@/app/src/lib/utils"

import { Icons } from "../icons"
import { HeaderLink } from "./HeaderLink"
import { NavigationLinks } from "./NavigationLinks"

export function SiteHeader({ showLogo = true }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div
        className={cn(
          "@container container pl-5 pr-5 grid grid-rows-1 grid-cols-2 h-16 items-center justify-between",
          showLogo ? "md:grid-cols-3" : "grid-cols-2"
        )}
      >
        <ul className={cn("gap-2 md:flex", showLogo ? "hidden" : "flex")}>
          <HeaderLink
            href={siteConfig.links.github}
            target="_blank"
            className="aspect-square"
          >
            <Icons.gitHub className="h-5 w-5 fill-current" />
          </HeaderLink>
          <HeaderLink
            href={siteConfig.links.twitter}
            target="_blank"
            className="aspect-square"
          >
            <Icons.twitter className="h-5 w-5 fill-current" />
          </HeaderLink>
          <HeaderLink
            href={siteConfig.links.threads}
            target="_blank"
            className="aspect-square"
          >
            <Icons.threads className="h-5 w-5 fill-current" />
          </HeaderLink>
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
