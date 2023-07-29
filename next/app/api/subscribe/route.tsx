import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    console.log(email)

    const response = await fetch(
      `https://api.buttondown.email/v1/subscribers`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${process.env.BUTTON_DOWN_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    )

    if (response.ok) {
      const responseBody = await response.json()
      return NextResponse.json({ responseBody }, { status: 200 })
    }

    const { email: errors } = await response.json()
    return NextResponse.json({ errors }, { status: 400 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 400 })
  }
}
