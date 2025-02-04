import React from "react"

import { cn } from "../../lib/utils"

interface HeadingProps {
  children?: any
  className?: string
  text?: string
}

export function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
}

export function createHeading(level) {
  const baseTextStyle = "font-headline font-light mt-8 mb-4"
  const sizes = [
    "text-3xl md:text-4xl",
    "text-2xl md:text-3xl",
    "text-xl md:text-2xl",
    "text-lg md:text-xl",
    "text-base md:text-lg",
    "text-small md:text-base",
  ]
  return ({ children, className, text }: HeadingProps) => {
    const child =
      typeof children === "string" ? children : children?.props?.children
    let slug = slugify(text || child || "")
    return React.createElement(
      `h${level}`,
      {
        id: slug,
        className: cn(baseTextStyle, sizes[level - 1], className, "group"),
      },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: cn(
            "anchor",
            "no-underline -ml-[calc(2ch_+_8px)] pr-2 opacity-[0.01] transition group-hover:opacity-40"
          ),
          children: "#",
        }),
      ],
      children
    )
  }
}
