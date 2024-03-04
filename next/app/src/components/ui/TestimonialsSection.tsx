"use client"

import { useRef } from "react"

import { cn } from "@/app/src/lib/utils"

export function Testimonial({
  name,
  title,
  context,
  imageSrc,
  quote,
  className,
}: {
  name: string
  title: string
  context: string
  imageSrc: string
  quote: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "snap-start flex flex-col md:flex-row gap-4 sm:gap-8 max-w-[calc(100vw-32px)] md:max-w-[calc(100vw-64px)] lg:max-w-3xl flex-shrink-0 p-6 sm:p-8 bg-secondary rounded-3xl",
        className
      )}
    >
      <img
        src={imageSrc}
        alt={name}
        className="rounded-full w-20 h-20 object-cover object-center border-4 border-white shadow-2xl"
      />
      <div>
        <h2 className="font-headline text-xl md:text-4xl">{name}</h2>
        <h3 className="text-secondary-foreground font-mono mb-2">
          <span className="text-sm">{title}</span>
          <br />
          <span className="text-sm font-sans italic">{context}</span>
        </h3>
        <blockquote className="text-sm md:text-base">{quote}</blockquote>
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const container = containerRef.current
    const direction = event.clientX > (container?.clientWidth || 0) / 2 ? 1 : -1
    const currentCard = container?.querySelector(
      ".snap-start:not(.hidden)"
    ) as HTMLElement
    container?.scrollBy({
      left: direction * currentCard.offsetWidth,
      behavior: "smooth",
    })
  }

  function generateNavigationHandler(direction: number) {
    return () => {
      const container = containerRef.current
      const currentCard = container?.querySelector(
        ".snap-start:not(.hidden)"
      ) as HTMLElement
      container?.scrollBy({
        left: direction * currentCard.offsetWidth,
        behavior: "smooth",
      })
    }
  }

  function onMouseEvent(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const container = containerRef.current
    const direction = event.clientX > (container?.clientWidth || 0) / 2 ? 1 : -1
    const cursor =
      direction === 1
        ? "url(/icons/right.svg), w-resize"
        : "url(/icons/left.svg), e-resize"
    container?.style.setProperty("cursor", cursor)
  }

  return (
    <div
      className={cn("col-span-full order-2 relative max-w-[calc(100vw-32px)]")}
      onMouseMove={onMouseEvent}
    >
      <h1 className="text-center font-headline text-4xl md:text-5xl mb-6 md:mb-8">
        Testimonials
      </h1>

      <div className="overflow-hidden rounded-3xl">
        <div
          className={cn(
            "flex gap-8 overflow-x-hidden snap-x overflow-y-hidden relative",
            "testimonials-container"
          )}
          ref={containerRef}
          onClick={handleClick}
        >
          <Testimonial
            name="Kara Fong"
            title="Senior Design Director at DoorDash"
            context="Kathryn's manager 2022-2023"
            imageSrc="/photos/testimonials/kara.jpeg"
            quote={
              <>
                I had the privilege of having Kathryn on my team when I joined
                DoorDash and I was fortunate to learn a lot from her when I
                started. It&apos;s rare to find a leader who is so humble and
                puts so much of their heart into what they do. She isn&apos;t
                afraid to roll up her sleeves to get the job done with such
                careful attention to detail. She&apos;s a Swiss Army knife - a
                high craft designer, passionate systems-thinker, innovative
                engineer, and a delightful pun master. Kathryn set a strong
                foundation for craft, quality, and our design systems strategy
                here at DoorDash. Anyone who has worked with her can attest to
                the fact that she is an inspiring leader with a wealth of
                knowledge in how to build products 0-1, design systems,
                engineering, team management, and beyond.
              </>
            }
          />
          <Testimonial
            name="Lindsey Menges"
            title="Engineering Manager, Design Engineering at DoorDash"
            context="Managed by Kathryn, 2018-2023"
            imageSrc="/photos/testimonials/lindsey.jpeg"
            quote={
              <>
                {" "}
                I have learned so much from Kathryn in our time working together
                - her expert vision, care and compassion as a leader, and deep
                diligence have helped myself and countless others grow in our
                careers and the work we do and the products we provide to our
                users. Kathryn has the rare ability to navigate both the
                technical, the artistic, and the interpersonal, making her a
                highly trusted leader and partner for everyone she's brought on
                board. I know that I would not be half of the professional that
                I am today without the support, guidance, opportunity, and
                inspiration she gave me every day.
              </>
            }
          />
          <Testimonial
            name="Emma Bergmann"
            title="Product Design Recruiter at DoorDash"
            context="Kathryn's Recruiting Partner, 2021-2023"
            imageSrc="/photos/testimonials/emma.jpeg"
            quote={
              <>
                I had the pleasure of working with Kathryn for nearly two years
                as her Recruiting and Sourcing partner at DoorDash. Kathryn’s
                truly a dream to work with: she’s engaged and excited, process
                and systems oriented, open to iterating and testing and first
                principles driven throughout the hiring funnel. She leans in and
                leads from the front, and will not ask you to do anything she
                herself isn’t willing to do as well. She celebrates successes
                and learning opportunities equally, and genuinely cares about
                her candidates, colleagues, and clients equally.
              </>
            }
          />
          <Testimonial
            name="Camden Asay"
            title="Design Manager, Design Systems at DoorDash"
            context="Managed by Kathryn, 2021-2023"
            imageSrc="/photos/testimonials/camden.jpeg"
            quote={
              <>
                Kathryn is an inspiring leader and thoughtful manager. In my
                time reporting to her at DoorDash, she set a great example of
                how to move a design system forward strategically and keep a
                team motivated to do their best work. I joined DoorDash
                specifically to work with Kathryn and deepen my understanding of
                the best ways to build design infrastructure. I have no regrets.
                I learned much from Kathryn's experience as design-engineer, as
                well as her years building the design infrastructure team at
                DoorDash. I would highly recommend working with Kathryn to
                anyone interested in building UI in a fast and scalable way.
              </>
            }
          />
          <Testimonial
            name="Yarden Eitan"
            title="Principal Engineer & Tech Lead Manager, Design Systems at DoorDash"
            context="Managed by Kathryn, 2022-2023"
            imageSrc="/photos/testimonials/yarden.jpeg"
            quote={
              <>
                I worked with Kathryn as a Design Systems mobile lead while she
                led Design Infrastructure and was my manager at DoorDash. During
                that time, I was constantly impressed by her leadership, her
                deep understanding of design systems, and her ability to inspire
                and bring the most out of the people she works with. Kathryn is
                a natural leader. She sets a high standard for herself and her
                team, and cares a lot about the products and people she
                collaborates with. She is also a great communicator and
                showcases great stakeholder management and transparency to her
                reports.
              </>
            }
          />
        </div>
      </div>

      <div className="flex gap-4 justify-center hover-hover:hidden mb-4 sm:mb-0 mt-4 md:mt-8">
        <button onClick={generateNavigationHandler(-1)}>
          <img src="/icons/left.svg" />
        </button>
        <button onClick={generateNavigationHandler(1)}>
          <img src="/icons/right.svg" />
        </button>
      </div>
    </div>
  )
}
