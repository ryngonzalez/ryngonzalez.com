import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { HeaderLink } from "./HeaderLink"

export function NavigationLinks({ className }: { className?: string }) {
  return (
    <nav className={cn("flex items-center justify-end gap-1", className)}>
      {(siteConfig.mainNav as NavItem[])?.map(
        (item, index) =>
          item.href && (
            <HeaderLink key={index} href={item.href}>
              {item.title}
            </HeaderLink>
          )
      )}
    </nav>
  )
}
