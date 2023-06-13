import { ImageResponse } from "next/server"

import { siteConfig } from "@/config/site"

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
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : undefined

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: "black",
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flexWrap: "nowrap",
            fontSize: 100,
            fontWeight: 200,
            fontFamily: '"Inter Bold"',
            backgroundImage:
              "linear-gradient(45deg, #1c2634, #1e293b, #213154, #020617)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "1200px 630px",
            padding: 48,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 64,
            }}
          >
            <div
              tw="relative w-[200px] h-[200px] after:bg-slate-600 after:-z-0 after:top-0 after:left-0 after:relative after:h-[128px] overflow-hidden after:block after:content-[''] block rounded-full shadow-inner shadow-gray-50/30"
              style={{ display: "flex" }}
            >
              <img
                alt="Kathryn Gonzalez"
                height={200}
                width={200}
                src={imgData as unknown as string}
                tw="relative rounded-full -z-10"
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
                  fontSize: 56,
                  color: "white",
                  fontFamily: '"Inter Bold"',
                }}
              >
                {siteConfig.navName}
              </div>
              <div style={{ fontSize: 28, opacity: 0.5 }}>
                {siteConfig.subtitle}
              </div>
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
                // padding: "0 120px",
                textAlign: "center",
                lineHeight: 1.4,
                whiteSpace: "pre-wrap",
                alignItems: "center",
                gap: 64,
              }}
            >
              <div
                style={{
                  width: 320,
                  borderTop: "2px solid white",
                  opacity: 0.2,
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div style={{ fontSize: 32, letterSpacing: 4, opacity: 0.5 }}>
                  POST
                </div>
                <div style={{ fontSize: 56 }}>{title}</div>
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
