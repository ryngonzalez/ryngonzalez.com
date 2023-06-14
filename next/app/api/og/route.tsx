import { ImageResponse } from "next/server"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

// App router includes @vercel/og.
// No need to install it.

export const runtime = "edge"

const image = fetch(new URL("@/public/Headshot.jpg", import.meta.url)).then(
  (res) => res.arrayBuffer()
)

// Make sure the font exists in the specified path:
const fontBold = fetch(
  new URL("@/public/Inter-Bold.otf", import.meta.url)
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
            backgroundImage:
              "linear-gradient(45deg, #1c2634, #2e3b51, #213154, #0d1431)",
            backgroundSize: "1200px 630px",
            gap: 16,
          }}
          tw={cn(
            "font-bold bg-no-repeat px-12 py-8 flex items-center justify-center flex-col flex-nowrap text-center bg-cover h-full w-full",
            hasImage && "items-start"
          )}
        >
          <div
            tw="flex items-center gap-12"
            style={{
              gap: hasTitle ? 32 : 64,
            }}
          >
            <div
              tw="block rounded-full shadow-lg shadow-black/40"
              style={{ display: "flex" }}
            >
              <img
                alt="Kathryn Gonzalez"
                height={hasTitle ? 72 : 200}
                width={hasTitle ? 72 : 200}
                src={imgData as unknown as string}
                tw="relative rounded-full"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                color: "white",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  fontSize: hasTitle ? 32 : 56,
                  color: "white",
                  fontFamily: '"Inter Bold"',
                }}
              >
                {siteConfig.navName}
              </div>
              {hasTitle ? (
                <div style={{ fontSize: 24, opacity: 0.5 }}>
                  ryngonzalez.com
                </div>
              ) : (
                <div
                  style={{
                    fontSize: 32,
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
                color: "white",
                marginTop: 32,
                textAlign: "center",
                lineHeight: 1.4,
                whiteSpace: "pre-wrap",
                alignItems: "center",
                gap: hasImage ? 32 : 64,
              }}
            >
              <div
                style={{
                  width: 1048,
                  borderTop: "2px solid white",
                  opacity: 0.2,
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 32,
                }}
              >
                {hasImage && imageUrl && (
                  <img
                    src={imageUrl}
                    height={300}
                    width={480}
                    style={{ objectFit: "cover", objectPosition: "top" }}
                    tw="shadow-lg shadow-black/40 rounded-xl mt-4 border-2 border-white/20"
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
                  <div style={{ fontSize: 56 }}>{title}</div>
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
