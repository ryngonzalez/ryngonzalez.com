import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Photo } from "@/components/ui/photo"
import { Postcard } from "@/components/ui/postcard"
import StickerHeader from "@/components/ui/sticker-header"
import { Icons } from "@/components/icons"

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

function SocialButton({
  children,
  href,
  className,
}: {
  children: React.ReactNode
  href: string
  className?: string
}) {
  return (
    <Link
      target="_blank"
      rel="noreferrer"
      href={href}
      className={cn(
        `gap-2 ${buttonVariants({
          variant: "secondary",
          width: "block",
        })}`,
        className
      )}
    >
      {children}
    </Link>
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
        <h2 className="text-2xl md:text-3xl mb-4 md:mb-8">
          I help companies build products with systems, design engineering, and
          strategic craft.
        </h2>
        <hr className="w-24 border-border mx-auto mb-0 md:mb-20" />
        <div className="max-w-[700px]text-lg md:text-xl text-secondary-foreground flex flex-col items-start gap-8">
          <div className="md:flex">
            <Photo
              src="/photos/2015.jpg"
              alt="DoorDash hitting it's millionth total order back in 2015."
              direction="left"
            />
            <p className="leading-relaxed">
              I joined{" "}
              <HighlightText className="cursor-rocket hover:text-[#ff3008]">
                DoorDash
              </HighlightText>{" "}
              in 2015 as their first designer and frontend engineer. I worked
              for 2 years as a lead product designer across Consumer and
              Merchant products, started their platform product (DoorDash
              Drive), and lead their frontend engineering across audiences.
            </p>
          </div>
          <div className="md:flex">
            <p className="leading-relaxed">
              I then spent 6 years building and leading their{" "}
              <HighlightText className="cursor-tools hover:text-yellow-600">
                Design&nbsp;Infrastructure
              </HighlightText>{" "}
              org (design systems, design engineering, prototyping,
              accessibility) — starting as an IC and ending as a manager of
              managers over an org of 25 people.
            </p>
            <Photo
              src="/photos/2022.jpg"
              alt="DoorDash hitting it's millionth total order back in 2015."
              direction="right"
            />
          </div>
          <div className="md:flex flex-row-reverse">
            <div>
              <p className="leading-relaxed mb-4">
                Now, I'm currently in the middle of a{" "}
                <HighlightText className="cursor-vacation hover:text-blue-400">
                  long break
                </HighlightText>{" "}
                to rest, travel, and figure out my next adventure.
              </p>
              <p className="leading-relaxed">
                P.S. — I'm also an{" "}
                <HighlightText className="cursor-money hover:text-green-500">
                  angel investor
                </HighlightText>{" "}
                and advisor to early-stage startups.
              </p>
            </div>
            <Postcard direction="left" />
          </div>
        </div>
        <div className="grid content-start grid-cols-2 w-full md:w-fit md:grid-cols-5 gap-4 mt-6">
          <SocialButton
            href={siteConfig.links.email}
            className="col-span-2 md:col-span-1"
          >
            <Icons.mail className="h-5 w-5 stroke-current" />
            Email
          </SocialButton>
          <SocialButton href={siteConfig.links.twitter}>
            <Icons.twitter className="h-5 w-5 fill-current" />
            Twitter
          </SocialButton>
          <SocialButton href={siteConfig.links.threads}>
            <Icons.threads className="h-5 w-5 fill-current" />
            Threads
          </SocialButton>
          <SocialButton href={siteConfig.links.github}>
            <Icons.gitHub className="h-5 w-5 fill-current" />
            GitHub
          </SocialButton>
          <SocialButton href={siteConfig.links.linkedin}>
            <Icons.linkedin className="h-5 w-5 stroke-current" />
            LinkedIn
          </SocialButton>
        </div>
      </div>
    </section>
  )
}

export default IndexPage
