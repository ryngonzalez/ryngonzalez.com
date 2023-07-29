import * as React from "react"
import { ExtendedRecordMap } from "notion-types"
import { ErrorBoundary } from "react-error-boundary"

import {
  previewImagesEnabled,
  rootBitsDomain,
  rootBitsNotionPageId,
} from "@/config/notion"
import * as notion from "@/lib/notion"
import { NewsletterForm } from "@/components/ui/newsletter-form"
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
          <div className="flex flex-col items-center w-full relative border-t border-border pt-12">
            <p className="text-base sm:text-lg font-bold text-center w-full block pb-4">
              Thanks for reading, that's all for now!&nbsp;👋
            </p>
            <p className="sm:w-96 text-base text-center text-secondary-foreground italic block pb-6">
              If you want to subscribe for more bits, please enter your email
              below to subscribe to my newsletter.
            </p>
            <NewsletterForm />
          </div>
        }
      />
    </ErrorBoundary>
  )
}
