import Link from "next/link"
import { DndContext } from "@dnd-kit/core"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import Avatar from "@/components/avatar"
import GradientMesh from "@/components/gradient-mesh"
import { Icons } from "@/components/icons"
import { SiteHeader } from "@/components/site-header"
import StickerHeader from "@/components/sticker-header"

function HighlightText({
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
    <section className="w-full flex flex-col items-start gap-10 pb-4 md:pb-8 pt-8 m-auto">
      <div className="px-6 w-full">
        <StickerHeader />
      </div>
      <div className="flex flex-col items-start gap-6 leading-loose container max-w-3xl ">
        <h1 className="text-4xl md:text-5xl font-serif text-balance">
          <span className="">Kathryn Gonzalez</span> — Independent Design and
          Engineering Director.
        </h1>
        <h2 className="text-2xl md:text-3xl">
          I help companies build products with systems, design engineering, and
          strategic craft.
        </h2>
        <div className="max-w-[700px] text-lg md:text-xl leading-relaxed text-secondary-foreground flex flex-col items-start gap-6">
          <p>
            I joined{" "}
            <HighlightText className="cursor-rocket hover:text-[#ff3008]">
              DoorDash
            </HighlightText>{" "}
            in 2015 as their first designer and frontend engineer. I then spent
            8 years building and leading the design infrastructure org (design
            systems, design engineering, prototyping, accessibility).
          </p>
          <p>
            Now, I'm currently in the middle of a{" "}
            <HighlightText className="cursor-vacation hover:text-blue-400">
              long break
            </HighlightText>
            .
          </p>
          <p>
            P.S. — I'm also an{" "}
            <HighlightText className="cursor-money hover:text-green-500">
              angel investor
            </HighlightText>{" "}
            and advisor to early-stage startups.
          </p>
        </div>
        <div className="grid content-start grid-cols-2 w-full md:w-fit md:grid-cols-4 gap-4 mt-6">
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.email}
            className={`gap-2 ${buttonVariants({
              variant: "secondary",
              width: "block",
            })}`}
          >
            <Icons.mail className="h-5 w-5 stroke-current" />
            Email
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.twitter}
            className={`gap-2 ${buttonVariants({
              variant: "secondary",
              width: "block",
            })}`}
          >
            <Icons.twitter className="h-5 w-5 fill-current" />
            Twitter
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className={`gap-2 ${buttonVariants({
              variant: "secondary",
              width: "block",
            })}`}
          >
            <Icons.gitHub className="h-5 w-5 fill-current" />
            GitHub
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.linkedin}
            className={`gap-2 ${buttonVariants({
              variant: "secondary",
              width: "block",
            })}`}
          >
            <Icons.linkedin className="h-5 w-5 stroke-current" />
            LinkedIn
          </Link>
        </div>
      </div>
    </section>
  )
}

export default IndexPage
