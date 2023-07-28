import * as React from "react"
import { ExtendedRecordMap } from "notion-types"
import { ErrorBoundary } from "react-error-boundary"

import {
  previewImagesEnabled,
  rootBitsDomain,
  rootBitsNotionPageId,
} from "@/config/notion"
import * as notion from "@/lib/notion"
import { NotionPage } from "@/components/notion/NotionPage"

export const getStaticProps = async () => {
  const pageId = rootBitsNotionPageId
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
        rootDomain={rootBitsDomain}
        rootPageId={rootBitsNotionPageId}
        previewImagesEnabled={previewImagesEnabled}
        className="bits-page"
        showTableOfContents
        pageFooter={
          <div className="flex items-center w-full relative">
            <p className="text-lg text-center text-gray-500 italic w-full block ">
              Thanks for reading, no more bits left to see! 👋
            </p>
          </div>
        }
      />
    </ErrorBoundary>
  )
}
