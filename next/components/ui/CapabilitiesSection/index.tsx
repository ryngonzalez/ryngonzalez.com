"use client"

import React from "react"

import { cn } from "@/lib/utils"

import { DefinitionStack } from "./DefinitionStack"

export const CAPABILITIES = [
  {
    title: "Fractional Leadership",
    definition: (
      <>
        Definition:{" "}
        <span className="italic font-bold">Fractional leadership</span> is a way
        to get the benefits of an experienced leader when you're not at a stage
        to fully leverage their time. <br />
        <br />I can help you build a team, strategize on product direction, and
        coach your existing leaders to help them grow.
      </>
    ),
  },
  {
    title: "0 → 1 Strategy",
    definition: (
      <>
        At DoorDash, I led the design for DoorDash's first{" "}
        <span className="font-bold">0 &rarr; 1 product</span> outside of their
        core B2C restaurant delivery marketplace, their{" "}
        <a
          href="https://get.doordash.com/en-us/products/drive"
          className="underline"
        >
          DoorDash Drive
        </a>{" "}
        white-label delivery platform.
        <br />
        <br />I know what it takes to build a product from the ground up, and
        can help your team take the right strategy to get a product to market.
      </>
    ),
  },
  {
    title: "Coaching & Mentorship",
    definition: (
      <>
        Alongside fractional leadership, I can help existing leaders (both
        management or senior contributors) in either design or engineering{" "}
        <span className="font-bold">grow and navigate their careers.</span>
        <br />
        <br />
        If you're an individual looking for mentorship, or a company looking to
        have their team get coaching, please{" "}
        <a className="underline" href="mailto:kathryn@makeshiftlabs.io">
          reach out
        </a>
        .
      </>
    ),
  },
  {
    title: "Team Building",
    definition: (
      <>
        At DoorDash, I established the Design Engineering and Design Systems
        functions—
        <span className="font-bold">building teams of different sizes</span>: 6
        people by 2019, and eventually growing the team to a 25 person org (with
        4 sub-teams of web, mobile, and accessibility engineering, alongside
        design systems design) in 2022. I recruited and hired engineers,
        designers, managers and specialists.
      </>
    ),
  },
  {
    title: "Design Systems",
    definition: (
      <>
        One of my focuses over my career (and what I'm publically known for
        through my speaking) has been{" "}
        <span className="font-bold">building and scaling design systems</span>.
        I've built design systems from scratch, and scaled them to support
        multiple products and teams.
        <br />
        <br />
        I've also built teams at various company stages to establish design
        systems as a core, valuable part of the product development process.
      </>
    ),
  },
  {
    title: "Design Engineering",
    definition: (
      <>
        One of my core beliefs is that{" "}
        <span className="font-bold">design engineering</span> is an invaluable
        role and function to have on a product team, and I can help you
        establish it.
        <br />
        <br />
        Design engineers help ensure that the products you build are
        well-crafted, truly reflective of your vision, and are built with an
        ease and efficiency that allows your team to move quickly.
      </>
    ),
  },
  {
    title: "Management",
    definition: (
      <>
        To build an enduring, impactful product, you need to be able to{" "}
        <span className="font-bold">build, grow, and lead great teams</span>.
        I've built teams from scratch, and scaled them to support how products
        get developed at fast-growing companies like DoorDash.
        <br />
        <br />
        I've established leveling systems, resilient cultures, and built
        processes to lead teams efficiently.
      </>
    ),
  },
  {
    title: "Product Design",
    definition: (
      <>
        As a <span className="font-bold">designer and design leader</span> I
        have experience in the consumer space (establishing one of the most used
        consumer services of the last decade), in the platform space (building a
        white-label delivery platform for businesses), and in the
        design/developer space (building a design system for 125+ designers and
        300+ engineers across platforms).
      </>
    ),
  },
  {
    title: "Hands-On Execution",
    definition: (
      <>
        As a leader, being able and willing to work closely with your team to{" "}
        <span className="font-bold">
          contribute at the lowest level of detail
        </span>{" "}
        is critical to building trust and respect, as well as a deep
        understanding of the product problems they're solving.
        <br />
        <br />I deploy this skill thoughtfully—knowing when to step into the
        work and when to let my team lead the way.
      </>
    ),
  },
]

export function CapabilitiesSection() {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  function handleClickedCapability(index: number) {
    setSelectedIndex(index)
  }
  function handleNextCapability() {
    setSelectedIndex((selectedIndex + 1) % CAPABILITIES.length)
  }
  return (
    <div className="flex flex-col items-center lg:grid grid-rows-2 lg:grid-rows-1 grid-cols-5 col-span-full gap-8 py-8">
      <div className="flex col-span-full lg:col-span-3 gap-2 md:gap-4 flex-wrap items-center h-fit 2xl:place-content-end">
        <h2 className="font-headline text-4xl px-4 md:inline-block">
          What I Do:
        </h2>
        {CAPABILITIES.map((capability, index) => (
          <Capability
            onClick={() => handleClickedCapability(index)}
            selected={index === selectedIndex}
            key={capability.title}
          >
            {capability.title}
          </Capability>
        ))}
      </div>
      <div className="flex col-span-full content-start lg:col-span-2 2xl:place-content-start h-80 w-full justify-center">
        <DefinitionStack
          className="cursor-[url(/icons/down-left.svg),sw-resize] select-none"
          index={selectedIndex}
          allCapabilities={CAPABILITIES}
          handleNextClick={handleNextCapability}
        />
      </div>
    </div>
  )
}
function Capability({
  children,
  onClick,
  selected,
}: {
  children: React.ReactNode
  onClick?: () => void
  selected?: boolean
}) {
  return (
    <h3
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-2 py-2 lg:py-3 px-4 lg:px-6 border-4 rounded-full text-base md:text-xl lg:text-2xl tracking-tight font-mono font-bold shrink-0 transition-[color,background,transform] active:scale-95 cursor-pointer",
        selected && "bg-purple-50 border-purple-200"
      )}
    >
      {children}
    </h3>
  )
}
