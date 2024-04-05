import React from "react"

export function extractText(children: React.ReactNode) {
  return React.Children.map(children, (child) =>
    typeof child === "string"
      ? child
      : React.isValidElement(child)
        ? child.props.children
        : null
  )
}
