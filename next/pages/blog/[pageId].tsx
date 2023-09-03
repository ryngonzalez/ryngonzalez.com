import * as React from "react"
import { GetStaticPaths, GetStaticPropsContext } from "next"
import Image from "next/image"
import Link from "next/link"
import { ExtendedRecordMap } from "notion-types"
import {
  estimatePageReadTimeAsHumanizedString,
  formatDate,
  getCanonicalPageId,
  getPageProperty,
  getPageTitle,
} from "notion-utils"

import {
  isDev,
  previewImagesEnabled,
  rootDomain,
  rootNotionPageId,
  rootNotionSpaceId,
} from "@/config/notion"
import * as notion from "@/lib/notion"
import {
  ResolveNotionPageResult,
  resolveNotionPage,
} from "@/lib/resolve-notion-page"
import { Block } from "@/lib/types"
import Avatar from "@/components/ui/avatar"
import { NewsletterForm } from "@/components/ui/newsletter-form"
import { NotionPage } from "@/components/notion/NotionPage"

interface Post {
  pageId: string
  recordMap: ExtendedRecordMap
}

interface RelatedPosts {
  [key: string]: Post
}

function RelatedPost({ post }: { post: Post }) {
  const { pageId, recordMap } = post
  const date = getPageProperty(
    "Published Date",
    recordMap?.block[pageId]?.value as Block,
    recordMap as ExtendedRecordMap
  )
  return (
    <li>
      <Link
        href={`/blog/${getCanonicalPageId(pageId, recordMap, {
          uuid: false,
        })}`}
        className="group w-full hover:bg-secondary block p-2 rounded-lg transition-colors duration-200"
      >
        <span className="font-bold block group-hover:underline">
          {getPageTitle(recordMap as ExtendedRecordMap)}
        </span>
        <span className="text-sm w-full">{formatDate(date as string)}</span>
      </Link>
    </li>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const rawPageId = context?.params?.pageId as string
  const props = (await resolveNotionPage(
    "ryngonzalez.com",
    rawPageId
  )) as ResolveNotionPageResult

  const pageTags = getPageProperty(
    "Tags",
    props.recordMap.block[props.pageId]?.value,
    props.recordMap
  )

  async function getRelatedPosts(): Promise<RelatedPosts | Array<Post>> {
    try {
      const results = await notion.getSiteMap(
        rootNotionPageId,
        rootNotionSpaceId
      )
      const published = Object.entries(results?.pageMap)?.filter(
        ([pageId, recordMap]) => {
          return getPageProperty(
            "Published",
            recordMap?.block[pageId]?.value as Block,
            recordMap as ExtendedRecordMap
          )
        }
      )
      const publishedAndRelated = published
        .filter(([pageId, recordMap]) => {
          const tags = getPageProperty(
            "Tags",
            recordMap?.block[pageId]?.value as Block,
            recordMap as ExtendedRecordMap
          ) as string[]
          return tags?.some((tag) => (pageTags as string[])?.includes(tag))
        })
        .filter(([pageId]) => pageId !== props.pageId)
      return publishedAndRelated
        .slice(0, 4)
        .reduce((acc, [pageId, recordMap]) => {
          return {
            ...acc,
            [pageId]: {
              pageId,
              recordMap,
            },
          }
        }, {})
    } catch (e: any) {
      console.log(e.message)
      return []
    }
  }

  const relatedPosts = await getRelatedPosts()

  return {
    props: {
      ...props,
      estimatedReadTime: estimatePageReadTimeAsHumanizedString(
        props.recordMap?.block[props.pageId].value as Block,
        props.recordMap as ExtendedRecordMap,
        {}
      ),
      tags: pageTags,
      relatedPosts,
    },
    // we will attempt to re-generate the page:
    // - when a request comes in
    // - at most once every 10 seconds
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  if (isDev) {
    return {
      paths: [],
      fallback: true,
    }
  }

  // This crawls all public pages starting from the given root page in order
  // for next.js to pre-generate all pages via static site generation (SSG).
  // This is a useful optimization but not necessary; you could just as easily
  // set paths to an empty array to not pre-generate any pages at build time.
  const siteMap = await notion.getSiteMap(rootNotionPageId, rootNotionSpaceId)

  const paths = Object.entries(siteMap.canonicalPageMap)
    .filter(([canonicalPageId, pageId]) => {
      return getPageProperty(
        "Published",
        siteMap.pageMap[pageId]?.block[pageId].value as Block,
        siteMap.pageMap[pageId] as ExtendedRecordMap
      )
    })
    .map(([canonicalPageId]) => ({ params: { pageId: canonicalPageId } }))
    .filter((path) => path)

  return {
    paths,
    fallback: true,
  }
}

export default function Page({
  recordMap,
  pageId,
  relatedPosts: relatedPosts,
}: {
  recordMap: ExtendedRecordMap
  pageId: string
  relatedPosts: RelatedPosts
}) {
  let relatedPostsFooter: React.JSX.Element[] | null = null
  let hasRelatedPosts = false
  if (relatedPosts as RelatedPosts) {
    const posts = Object.values(relatedPosts)
    relatedPostsFooter = posts.map((post) => (
      <RelatedPost post={post} key={post.pageId} />
    ))
    hasRelatedPosts = posts.length > 0
  }

  return (
    <NotionPage
      recordMap={recordMap}
      rootDomain={rootDomain}
      rootPageId={rootNotionPageId}
      previewImagesEnabled={previewImagesEnabled}
      pageFooter={
        <div className="w-full pt-8">
          <div className="border-t border-border pt-8">
            <div className="flex gap-6 items-start">
              <Avatar
                src="/stickers/headshot.jpg"
                alt="Image of Kathryn Gonzalez"
                className="hidden sm:block"
              />
              <div className="flex flex-col gap-4">
                <h2 className="font-bold text-xl sm:text-2xl">
                  Subscribe to my newsletter
                </h2>
                <span className="block text-base text-secondary-foreground max-w-lg">
                  You'll get new posts from my blog straight to your inbox! Stay
                  up to date on the things I'm working on, thinking about, or
                  want to share—including my long-form posts and the smaller
                  bits.
                </span>
                <NewsletterForm />
              </div>
            </div>
          </div>
          {hasRelatedPosts && (
            <div className="w-full pt-8">
              <h2 className="text-xl sm:text-2xl border-t border-border w-full pt-8 font-bold pb-6">
                Related Posts
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 -ml-2 -mr-2">
                {relatedPostsFooter}
              </ul>
            </div>
          )}
        </div>
      }
    />
  )
}
