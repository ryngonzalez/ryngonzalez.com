import Image from "next/image"
import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"
import { highlight } from "sugar-high"

import { cn } from "../../lib/utils"
import { LiveCode } from "../sandpack"
import { TweetComponent } from "../tweet"
import { createHeading } from "./createHeading"
import styles from "./styles.module.css"

function Table({ data }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function CustomLink({ href, className, ...props }) {
  const styles = cn("underline", className)
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={styles} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith("#")) {
    return <a href={href} className={styles} {...props} />
  }

  return (
    <a
      href={href}
      className={styles}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  )
}

function RoundedImage(props) {
  return (
    <Image
      alt={props.alt}
      className="rounded-lg overflow-hidden border border-red w-full"
      width="480"
      height="480"
      {...props}
    />
  )
}

function Callout(props) {
  return (
    <div className="px-4 py-3 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm flex items-center text-neutral-900 dark:text-neutral-100 mb-8">
      <div className="flex items-center w-4 mr-4">{props.emoji}</div>
      <div className="w-full callout">{props.children}</div>
    </div>
  )
}

function ProsCard({ title, pros }) {
  return (
    <div className="border border-emerald-200 dark:border-emerald-900 bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 my-4 w-full">
      <span>{`You might use ${title} if...`}</span>
      <div className="mt-4">
        {pros.map((pro) => (
          <div key={pro} className="flex font-medium items-baseline mb-2">
            <div className="h-4 w-4 mr-2">
              <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 24 24">
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </g>
              </svg>
            </div>
            <span>{pro}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ConsCard({ title, cons }) {
  return (
    <div className="border border-red-200 dark:border-red-900 bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 my-6 w-full">
      <span>{`You might not use ${title} if...`}</span>
      <div className="mt-4">
        {cons.map((con) => (
          <div key={con} className="flex font-medium items-baseline mb-2">
            <div className="h-4 w-4 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-red-500"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </div>
            <span>{con}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Paragraph({ children, ...props }) {
  return (
    <p className="text-base mb-8 leading-relaxed" {...props}>
      {children}
    </p>
  )
}

function HorizontalRule() {
  return <hr className="my-8" />
}

function Code({ children, ...props }) {
  let codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

function Video({ className, ...props }) {
  return (
    <video className={cn("mb-4 mx-auto", className)} playsInline {...props} />
  )
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  img: RoundedImage,
  // The following doesn't work with the current version of next-mdx-remote:
  // https://github.com/hashicorp/next-mdx-remote/issues/297
  // iframe: (props) => <iframe className="w-full mb-8" {...props} />,
  a: CustomLink,
  p: Paragraph,
  hr: HorizontalRule,
  ul: (props) => <ol className="list-disc list-outside mb-8" {...props} />,
  ol: (props) => <ol className="list-decimal list-outside mb-8" {...props} />,
  li: (props) => <li className="mb-2" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-neutral-200 dark:border-neutral-700 pl-4 italic my-4"
      {...props}
    />
  ),
  Video,
  Callout,
  ProsCard,
  ConsCard,
  StaticTweet: TweetComponent,
  code: Code,
  Table,
  LiveCode,
}

export async function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      className={styles.mdxContainer}
      options={{
        scope: {
          cn,
          styles,
        },
      }}
    />
  )
}
