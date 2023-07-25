import { AnchorHTMLAttributes } from "react"
import Link, { LinkProps } from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { Icons } from "../icons"

function HeaderLink({
  children,
  href,
  ...rest
}: {
  children: React.ReactNode
  href: string
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 py-1 px-2 md:py-2 md:px-3 hover:bg-secondary border border-transparent hover:border-primary/10 rounded-full text-secondary-foreground transition-all duration-200"
      {...rest}
    >
      {children}
    </Link>
  )
}

export function SiteHeader({ showLogo = true }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="@container container pl-5 pr-5 flex h-16 items-center justify-between">
        <ul className={cn("flex md:inline-flex", showLogo ? "hidden" : "")}>
          <HeaderLink href="https://github.com/ryngonzalez" target="_blank">
            <Icons.gitHub className="h-5 w-5 fill-current" />
          </HeaderLink>
          <HeaderLink href="https://twitter.com/ryngonzalez" target="_blank">
            <Icons.twitter className="h-5 w-5 fill-current" />
          </HeaderLink>
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
                  <HeaderLink key={index} href={item.href}>
                    {item.title}
                  </HeaderLink>
                )
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
