import React from "react"

import { cn } from "../../lib/utils"
import { slugify } from "./mdx"

interface HeadingProps {
  children?: any
  className?: string
  text?: string
}

export function createHeading(level) {
  const baseTextStyle = "font-headline font-light mt-8 mb-4"
  const sizes = [
    "text-4xl",
    "text-3xl",
    "text-2xl",
    "text-xl",
    "text-lg",
    "text-base",
  ]
  return ({ children, className, text }: HeadingProps) => {
    let slug = slugify(text || children?.props?.children || "")
    return React.createElement(
      `h${level}`,
      { id: slug, className: cn(baseTextStyle, sizes[level - 1], className) },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: cn(
            "anchor",
            "no-underline -ml-[calc(2ch_+_8px)] pr-2 opacity-20 group-hover:opacity-100"
          ),
          children: "#",
        }),
      ],
      children
    )
  }
}
