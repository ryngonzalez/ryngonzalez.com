import * as React from "react"
import { GetStaticPaths, GetStaticPropsContext } from "next"
import { ExtendedRecordMap } from "notion-types"

import {
  isDev,
  previewImagesEnabled,
  rootDomain,
  rootNotionPageId,
} from "@/config/notion"
import * as notion from "@/lib/notion"
import { resolveNotionPage } from "@/lib/resolve-notion-page"
import { NotionPage } from "@/components/notion/NotionPage"

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const rawPageId = context?.params?.pageId as string
  const props = await resolveNotionPage("ryngonzalez.com", rawPageId)

  return {
    props,
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
  const siteMap = await notion.getSiteMap()

  const paths = Object.keys(siteMap.canonicalPageMap)
    .map((pageId) => ({ params: { pageId: pageId } }))
    .filter((path) => path)

  return {
    paths,
    fallback: true,
  }
}

export default function Page({ recordMap }: { recordMap: ExtendedRecordMap }) {
  return (
    <NotionPage
      recordMap={recordMap}
      rootDomain={rootDomain}
      rootPageId={rootNotionPageId}
      previewImagesEnabled={previewImagesEnabled}
    />
  )
}
