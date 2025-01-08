import { ArrowUpRight } from "lucide-react"

import { Marquee } from "@/app/src/components/ui/Marquee"

export function ContactBanner() {
  return (
    <div className="font-mono bg-primary rounded-3xl text-sm sm:text-base col-span-full lg:col-span-3 xl:col-span-2 p-6 md:p-8 text-primary-foreground flex flex-col gap-4 justify-between">
      <h2 className="uppercase tracking-widest text-base sm:text-xl font-bold">
        Looking for help?
      </h2>
      <p>
        Need help with a project, looking for fractional leadership, or just
        need some advice?{" "}
        <a
          href="mailto:kathryn@makeshiftlabs.io"
          className="underline underline-offset-4"
        >
          Send me an email
        </a>{" "}
        with details.
      </p>
      <Marquee className="mt-4">
        <span className="whitespace-nowrap uppercase">
          Email me for availability
        </span>
      </Marquee>
    </div>
  )
}
