import { siteConfig } from "@/app/src/config/site"
import { cn } from "@/app/src/lib/utils"
import { NavItem } from "@/app/src/types/nav"

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
