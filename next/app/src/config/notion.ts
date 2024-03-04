// TODO: change these to your own values
// NOTE: rootNotionSpaceId is optional; set it to undefined if you don't want to
// use it.
export const rootNotionPageId = '0260a95744a64f4ca67456420761be24'
export const rootNotionSpaceId = '6ebfe15a-4d6a-4467-8b3c-e88c766d594f'

// Whether to use the official public Notion API or the unofficial private API.
// Note that the official API doesn't expose formatting options for many blocks
// and is currently not as well-supported.
// If you want to use the official API, you must provide a NOTION_TOKEN env var.
export const useOfficialNotionAPI =
  false ||
  (process.env.USE_OFFICIAL_NOTION_API === 'true' && process.env.NOTION_TOKEN)

export const isDev =
  process.env.NODE_ENV === 'development' || !process.env.NODE_ENV

export const port = process.env.PORT || 3000
export const rootDomain = isDev ? `localhost:${port}/blog` : `/blog`



// NOTE: having this enabled can be pretty expensive as it re-generates preview
// images each time a page is built. In a production setting, we recommend that
// you cache the preview image results in a key-value database.
export const previewImagesEnabled = isDev ? false : true


export const rootBitsDomain = isDev ? `localhost:${port}/bits` : `/bits`
export const rootBitsNotionPageId = '64c2f8ba672e484788cca1fb6c50db9d'
