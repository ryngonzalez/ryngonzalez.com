"use client"

import { useRef } from "react"

import { cn } from "@/lib/utils"

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
        <h2 className="font-headline text-xl md:text-2xl">
          {name}, {title}
        </h2>
        <h3 className="text-secondary-foreground font-mono mb-2 text-sm md:text-base">
          {context}
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
            name="Lindsey Menges"
            title="Manager of Design Engineering at DoorDash"
            context="Managed by Kathryn, 2018-2023"
            imageSrc="https://media.licdn.com/dms/image/C4E03AQErSX6JUPKV5w/profile-displayphoto-shrink_100_100/0/1516992051983?e=1702512000&v=beta&t=V0aLOWls2z-X_2sjKnI5wmsUYGEAMUTR7GOFAfmsSxY"
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
            name="Camden Asay"
            title="Manager of Design Systems at DoorDash"
            context="Managed by Kathryn, 2021-2023"
            imageSrc="https://media.licdn.com/dms/image/D4E35AQHH5BCv4tYQ8g/profile-framedphoto-shrink_800_800/0/1693238114455?e=1697605200&v=beta&t=wm-inFrhwX2BpyHiP_PMIw3BTOf_pzsz2lC-jXqrHME"
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
            title="Principal Engineer & Mobile Tech Lead Manager, Design Systems at DoorDash"
            context="Managed by Kathryn, 2022-2023"
            imageSrc="https://media.licdn.com/dms/image/C4D03AQGbYADqWwBKfQ/profile-displayphoto-shrink_400_400/0/1517069288965?e=1702512000&v=beta&t=ULJsFx-eHA9tVjcyDTocljvCAn_MFd4zR3frzyng6-M"
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
