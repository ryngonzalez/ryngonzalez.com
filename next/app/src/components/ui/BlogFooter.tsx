import Link from "next/link"

import { Post } from "../../types/blog/Post"
import { PostMetadata } from "../../types/blog/PostMetadata"
import Avatar from "./Avatar"
import { NewsletterForm } from "./NewsletterForm"

type RelatedPosts = Post[]

function formatDate(date: string) {
  const parsedDate = new Date(date)
  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function RelatedPost({ post }: { post: Post }) {
  return (
    <li className="hover:bg-secondary rounded-lg transition-colors duration-200">
      <Link href={`/blog/${post.slug}`} className="w-full  block p-4">
        <span className="font-bold block">{post.metadata.title}</span>
        <span className="text-sm w-full">
          {formatDate(post.metadata.publishedDate)}
        </span>
      </Link>
    </li>
  )
}

export function BlogFooter({ relatedPosts }: { relatedPosts: RelatedPosts }) {
  const hasRelatedPosts = relatedPosts && relatedPosts.length > 0
  const relatedPostsFooter: React.JSX.Element[] | null = relatedPosts
    .sort((a, b) => {
      if (
        new Date(a.metadata.publishedDate) > new Date(b.metadata.publishedDate)
      ) {
        return -1
      }
      return 1
    })
    .slice(0, 4)
    .map((post) => <RelatedPost post={post} key={post.slug} />)
  return (
    <footer className="w-full pt-8">
      <div className="border-t border-border pt-8">
        <div className="flex gap-6 items-start">
          <div className="flex flex-col gap-4">
            <h2 className="font-headline text-xl sm:text-3xl">
              Subscribe to my newsletter
            </h2>
            <span className="block text-base text-secondary-foreground max-w-lg">
              You'll get new posts from my blog straight to your inbox! Stay up
              to date on the things I'm working on, thinking about, or want to
              share—including my long-form posts and the smaller bits.
            </span>
            <NewsletterForm />
          </div>
          <Avatar
            src="/stickers/headshot.jpg"
            alt="Image of Kathryn Gonzalez"
            className="hidden sm:block"
          />
        </div>
      </div>
      {hasRelatedPosts && (
        <div className="w-full pt-8">
          <h2 className="font-headline text-2xl sm:text-3xl border-t border-border w-full pt-8 pb-6">
            Related Posts
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 -ml-4 -mr-4 items-stretch">
            {relatedPostsFooter}
          </ul>
        </div>
      )}
    </footer>
  )
}
