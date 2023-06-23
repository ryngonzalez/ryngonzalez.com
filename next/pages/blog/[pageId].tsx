import * as React from "react"
import { GetStaticPaths, GetStaticPropsContext } from "next"
import { ExtendedRecordMap } from "notion-types"
import { getAllPagesInSpace } from "notion-utils"
import { defaultMapPageUrl } from "react-notion-x"

import { NotionPage } from "../../components/notion/NotionPage"
import {
  isDev,
  previewImagesEnabled,
  rootDomain,
  rootNotionPageId,
  rootNotionSpaceId,
} from "../../config/notion"
import * as notion from "../../lib/notion"

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const pageId = context?.params?.pageId as string
  const recordMap = await notion.getPage(pageId)

  return {
    props: {
      recordMap,
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
  const pages = await getAllPagesInSpace(
    rootNotionPageId,
    rootNotionSpaceId,
    notion.getPage,
    {
      traverseCollections: false,
    }
  )

  const paths = Object.keys(pages)
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
