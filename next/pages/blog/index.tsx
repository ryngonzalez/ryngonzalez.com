import * as React from "react"
import { ExtendedRecordMap } from "notion-types"
import {
  getBlockParentPage,
  getCanonicalPageId,
  getPageTitle,
  parsePageId,
} from "notion-utils"
import { ErrorBoundary } from "react-error-boundary"

import { Block, SiteMap } from "@/lib/types"

import { NotionPage } from "../../components/notion/NotionPage"
import {
  previewImagesEnabled,
  rootDomain,
  rootNotionPageId,
} from "../../config/notion"
import * as notion from "../../lib/notion"

export const getStaticProps = async () => {
  const pageId = rootNotionPageId
  const recordMap = await notion.getPage(pageId)

  return {
    props: {
      recordMap,
    },
    revalidate: 10,
  }
}

export default function Page({ recordMap }: { recordMap: ExtendedRecordMap }) {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <NotionPage
        recordMap={recordMap}
        rootDomain={rootDomain}
        rootPageId={rootNotionPageId}
        previewImagesEnabled={previewImagesEnabled}
      />
    </ErrorBoundary>
  )
}
