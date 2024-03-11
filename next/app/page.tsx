import { ApproachSection } from "@/app/src/components/ui/ApproachSection"
import { CapabilitiesSection } from "@/app/src/components/ui/CapabilitiesSection"
import { ContactBanner } from "@/app/src/components/ui/ContactBanner"
import { ExperienceSection } from "@/app/src/components/ui/ExperienceSection"
import { MyStory } from "@/app/src/components/ui/MyStory"
import { NavigationLinks } from "@/app/src/components/ui/NavigationLinks"
import StickerHeader from "@/app/src/components/ui/StickerHeader"
import { TestimonialsSection } from "@/app/src/components/ui/TestimonialsSection"

function IndexPage() {
  return (
    <>
      {/* <header className="mt-8 px-4 md:px-8 flex flex-col-reverse md:flex-row items-start md:items-center gap-10 justify-between w-full md:sticky top-0 z-50 py-4 bg-background">
        <h1 className="font-headline text-2xl md:text-[2vw] font-extrabold uppercase tracking-widest">
          Kathryn Gonzalez
        </h1>
        <NavigationLinks className="" />
      </header> */}
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
      <h1 className="font-headline text-4xl md:text-7xl w-full caps">
        Independent Design & Engineering Director
      </h1>
      <h2 className="text-1xl md:text-2xl mb-4 md:mb-8 w-full text-balance">
        I help early-stage companies build products with fractional design /
        engineering leadership and hands-on execution.
      </h2>
    </header>
  )
}

export default IndexPage
