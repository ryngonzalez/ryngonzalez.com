import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import Avatar from "@/components/avatar"
import GradientMesh from "@/components/gradient-mesh"
import { Icons } from "@/components/icons"

function IndexPage() {
  return (
    <section className="container flex flex-col items-start gap-10 pb-4 md:pb-8 pt-6 md:py-10 m-auto max-w-3xl mt-16">
      <GradientMesh />
      <div className="flex flex-col items-start gap-6 leading-loose">
        <Avatar
          src="/Headshot-transformed.jpeg"
          alt="Image of Kathryn Gonzalez"
        />
        <h1 className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-br from-gray-300 to-gray-600">
          <span className="">Kathryn Gonzalez</span> — Independent Design and
          Engineering Director.
        </h1>
        <h2 className="text-2xl md:text-3xl">
          I help companies build products with systems, design engineering, and
          strategic craft.
        </h2>
        <div className="max-w-[700px] text-lg md:text-xl leading-relaxed text-muted-foreground flex flex-col items-start gap-6">
          <p>
            I joined{" "}
            <span className="cursor-rocket text-primary transition-colors duration-300 hover:text-[#ff3008]">
              DoorDash
            </span>{" "}
            in 2015 as their first designer and frontend engineer. I then spent
            8 years building and leading the design infrastructure org (design
            systems, design engineering, prototyping, accessibility).
          </p>
          <p>
            Now, I'm currently in the middle of a{" "}
            <span className="text-primary hover:text-blue-400 cursor-vacation transition-colors duration-300">
              long break
            </span>
            .
          </p>
          <p>
            P.S. — I'm also an{" "}
            <span className="text-primary cursor-money hover:text-green-500 transition-colors duration-300">
              angel investor
            </span>{" "}
            and advisor to early-stage startups.
          </p>
        </div>
      </div>
      <div className="grid content-start grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.email}
          className={`gap-2 ${buttonVariants({ variant: "outline" })}`}
        >
          <Icons.mail className="h-5 w-5 stroke-current" />
          Email
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.twitter}
          className={`gap-2 ${buttonVariants({ variant: "outline" })}`}
        >
          <Icons.twitter className="h-5 w-5 fill-current" />
          Twitter
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={`gap-2 ${buttonVariants({ variant: "outline" })}`}
        >
          <Icons.gitHub className="h-5 w-5 fill-current" />
          GitHub
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.linkedin}
          className={`gap-2 ${buttonVariants({ variant: "outline" })}`}
        >
          <Icons.linkedin className="h-5 w-5 stroke-current" />
          LinkedIn
        </Link>
      </div>
    </section>
  )
}

export default IndexPage
