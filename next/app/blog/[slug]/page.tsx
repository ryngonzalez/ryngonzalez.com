import { Suspense, cache } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllPosts } from "app/src/db/blog"

import { CustomMDX } from "@/app/src/components/mdx/mdx"
import { BlogFooter } from "@/app/src/components/ui/BlogFooter"

function generateOgImage(title: string, date?: string, image?: string) {
  const parts = [
    `title=${encodeURIComponent(title)}`,
    date && `date=${encodeURIComponent(date)}`,
    image && `image=${encodeURIComponent(image)}`,
  ]
  return `/api/og?${parts.filter(Boolean).join("&")}`
}

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  let post = (await getAllPosts()).find((post) => post.slug === params.slug)
  if (!post) {
    return
  }

  const {
    title,
    subtitle: description,
    publishedDate: publishedTime,
    image,
  } = post.metadata
  let ogImage = generateOgImage(title, publishedTime, image)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://ryngonzalez.com/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  }
}

function formatDate(date: string) {
  let currentDate = new Date()
  let targetDate = new Date(date)

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  let daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ""

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = "Today"
  }

  let fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return `${fullDate} (${formattedDate})`
}

export default async function Blog({ params }) {
  let post = (await getAllPosts()).find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <section className="max-w-2xl m-auto">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedDate,
            dateModified: post.metadata.publishedDate,
            description: post.metadata.subtitle,
            image: post.metadata.image
              ? `https://ryngonzalez.com${post.metadata.image}`
              : `https://ryngonzalez.com/og?title=${post.metadata.title}`,
            url: `https://ryngonzalez.com/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Kathryn Gonzalez",
            },
          }),
        }}
      />
      <header className="flex flex-col gap-2 mb-8">
        <h1 className="title font-medium text-6xl font-headline max-w-[650px] text-balance">
          {post.metadata.title}
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 italic">
          {post.metadata.subtitle}{" "}
        </p>
        <div className="flex justify-between items-center font-mono">
          <Suspense fallback={<p className="h-5" />}>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 uppercase tracking-widest">
              {formatDate(post.metadata.publishedDate)}
            </p>
          </Suspense>
        </div>
      </header>
      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        <CustomMDX source={post.content} />
      </article>
      <BlogFooter relatedPosts={post.relatedPosts} />
    </section>
  )
}
