import { cn } from "../../lib/utils"

export function Placeholder({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "block bg-gray-50/50 overflow-hidden relative before:absolute before:z-50 before:inset-0 before:-translate-x-full before:bg-shimmer before:animate-shimmer before:from-transparent before:to-transparent before:via-gray-100 rounded-md",
        className
      )}
    />
  )
}
