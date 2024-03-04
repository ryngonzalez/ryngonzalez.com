import { cn } from "@/app/src/lib/utils"

export function Marquee({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <article
      className={cn(
        "flex whitespace-no-wrap overflow-x-scroll motion-safe:overflow-x-hidden relative z-0",
        "before:absolute before:inset-0 before:left-0 before:bottom-0 before:z-10 before:from-transparent before:to-primary before:bg-gradient-to-l before:h-full before:w-8",
        "after:absolute after:inset-0 after:left-[calc(100%-32px)] after:bottom-0 after:z-10 after:from-transparent after:to-primary after:bg-gradient-to-r after:h-full after:w-8",
        className
      )}
    >
      <div className="relative" aria-hidden>
        <ul className="flex motion-safe:animate-marquee">
          <li className="mx-4">{children}</li>
          <li className="mx-4">{children}</li>
          <li className="mx-4">{children}</li>
          <li className="mx-4">{children}</li>
          <li className="mx-4">{children}</li>
          <li className="mx-4">{children}</li>
          <li className="mx-4">{children}</li>
          <li className="mx-4">{children}</li>
          <li className="mx-4">{children}</li>
        </ul>
        <ul className="flex absolute top-0 motion-safe:animate-marquee2">
          <li className="mx-4">{children}</li>
          <li className="mx-4">{children}</li>
          <li className="mx-4">{children}</li>
          <li className="mx-4">{children}</li>
          <li className="mx-4">{children}</li>
          <li className="mx-4">{children}</li>
          <li className="mx-4">{children}</li>
          <li className="mx-4">{children}</li>
          <li className="mx-4">{children}</li>
        </ul>
      </div>
      <span className="peer-aria-hidden:hidden">{children}</span>
    </article>
  )
}
