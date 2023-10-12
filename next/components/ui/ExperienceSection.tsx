import { cn } from "@/lib/utils"

export function ExperienceSection({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "text-sm col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-12 md:gap-8 place-items-center leading-loose bg-background border-4 p-12 rounded-3xl",
        className
      )}
    >
      {/* <h2 className="text-4xl font-headline">Where I've Worked</h2> */}
      <div className="flex-col items-center text-center">
        <img
          width="160"
          src="/logos/fuzzco.svg"
          alt="Fuzzco Logo"
          className="mb-2 mx-auto"
        />
        <h2 className="font-mono text-primary leading-snug">
          Designer & UI Engineer
        </h2>
        <h3 className="font-mono text-muted-foreground">2012</h3>
      </div>
      <div className="flex-col items-center text-center">
        <img
          width="180"
          src="/logos/fetchnotes.svg"
          alt="Fetchnotes Logo"
          className="mb-2 mx-auto"
        />
        <h2 className="font-mono text-primary leading-snug">
          Founding Designer & UI Engineer
        </h2>
        <h3 className="font-mono text-muted-foreground">2013-2015</h3>
      </div>

      <div className="flex-col items-center text-center md:col-span-full lg:col-span-1">
        <img
          width="250"
          src="/logos/doordash.svg"
          alt="DoorDash Logo"
          className="mb-2 mx-auto"
        />
        <h2 className="font-mono text-primary leading-snug">
          First Designer & UI Engineer &rarr; Head of Design Infrastructure
        </h2>
        <h3 className="font-mono text-muted-foreground">2015-2023</h3>
      </div>
    </div>
  )
}
