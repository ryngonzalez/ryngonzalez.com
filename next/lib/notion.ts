import { Client } from '@notionhq/client'
import { NotionAPI } from 'notion-client'
import { NotionCompatAPI } from 'notion-compat'
import { ExtendedRecordMap, SearchParams, SearchResults } from 'notion-types'

import { previewImagesEnabled, useOfficialNotionAPI, rootDomain, rootNotionPageId, rootNotionSpaceId } from '../config/notion'
import { getPreviewImageMap } from './preview-images'
import { getCanonicalPageId } from 'notion-utils'


import { getAllPagesInSpace, uuidToId } from 'notion-utils'
import pMemoize from 'p-memoize'

// import * as config from './config'
import * as types from './types'
// import { includeNotionIdInUrls } from './config'
// import { getCanonicalPageId } from './get-canonical-page-id'
// import { notion } from './notion-api'

const notion = useOfficialNotionAPI
  ? new NotionCompatAPI(new Client({ auth: process.env.NOTION_TOKEN }))
  : new NotionAPI()

if (useOfficialNotionAPI) {
  console.warn(
    'Using the official Notion API. Note that many blocks only include partial support for formatting and layout. Use at your own risk.'
  )
}

export async function getPage(pageId: string): Promise<ExtendedRecordMap> {
  const recordMap = await notion.getPage(pageId)

  if (previewImagesEnabled) {
    const previewImageMap = await getPreviewImageMap(recordMap)
      ; (recordMap as any).preview_images = previewImageMap
  }

  return recordMap
}

export async function search(params: SearchParams): Promise<SearchResults> {
  return notion.search(params)
}


const uuid = false

export async function getSiteMap(): Promise<types.SiteMap> {
  const partialSiteMap = await getAllPages(
    rootNotionPageId,
    rootNotionSpaceId
  )

  return {
    // site: config.site,
    ...partialSiteMap
  } as types.SiteMap
}

const getAllPages = pMemoize(getAllPagesImpl, {
  cacheKey: (...args) => JSON.stringify(args)
})

async function getAllPagesImpl(
  rootNotionPageId: string,
  rootNotionSpaceId: string | undefined
): Promise<Partial<types.SiteMap>> {
  const getPage = async (pageId: string, ...args: any[]) => {
    console.log('\nnotion getPage', uuidToId(pageId))
    return notion.getPage(pageId, ...args)
  }

  const pageMap = await getAllPagesInSpace(
    rootNotionPageId,
    rootNotionSpaceId,
    getPage
  )

  const canonicalPageMap = Object.keys(pageMap).reduce(
    (map, pageId: string) => {
      const recordMap = pageMap[pageId]
      if (!recordMap) {
        throw new Error(`Error loading page "${pageId}"`)
      }

      const canonicalPageId = getCanonicalPageId(pageId, recordMap, {
        uuid
      })

      if (canonicalPageId == null) return { ...map }

      if (map[canonicalPageId as keyof typeof map]) {
        // you can have multiple pages in different collections that have the same id
        // TODO: we may want to error if neither entry is a collection page
        console.warn('error duplicate canonical page id', {
          canonicalPageId,
          pageId,
          existingPageId: map[canonicalPageId as keyof typeof map]
        })

        return map
      } else {
        return {
          ...map,
          [canonicalPageId]: pageId
        }
      }
    },
    {}
  )

  return {
    pageMap,
    canonicalPageMap
  }
}