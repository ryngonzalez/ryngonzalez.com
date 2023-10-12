import { ArrowUpRight } from "lucide-react"

import { Marquee } from "@/components/ui/Marquee"

export function ContactBanner() {
  return (
    <div className="font-mono bg-primary rounded-3xl text-sm sm:text-base col-span-full lg:col-span-3 xl:col-span-2 p-6 md:p-12 text-primary-foreground flex flex-col gap-4 justify-between">
      <h2 className="uppercase tracking-widest text-base sm:text-xl font-bold">
        Looking for help?
      </h2>
      <p>
        Need help with a project, looking for fractional leadership, or just
        need some advice? Send me details at{" "}
        <a
          href="mailto:kathrynmichellegonzalez@gmail.com"
          className="underline underline-offset-4"
        >
          kathrynmichellegonzalez@gmail.com
        </a>
        <ArrowUpRight size={16} className="inline-block ml-1 no-underline" />
      </p>
      <Marquee className="mt-4">
        <span className="whitespace-nowrap uppercase">Available Q4 2023</span>
      </Marquee>
    </div>
  )
}
