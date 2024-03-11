import Link from "next/link"

import { buttonVariants } from "@/app/src/components/ui/Button"
import { cn } from "@/app/src/lib/utils"

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
