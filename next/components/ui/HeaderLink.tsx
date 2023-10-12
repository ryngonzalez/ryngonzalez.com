"use client"

import { AnchorHTMLAttributes } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function HeaderLink({
  children,
  href,
  className,
  ...rest
}: {
  children: React.ReactNode
  href: string
  className?: string
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const pathname = usePathname()

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 py-1 px-2 md:py-2 md:px-3 rounded-full text-secondary-foreground transition-colors duration-200",
        pathname === href
          ? "bg-primary text-primary-foreground"
          : "hover:bg-secondary",
        className
      )}
      {...rest}
    >
      {children}
    </Link>
  )
}
