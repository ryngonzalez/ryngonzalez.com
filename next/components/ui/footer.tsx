import { ArrowUpRight, MessageCircleIcon } from "lucide-react"

import { siteConfig } from "@/config/site"
import { SocialButton } from "@/components/ui/SocialButton"
import { Icons } from "@/components/icons"

export default function Footer() {
  return (
    <footer className="w-full font-sans text-primary text-center text-sm px-4 pb-4">
      <div className="w-full rounded-3xl bg-primary grid md:grid-cols-2 gap-6 md:gap-0 p-6 sm:p-8">
        <div className="w-full grid content-start text-sm sm:text-base grid-cols-2 px-4 md:px-8 md:grid-cols-5 gap-4 mt-6 text-primary-foreground">
          <h1 className="text-left font-headline col-span-full uppercase font-bold tracking-widest text-2xl">
            Let's Chat{" "}
            <MessageCircleIcon
              className="inline align-top fill-primary-foreground"
              size={24}
            />
          </h1>
          <div className="col-span-full text-left">
            <p>
              <span className="italic">Interested in working together?</span>
            </p>
            <ul className="list-disc pl-4 py-2">
              <li className="list-item">Need help with a project?</li>
              <li className="list-item">
                Looking for fractional leadership for your startup?
              </li>
              <li className="list-item">
                Need coaching as a senior designer or engineer?
              </li>
              <li className="list-item">
                Work in the design / dev tools space and looking for an
                angel-investor?
              </li>
            </ul>
            <p>
              Send me details at{" "}
              <span className="whitespace-nowrap">
                <a
                  href="mailto:kathrynmichellegonzalez@gmail.com"
                  className="underline underline-offset-4"
                >
                  kathrynmichellegonzalez@gmail.com
                </a>
                <ArrowUpRight
                  size={16}
                  className="inline-block ml-1 no-underline"
                />
              </span>{" "}
            </p>
          </div>
        </div>
        <div className="w-full grid content-start grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 border-t pt-8 md:pt-0 md:border-t-0 md:border-l border-border/10">
          <h1 className="font-headline text-primary-foreground col-span-full uppercase font-bold tracking-widest text-2xl mb-4">
            Elsewhere <ArrowUpRight className="inline align-top" size={24} />
          </h1>
          <SocialButton href={siteConfig.links.email}>
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
          <SocialButton href={siteConfig.links.readcv}>
            <Icons.readcv className="h-5 w-5 fill-current" />
            ReadCV
          </SocialButton>
          <span className="col-span-full w-full text-center text-primary-foreground mt-8">
            &copy; {new Date().getFullYear()} Kathryn Gonzalez -{" "}
            <span>✌️&#xFE0E;</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
