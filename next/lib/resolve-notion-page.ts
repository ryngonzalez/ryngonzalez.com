import { ExtendedRecordMap } from 'notion-types'
import { parsePageId } from 'notion-utils'

// import { environment, pageUrlAdditions, pageUrlOverrides, site } from './config'
import { getSiteMap } from './notion'
import { getPage } from './notion'
import kv from "@vercel/kv"
import { rootNotionPageId } from '@/config/notion'

export const environment = process.env.NODE_ENV || 'development'
const defaultDomain = "ryngonzalez.com"

export async function resolveNotionPage(domain: string = defaultDomain, rawPageId?: string) {
  let pageId: string | null
  let recordMap: ExtendedRecordMap

  if (rawPageId && rawPageId !== 'index') {
    pageId = parsePageId(rawPageId)

    const useUriToPageIdCache = true
    const cacheKey = `uri-to-page-id:${domain}:${environment}:${rawPageId}`
    // TODO: should we use a TTL for these mappings or make them permanent?
    // const cacheTTL = 8.64e7 // one day in milliseconds
    const cacheTTL = undefined // disable cache TTL

    if (!pageId && useUriToPageIdCache) {
      try {
        // check if the database has a cached mapping of this URI to page ID
        pageId = await kv.get(cacheKey)
      } catch (err: any) {
        // ignore redis errors
        console.warn(`redis error get "${cacheKey}"`, err.message)
      }
    }

    if (pageId) {
      recordMap = await getPage(pageId)
    } else {
      // handle mapping of user-friendly canonical page paths to Notion page IDs
      // e.g., /developer-x-entrepreneur versus /71201624b204481f862630ea25ce62fe
      const siteMap = await getSiteMap()
      pageId = siteMap?.canonicalPageMap[rawPageId]

      if (pageId) {
        // TODO: we're not re-using the page recordMap from siteMaps because it is
        // cached aggressively
        // recordMap = siteMap.pageMap[pageId]

        recordMap = await getPage(pageId)

        if (useUriToPageIdCache) {
          try {
            // update the database mapping of URI to pageId
            await kv.set(cacheKey, pageId, cacheTTL)
          } catch (err: any) {
            // ignore redis errors
            console.warn(`redis error set "${cacheKey}"`, err.message)
          }
        }
      } else {
        // note: we're purposefully not caching URI to pageId mappings for 404s
        return {
          error: {
            message: `Not found "${rawPageId}"`,
            statusCode: 404
          }
        }
      }
    }
  } else {
    pageId = rootNotionPageId

    recordMap = await getPage(pageId)
  }

  const props = { recordMap, pageId }
  return { ...props }
}