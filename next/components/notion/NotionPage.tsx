import * as React from "react"
import dynamic from "next/dynamic"
import Head from "next/head"
// import Image from 'next/image'
import Link from "next/link"
import { useRouter } from "next/router"
import { ExtendedRecordMap } from "notion-types"
import {
  getCanonicalPageId,
  getPageImageUrls,
  getPageProperty,
  getPageTitle,
} from "notion-utils"
import { ErrorBoundary } from "react-error-boundary"
import { NotionRenderer, defaultMapImageUrl } from "react-notion-x"
import TweetEmbed from "react-tweet-embed"

import { fontSans, fontSerif } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/ui/site-header"

import { Loading } from "./Loading"
import styles from "./styles.module.css"

// -----------------------------------------------------------------------------
// dynamic imports for optional components
// -----------------------------------------------------------------------------

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then(async (m) => {
    // additional prism syntaxes
    await Promise.all([
      import("prismjs/components/prism-markup-templating.js"),
      import("prismjs/components/prism-markup.js"),
      import("prismjs/components/prism-bash.js"),
      import("prismjs/components/prism-c.js"),
      import("prismjs/components/prism-cpp.js"),
      import("prismjs/components/prism-csharp.js"),
      import("prismjs/components/prism-docker.js"),
      import("prismjs/components/prism-java.js"),
      import("prismjs/components/prism-js-templates.js"),
      import("prismjs/components/prism-coffeescript.js"),
      import("prismjs/components/prism-diff.js"),
      import("prismjs/components/prism-git.js"),
      import("prismjs/components/prism-go.js"),
      import("prismjs/components/prism-graphql.js"),
      import("prismjs/components/prism-handlebars.js"),
      import("prismjs/components/prism-less.js"),
      import("prismjs/components/prism-makefile.js"),
      import("prismjs/components/prism-markdown.js"),
      import("prismjs/components/prism-objectivec.js"),
      import("prismjs/components/prism-ocaml.js"),
      import("prismjs/components/prism-python.js"),
      import("prismjs/components/prism-reason.js"),
      import("prismjs/components/prism-rust.js"),
      import("prismjs/components/prism-sass.js"),
      import("prismjs/components/prism-scss.js"),
      import("prismjs/components/prism-solidity.js"),
      import("prismjs/components/prism-sql.js"),
      import("prismjs/components/prism-stylus.js"),
      import("prismjs/components/prism-swift.js"),
      import("prismjs/components/prism-wasm.js"),
      import("prismjs/components/prism-yaml.js"),
    ])
    return m.Code
  })
)
const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
)
const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
  }
)
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  }
)

const Tweet = ({ id }: { id: string }) => {
  return <TweetEmbed tweetId={id} />
}

export const NotionPage = ({
  recordMap,
  previewImagesEnabled,
  rootPageId,
  rootDomain,
  pageHeader,
  pageFooter,
}: {
  recordMap: ExtendedRecordMap
  previewImagesEnabled?: boolean
  rootPageId?: string
  rootDomain?: string
  pageHeader?: React.ReactNode
  pageFooter?: React.ReactNode
}) => {
  const router = useRouter()

  if (router.isFallback) {
    return <Loading />
  }

  if (!recordMap) {
    return null
  }

  const keys = Object.keys(recordMap?.block || {})
  const block = recordMap?.block?.[keys[0]]?.value

  const title = getPageTitle(recordMap)
  const image = getPageImageUrls(recordMap, {
    mapImageUrl: defaultMapImageUrl,
  })[0]
  const publishedDate = getPageProperty("Published Date", block, recordMap)
  const socialDescription = `Kathryn Gonzalez - Blog`
  const socialImage = `/api/og?title=${encodeURIComponent(
    title
  )}&image=${encodeURIComponent(image)}&date=${publishedDate}`

  return (
    <>
      <Head>
        {socialDescription && (
          <>
            <meta name="description" content={socialDescription} />
            <meta property="og:description" content={socialDescription} />
            <meta name="twitter:description" content={socialDescription} />
          </>
        )}

        {socialImage ? (
          <>
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content={socialImage} />
            <meta property="og:image" content={socialImage} />
          </>
        ) : (
          <meta name="twitter:card" content="summary" />
        )}

        <title>
          {`${title} - Kathryn Gonzalez` + (title == "Blog" ? "" : " - Blog")}
        </title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:creator" content="@ryngonzalez" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <NotionRenderer
          className={cn(
            styles.dark,
            styles.renderer,
            fontSans.variable,
            fontSerif.variable
          )}
          recordMap={recordMap}
          fullPage={true}
          darkMode={false}
          disableHeader={true}
          header={<SiteHeader />}
          pageHeader={pageHeader}
          pageFooter={pageFooter}
          mapPageUrl={(pageId) =>
            `/blog/${getCanonicalPageId(pageId, recordMap, { uuid: false })}`
          }
          rootDomain={rootDomain}
          rootPageId={rootPageId}
          isLinkCollectionToUrlProperty={false}
          // previewImages={previewImagesEnabled}
          components={{
            // nextImage: Image,
            nextLink: Link,
            Code,
            Collection,
            Equation,
            Pdf,
            Modal,
            Tweet,
          }}

          // NOTE: custom images will only take effect if previewImages is true and
          // if the image has a valid preview image defined in recordMap.preview_images[src]
        />
      </ErrorBoundary>
    </>
  )
}
