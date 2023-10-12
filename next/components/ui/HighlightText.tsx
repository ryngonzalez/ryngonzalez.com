import { cn } from "@/lib/utils"

export function HighlightText({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span className={cn(className, "text-primary transition-colors font-bold")}>
      {children}
    </span>
  )
}
