import { ArrowUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { NavigationLinks } from "@/components/ui/NavigationLinks"
import StickerHeader from "@/components/ui/sticker-header"

import { ApproachSection } from "../components/ui/ApproachSection"
import { CapabilitiesSection } from "../components/ui/CapabilitiesSection"
import { ContactBanner } from "../components/ui/ContactBanner"
import { ExperienceSection } from "../components/ui/ExperienceSection"
import { MyStory } from "../components/ui/MyStory"
import { TestimonialsSection } from "../components/ui/TestimonialsSection"

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

function IndexPage() {
  return (
    <>
      <header className="mt-8 px-4 md:px-8 flex flex-col-reverse md:flex-row items-start md:items-center gap-10 justify-between w-full md:sticky top-0 z-50 py-4 bg-background">
        <h1 className="font-headline text-2xl md:text-[2vw] font-extrabold uppercase tracking-widest">
          Kathryn Gonzalez
        </h1>
        <NavigationLinks className="" />
      </header>
      <section className="w-full flex flex-col items-start gap-6 md:gap-10 pb-4 md:pb-8 m-auto">
        <div className="w-full flex flex-col items-start gap-6 md:gap-10 px-4 md:px-8">
          <PageHeader />
          <div className="grid grid-cols-6 gap-6 md:gap-10 z-10">
            <ContactBanner />
            <StickerHeader className="col-span-full lg:col-span-3 xl:col-span-4 mt-6 sm:mt-0" />
          </div>
          <div className="grid grid-cols-8 gap-6 md:gap-10 z-0">
            <CapabilitiesSection />
            <ApproachSection />
            <ExperienceSection className="" />
            <MyStory className="" />
          </div>
          <TestimonialsSection />
        </div>
      </section>
    </>
  )
}

function PageHeader() {
  return (
    <header className="w-full flex flex-col items-start gap-6">
      <h1 className="font-headline text-5xl sm:text-[6vw] md:text-[6.25vw] w-full caps">
        Independent Design & Engineering Director
      </h1>
      <h2 className="text-1xl md:text-2xl mb-4 md:mb-8 w-full text-balance">
        I help early-stage companies build products with fractional design /
        engineering leadership and hands-on execution.
      </h2>
    </header>
  )
}

export function ApproachListItem({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <li className="marker:text-red-500 marker:font-bold">
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p>{description}</p>
    </li>
  )
}

export default IndexPage
