import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export function SocialButton({
  children,
  href,
  className,
}: {
  children: React.ReactNode
  href: string
  className?: string
}) {
  return (
    <Link
      target="_blank"
      rel="noreferrer"
      href={href}
      className={cn(
        `gap-2 ${buttonVariants({
          variant: "linkReverse",
          width: "default",
        })}`,
        className
      )}
    >
      {children}
    </Link>
  )
}
