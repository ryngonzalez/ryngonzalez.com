import { ImageResponse } from "next/server"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

// App router includes @vercel/og.
// No need to install it.

export const runtime = "edge"

const image = fetch(
  new URL("@/public/stickers/headshot.jpg", import.meta.url)
).then((res) => res.arrayBuffer())

// Make sure the font exists in the specified path:
const fontBold = fetch(
  new URL("@/public/Boogaloo-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer())

// const fontLight = fetch(
//   new URL("@/public/Inter-Light.otf", import.meta.url)
// ).then((res) => res.arrayBuffer())

export async function GET(request: Request) {
  try {
    const imgData = await image
    const fontBoldData = await fontBold
    // const fontLightData = await fontLight
    const { searchParams } = new URL(request.url)

    // ?title=<title>
    const hasTitle = searchParams.has("title")
    const title = hasTitle ? searchParams.get("title") : undefined

    const hasImage = searchParams.has("image")
    const imageUrl = hasImage ? searchParams.get("image") : undefined

    const hasDate = searchParams.has("date")
    const date = hasDate
      ? new Date(Number.parseInt(searchParams.get("date") || ""))
      : undefined

    return new ImageResponse(
      (
        <div
          style={{
            background: "white",
            gap: 16,
          }}
          tw={cn(
            "font-bold px-12 py-8 flex items-center justify-center flex-col flex-nowrap text-center h-full w-full",
            hasImage && "items-start"
          )}
        >
          <div
            tw="flex items-center"
            style={{
              gap: hasTitle ? 32 : 64,
            }}
          >
            <div
              tw="rounded-full border-[8px] shadow-lg shadow-black/40"
              style={{ display: "flex" }}
            >
              <img
                alt="Kathryn Gonzalez"
                height={hasTitle ? 128 : 200}
                width={hasTitle ? 128 : 200}
                src={imgData as unknown as string}
                tw="relative rounded-full"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                color: "black",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  fontSize: hasTitle ? 72 : 128,
                  color: "black",
                  fontFamily: '"Inter Bold"',
                }}
              >
                Kathryn Gonzalez
              </div>
              {hasTitle ? (
                <div style={{ fontSize: 36, opacity: 0.5 }}>
                  ryngonzalez.com
                </div>
              ) : (
                <div
                  style={{
                    fontSize: 48,
                    // maxWidth: 640,
                    textAlign: "left",
                    opacity: 0.5,
                  }}
                >
                  {siteConfig.subtitle}
                </div>
              )}
            </div>
          </div>
          {title && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 60,
                fontStyle: "normal",
                letterSpacing: "-0.025em",
                color: "black",
                marginTop: 32,
                textAlign: "center",
                lineHeight: 1.4,
                whiteSpace: "pre-wrap",
                alignItems: "flex-start",
                gap: hasImage ? 32 : 64,
              }}
            >
              <div
                style={{
                  width: 1100,
                  borderTop: "4px solid black",
                  opacity: 0.1,
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 48,
                }}
              >
                {hasImage && imageUrl && (
                  <img
                    src={imageUrl}
                    height={280}
                    width={480}
                    style={{ objectFit: "cover", objectPosition: "top" }}
                    tw="shadow-lg shadow-black/40 rounded-xl mt-4 border-2 border-white/10"
                  />
                )}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: hasImage ? "flex-start" : "center",
                    gap: 0,
                  }}
                >
                  <div style={{ fontSize: 32, letterSpacing: 4, opacity: 0.5 }}>
                    POST
                  </div>
                  <div
                    style={{
                      fontSize: 56,
                      textAlign: hasImage ? "left" : "center",
                      maxWidth: hasImage ? 640 : 1200,
                    }}
                  >
                    {title.length > 100 ? `${title.slice(0, 100)}…` : title}
                  </div>
                  {hasDate && (
                    <div style={{ fontSize: 32, opacity: 0.5 }}>
                      {date?.toDateString()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter Bold",
            data: fontBoldData,
            style: "normal",
          },
          // {
          //   name: "Inter Light",
          //   data: fontLightData,
          //   style: "normal",
          // },
        ],
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
