import fs from "fs"
import path from "path"
import { P } from "@upstash/redis/zmscore-10fd3773"
import { compileMDX } from "next-mdx-remote/rsc"

import { Post } from "../types/blog/Post"
import { PostMetadata } from "../types/blog/PostMetadata"

function removeFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  return fileContent.replace(frontmatterRegex, "").trim()
}

function getMDXFiles(dir) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx")
}

async function readMDXFile(filePath) {
  const rawContent = fs.readFileSync(filePath, "utf-8")
  const { frontmatter } = await compileMDX<PostMetadata>({
    source: rawContent,
    options: { parseFrontmatter: true },
  })
  return { rawContent, metadata: frontmatter }
}

function getRelatedPosts(allPosts, currentPost): Post[] {
  let relatedPosts = allPosts.filter((post) => {
    return post.metadata.tags
      ?.split(",")
      .some((tag) => currentPost.metadata.tags.split(",").includes(tag))
  })
  relatedPosts = relatedPosts.filter((post) => post.slug !== currentPost.slug)
  return relatedPosts
}

async function getMDXData(dir): Promise<Post[]> {
  let mdxFiles = getMDXFiles(dir)
  const parsedFiles = await Promise.all(
    mdxFiles.map(async (file) => {
      let { metadata, rawContent } = await readMDXFile(path.join(dir, file))
      let slug = path.basename(file, path.extname(file))
      return {
        metadata,
        slug,
        content: removeFrontmatter(rawContent),
      }
    })
  )
  return parsedFiles.map((post) => {
    let relatedPosts = getRelatedPosts(parsedFiles, post)
    return { ...post, relatedPosts } as Post
  })
}

export async function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), "content", "posts"))
}
export async function getTalkPosts() {
  return getMDXData(path.join(process.cwd(), "content", "talks"))
}
export async function getPodcastPosts() {
  return getMDXData(path.join(process.cwd(), "content", "podcasts"))
}

export async function getBitsPosts() {
  return getMDXData(path.join(process.cwd(), "content", "bits"))
}

export async function getAllPosts() {
  return Promise.all([getBlogPosts(), getTalkPosts(), getPodcastPosts()]).then(
    (posts) => posts.flat()
  )
}
