import { cn } from "@/lib/utils"
import { Photo } from "@/components/ui/photo"
import { Postcard } from "@/components/ui/postcard"

import { HighlightText } from "../../app/page"

export function MyStory({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "lg:order-1 col-span-full lg:col-span-5 flex flex-col items-start gap-10 leading-loose bg-background border-4 p-6 md:p-12 rounded-3xl",
        className
      )}
    >
      <h2 className="font-headline text-4xl">About Me</h2>
      <div className="text-base md:text-lg text-secondary-foreground flex flex-col items-start gap-10 sm:gap-20">
        <div
          className="grid lg:grid-cols-2 grid-flow-row items-center gap-8 sm:gap-16"
          style={{ perspective: 1000 }}
        >
          <Photo
            src="/photos/2015.jpg"
            alt="DoorDash hitting it's millionth total order back in 2015."
            direction="left"
          />
          <p className="leading-relaxed">
            I joined <HighlightText className="">DoorDash</HighlightText> in
            2015 as their first designer and frontend engineer after years
            working in startups and agencies. I worked for 2 years as a lead
            product designer across Consumer and Merchant products, started
            their platform product (DoorDash Drive), and led their frontend
            engineering across audiences.
          </p>
        </div>
        <div
          className="grid lg:grid-cols-2 items-center gap-8 sm:gap-16"
          style={{ perspective: 1000 }}
        >
          <Photo
            src="/photos/2022.jpg"
            alt="DoorDash hitting it's millionth total order back in 2015."
            direction="right"
            className="lg:order-2"
          />
          <p className="leading-relaxed">
            I then spent 6 years building and leading their{" "}
            <HighlightText className="">
              Design&nbsp;Infrastructure
            </HighlightText>{" "}
            org (design systems, design engineering, prototyping, accessibility)
            — starting as an IC and ending as a manager of managers over an org
            of 25 people.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 items-center gap-8 sm:gap-16">
          <Postcard direction="left" />
          <div>
            <p className="leading-relaxed mb-4">
              Now, I'm currently figuring out what's next after taking a{" "}
              <HighlightText className="">long break</HighlightText> to rest,
              travel and spend time with the people I love.
            </p>
            <p className="leading-relaxed">
              P.S. — I'm also an{" "}
              <HighlightText className="">angel investor</HighlightText> and
              advisor to early-stage startups.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
