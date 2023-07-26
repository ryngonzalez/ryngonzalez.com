import { AnchorHTMLAttributes } from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { Icons } from "../icons"

function HeaderLink({
  children,
  href,
  className,
  ...rest
}: {
  children: React.ReactNode
  href: string
  className?: string
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 py-1 px-2 md:py-2 md:px-3 hover:bg-secondary border border-transparent hover:border-primary/10 rounded-full text-secondary-foreground transition-all duration-200",
        className
      )}
      {...rest}
    >
      {children}
    </Link>
  )
}

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
            "hidden items-center gap-2 justify-start md:justify-center",
            showLogo ? "flex" : "hidden"
          )}
        >
          <span className="inline-block font-serif text-2xl @md:hidden">
            KG
          </span>
          <span className="font-serif text-2xl hidden @md:inline-block">
            Kathryn Gonzalez
          </span>
        </Link>

        <nav className="flex items-center justify-end gap-1">
          {(siteConfig.mainNav as NavItem[])?.map(
            (item, index) =>
              item.href && (
                <HeaderLink key={index} href={item.href}>
                  {item.title}
                </HeaderLink>
              )
          )}
        </nav>
      </div>
    </header>
  )
}
