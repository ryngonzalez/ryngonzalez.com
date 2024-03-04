import { Suspense } from "react"

import { createHeading } from "../src/components/mdx/createHeading"
import { CustomMDX } from "../src/components/mdx/mdx"
import { getBitsPosts } from "../src/db/blog"

function formatDate(dateString: string) {
  const date = new Date(dateString)
  const today = new Date()
  const diff = today.getTime() - date.getTime()
  // If the date is less than 90 days ago, return the full date
  if (diff >= 1000 * 60 * 60 * 24 * 90) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } else {
    // Otherwise return the relative date
    return new Intl.RelativeTimeFormat("en", {
      style: "long",
    }).format(-Math.round(diff / (1000 * 60 * 60 * 24)), "day")
  }
}

const BitsHeading = createHeading(3)

export default async function Page() {
  const bits = await getBitsPosts()
  return (
    <section className="max-w-2xl mx-auto flex flex-col gap-12">
      <header className="flex flex-col gap-4 pb-8 leading-relaxed border-b border-border text-lg">
        <h1 className="font-headline text-6xl mb-2">
          <span className="block uppercase tracking-wider text-2xl">Bits:</span>
          Learnings, Makings, Lil Threads
        </h1>
        <p>
          This is a space for the bits, the little things, the experiments, and
          the ideas that I want to document and share!
        </p>
      </header>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col">
          {bits.map((post) => (
            <article key={post.slug} className="flex flex-col gap-4">
              <BitsHeading
                className="text-4xl font-headline"
                text={post.metadata.title}
              >
                {post.metadata.title}
                <span className="font-mono uppercase text-base text-secondary-foreground ml-4">
                  {formatDate(post.metadata.publishedDate)}
                </span>
              </BitsHeading>
              <CustomMDX source={post.content} key={post.slug} />
            </article>
          ))}
        </div>
        <div className="relative w-full">
          <h3 className="relative left-1/2 -translate-x-1/2 inline-block px-8 py-4 mx-auto bg-background text-4xl font-headline text-center z-10">
            The End
          </h3>
          <hr className="absolute left-0 w-full top-1/2 z-0" />
        </div>
      </div>
    </section>
  )
}
