import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import Image from "next/image"

function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10 m-auto max-w-[840px]">
      <div className="flex flex-col items-start gap-2 leading-loose">
        <Image src="/Headshot-transformed.jpeg" width={200} height={200} className="rounded-full mb-6" alt="Image of Kathryn Gonzalez" />
        <h1 className="text-3xl font-medium md:text-4xl">
          <span className="font-extrabold">Independent Design and Engineering Director.</span>
          <span> I help companies build products with systems, design engineering, and strategic craft.</span>
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          I spent 8 years building and leading the design infrastructure org (design systems, design engineering, prototyping, accessibility) at DoorDash after starting as their first designer and frontend engineer. Now, I'm currently in the middle of a long break.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.twitter}
          className={`flex gap-2 ${buttonVariants({ variant: "outline" })}`}
        >
          <Icons.twitter className="h-5 w-5 fill-current" />
          Twitter
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={`flex gap-2 ${buttonVariants({ variant: "outline" })}`}
        >
          <Icons.gitHub className="h-5 w-5 fill-current" />
          GitHub
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.linkedin}
          className={`flex gap-2 ${buttonVariants({ variant: "outline" })}`}
        >
          <Icons.linkedin className="h-5 w-5 fill-current" />
          LinkedIn
        </Link>
      </div>
    </section>
  )
}

export default IndexPage