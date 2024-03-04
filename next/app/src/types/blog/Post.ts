import { PostMetadata } from "./PostMetadata"

export type Post = {
  metadata: PostMetadata
  slug: string
  content: string
  relatedPosts: Post[]
}