"use client"

import { useEffect, useRef, useState } from "react"
import { DragEndEvent, useDndMonitor, useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import {
  motion,
  useMotionValue,
  useTransform,
  useVelocity,
} from "framer-motion"

import Avatar from "./avatar"

function getRandomNumberInRange(min: number, max: number): number {
  if (min >= max) {
    throw new Error("Min value should be less than max value")
  }
  return Math.random() * (max - min) + min
}

function Sticker({
  children,
  containerRef,
  index = 1,
}: {
  children: React.ReactNode
  containerRef?: React.MutableRefObject<HTMLElement | null>
  index: number
}) {
  const appRef = containerRef || useRef<HTMLElement | null>(null)
  const itemRef = useRef<HTMLDivElement | null>(null)

  const x = useMotionValue(0)
  const xVelocity = useVelocity(x)

  /**
   * Transform the velocity of x into a scale motion value
   */
  const rotate = useTransform(
    xVelocity,
    [-4000, 0, 4000],
    [-25, getRandomNumberInRange(-15, 15), 25],
    {
      clamp: true,
    }
  )

  return (
    <motion.div
      className="drop-shadow-lg shadow-black h-fit"
      drag
      dragConstraints={appRef}
      whileTap={{ scale: 1.1 }}
      dragTransition={{
        power: 0.1,
        bounceStiffness: 200,
      }}
      dragElastic={0.8}
      ref={itemRef}
      style={{
        scale: 0.8,
        rotate,
        x,
        y: getRandomNumberInRange(25, 60) * (index % 2 == 0 ? -1 : 1),
      }}
    >
      {children}
    </motion.div>
  )
}

function StickerHeader() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  return (
    <div className="w-full w-min-[280px] h-[240px] bg-gray-50 rounded-3xl p-6">
      <div
        ref={containerRef}
        className="flex gap-4 h-full items-center relative"
      >
        <svg className="absolute top-0 left-0 w-full h-full">
          <pattern
            id="pattern-circles"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
          >
            <circle
              id="pattern-circle"
              cx="10"
              cy="10"
              r="1.6257413380501518"
              fill="#000"
              className="fill-gray-300"
            ></circle>
          </pattern>

          <rect
            id="rect"
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#pattern-circles)"
          ></rect>
        </svg>
        <Sticker containerRef={containerRef} index={1}>
          <Avatar
            src="/stickers/headshot.jpg"
            alt="Image of Kathryn Gonzalez"
          />
        </Sticker>
        <Sticker containerRef={containerRef} index={2}>
          <img src="/stickers/south-carolina.svg" draggable={false} />
        </Sticker>
        <Sticker containerRef={containerRef} index={3}>
          <img src="/stickers/doordash.svg" draggable={false} />
        </Sticker>
        <Sticker containerRef={containerRef} index={4}>
          <img src="/stickers/flag.svg" draggable={false} />
        </Sticker>
        <Sticker containerRef={containerRef} index={5}>
          <img src="/stickers/michigan.svg" draggable={false} />
        </Sticker>
      </div>
    </div>
  )
}

export default StickerHeader
