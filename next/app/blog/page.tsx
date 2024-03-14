import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"

import { Placeholder } from "../src/components/ui/Placeholder"
import {
  getAllPosts,
  getBlogPosts,
  getPodcastPosts,
  getTalkPosts,
} from "../src/db/blog"
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
        <div className="flex flex-col md:flex-row items-baseline gap-0 md:gap-3">
          <p className="text-lg md:text-xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
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
            className="rounded-lg overflow-hidden mb-4 border-border border w-full"
          />
        )}
        <div className="flex flex-col items-baseline gap-0 md:gap-3">
          <p className="text-lg md:text-xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
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

function SectionContainer({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) {
  return (
    <section className="flex flex-col gap-8">
      <h2 className="text-3xl md:text-4xl font-headline">{title}</h2>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </section>
  )
}

function StackedLinks({ children }: { children: React.ReactNode }) {
  const fallback = (
    <>
      {Array(4)
        .fill(null)
        .map((_, index) => (
          <Placeholder key={index} className="h-16" />
        ))}
    </>
  )
  return (
    <div className="flex flex-col gap-2 -ml-4 -mr-4">
      <Suspense fallback={fallback}>{children}</Suspense>
    </div>
  )
}

function GridLinks({ children }: { children: React.ReactNode }) {
  const fallback = (
    <>
      {Array(4)
        .fill(null)
        .map((_, index) => (
          <Placeholder key={index} className="h-20" />
        ))}
    </>
  )
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 -ml-4 -mr-4 gap-2">
      <Suspense fallback={fallback}>{children}</Suspense>
    </div>
  )
}

async function PostsLoader({
  fetcher,
  children,
}: {
  fetcher: () => Promise<Post[]>
  children: (data: Post[]) => React.ReactNode
}) {
  const data = await fetcher()
  return <>{children(data)}</>
}

async function BlogSection() {
  return (
    <SectionContainer title="Writing">
      <StackedLinks>
        <PostsLoader fetcher={getBlogPosts}>
          {(data) => {
            return data
              .sort(sortByDate)
              .map((post: Post) => <WritingLink post={post} key={post.slug} />)
          }}
        </PostsLoader>
      </StackedLinks>
    </SectionContainer>
  )
}

async function PodcastSection() {
  return (
    <SectionContainer title="Podcasts">
      <StackedLinks>
        <PostsLoader fetcher={getPodcastPosts}>
          {(data) => {
            return data
              .sort(sortByDate)
              .map((post: Post) => <WritingLink post={post} key={post.slug} />)
          }}
        </PostsLoader>
      </StackedLinks>
    </SectionContainer>
  )
}

async function TalkSection() {
  return (
    <SectionContainer title="Talks">
      <GridLinks>
        <PostsLoader fetcher={getTalkPosts}>
          {(data) => {
            return data
              .sort(sortByDate)
              .map((post: Post) => <TalkLink post={post} key={post.slug} />)
          }}
        </PostsLoader>
      </GridLinks>
    </SectionContainer>
  )
}

async function Page() {
  return (
    <section className="max-w-2xl mx-auto flex flex-col gap-12">
      <header className="flex flex-col gap-4 pb-8 leading-relaxed border-b border-border text-base md:text-lg">
        <h1 className="font-headline text-5xl md:text-6xl mb-2">
          <span className="block uppercase tracking-wider text-lg md:text-2xl">
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
      <BlogSection />
      <TalkSection />
      <PodcastSection />
    </section>
  )
}

export default Page
