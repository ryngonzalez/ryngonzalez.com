import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { Icons } from "../icons"

export function SiteHeader({ showLogo = true }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="@container container pl-5 pr-5 flex h-16 items-center justify-between">
        <ul className={cn("flex md:inline-flex", showLogo ? "hidden" : "")}>
          <Link
            href="https://github.com/ryngonzalez"
            target="_blank"
            className="flex items-center gap-2 py-1 px-2 md:py-2 md:px-3 hover:bg-secondary border border-transparent hover:border-white/20 rounded-full text-secondary-foreground"
          >
            <Icons.gitHub className="h-5 w-5 fill-current" />
          </Link>
          <Link
            href="https://twitter.com/ryngonzalez"
            target="_blank"
            className="flex items-center gap-2 py-1 px-2 md:py-2 md:px-3 hover:bg-secondary border border-transparent hover:border-white/20 rounded-full text-secondary-foreground"
          >
            <Icons.twitter className="h-5 w-5 fill-current" />
          </Link>
        </ul>
        {showLogo && (
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-block font-serif text-2xl @md:hidden">
              KG
            </span>
            <span className="font-serif text-2xl hidden @md:inline-block">
              Kathryn Gonzalez
            </span>
          </Link>
        )}

        <div className="flex">
          <nav className="flex items-center gap-2">
            {(siteConfig.mainNav as NavItem[])?.map(
              (item, index) =>
                item.href && (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center text-base font-medium py-1 px-2 md:py-2 md:px-3 hover:bg-secondary border border-transparent hover:border-white/20 rounded-full text-secondary-foreground",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                  >
                    {item.title}
                  </Link>
                )
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
