import Image from "next/image"
import Link from "next/link"

import { getBlogPosts, getPodcastPosts, getTalkPosts } from "../src/db/blog"
import { Post } from "../src/types/blog/Post"

function sortByDate(a: Post, b: Post): number {
  if (new Date(a.metadata.publishedDate) > new Date(b.metadata.publishedDate)) {
    return -1
  }
  return 1
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
}

function WritingLink({ post }: { post: Post }) {
  return (
    <Link
      key={post.slug}
      className="flex flex-col hover:bg-secondary rounded-lg transition-colors duration-200 p-4"
      href={`/blog/${post.slug}`}
    >
      <div className="w-full flex flex-col">
        <div className="flex items-baseline gap-3">
          <p className="text-xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            {post.metadata.title}
          </p>
          <p className="text-neutral-600 dark:text-neutral-400 font-mono uppercase text-base tracking-wide inline">
            {formatDate(post.metadata.publishedDate)}
          </p>
        </div>
        <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
          {post.metadata.subtitle}
        </p>
      </div>
    </Link>
  )
}

function TalkLink({ post }: { post: Post }) {
  return (
    <Link
      key={post.slug}
      className="flex flex-col hover:bg-secondary rounded-lg transition-colors duration-200 p-4"
      href={`/blog/${post.slug}`}
    >
      <div className="w-full flex flex-col">
        {post.metadata.image && (
          <Image
            src={post.metadata?.image}
            alt={post.metadata.title}
            width={320}
            height={200}
            className="rounded-lg overflow-hidden mb-4 border-border border"
          />
        )}
        <div className="flex flex-col items-baseline gap-3">
          <p className="text-xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            {post.metadata.title}
          </p>
          <p className="text-neutral-600 dark:text-neutral-400 font-mono uppercase text-base tracking-wide inline">
            {formatDate(post.metadata.publishedDate)}
          </p>
        </div>
      </div>
    </Link>
  )
}

async function Page() {
  let allBlogs = await getBlogPosts()
  let allTalks = await getTalkPosts()
  let allPodcasts = await getPodcastPosts()

  return (
    <section className="max-w-2xl mx-auto flex flex-col gap-12">
      <header className="flex flex-col gap-4 pb-8 leading-relaxed border-b border-border text-lg">
        <h1 className="font-headline text-6xl mb-2">
          <span className="block uppercase tracking-wider text-2xl">
            The Blog:
          </span>
          Writing, Talks, and Podcasts
        </h1>
        <p>
          Howdy! This is my space for sharing my ideas, interviews, talks,
          podcasts, and other long-form things I’ve done in my time out on the
          world-wide-web.
        </p>
        <p>
          I’ve been on and off on writing over the last decade, so there are
          quite a few gaps over the years, but I hope to share much more
          consistently in this next decade!
        </p>
        <p>
          If you have any thoughts or anything you want to point out, shoot me
          an email.
        </p>
      </header>
      <div className="flex flex-col gap-8">
        <h2 className="text-4xl font-headline">Writing</h2>
        <div className="flex flex-col -ml-4 -mr-4">
          {allBlogs.sort(sortByDate).map((post) => (
            <WritingLink post={post} key={post.slug} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <h2 className="text-4xl font-headline">Talks</h2>
        <div className="grid grid-cols-2 -ml-4 -mr-4">
          {allTalks.sort(sortByDate).map((post) => (
            <TalkLink post={post} key={post.slug} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <h2 className="text-4xl font-headline">Podcasts</h2>
        <div className="flex flex-col -ml-4 -mr-4">
          {allPodcasts.sort(sortByDate).map((post) => (
            <WritingLink post={post} key={post.slug} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Page
