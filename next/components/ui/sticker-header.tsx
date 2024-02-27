"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import {
  useClickAnyWhere,
  useDebounceCallback,
  useElementSize,
  useMediaQuery,
  useResizeObserver,
} from "usehooks-ts"

import { getRandomNumberInRange } from "@/lib/getRandomNumberInRange"
import { useElementBoundingRect } from "@/lib/hooks"
import { cn } from "@/lib/utils"
import Avatar from "@/components/ui/avatar"
import { Icons } from "@/components/icons"

import { useRotationVelocity } from "../../lib/useRotationVelocity"

function DotPattern() {
  return (
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
          cx="8"
          cy="8"
          r="1.6257413380501518"
          className="fill-primary/20"
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
  )
}

type Size = {
  width?: number
  height?: number
}

function Sticker({
  children,
  index = 1,
  caption,
  className,
  preventYOffsetOnMobile: preventYOffset,
}: {
  children: React.ReactNode
  index: number
  caption?: string
  className?: string
  preventYOffsetOnMobile?: boolean
}) {
  // Create refs for the sticker and caption, and set up measurement of elements
  const itemRef = useRef<HTMLDivElement | null>(null)
  const boundingRect = useElementBoundingRect(itemRef)

  // Manage state of stickers
  const [isDragging, setIsDragging] = useState<Boolean>(false)
  const [isCaptionVisible, setIsCaptionVisible] = useState<Boolean>(false)
  const [isModal, setIsModal] = useState<Boolean>(false)

  // Set up initial values persisted in state even while dragging
  const [initialRotation] = useState<number>(getRandomNumberInRange(-15, 15))
  const [initialY] = useState<number>(
    getRandomNumberInRange(25, 60) * (index % 2 == 0 ? -1 : 1)
  )

  // Handle smaller devices with different behavior
  const matches = useMediaQuery("(max-width: 768px)")

  function onOpen() {
    if (matches) {
      setIsModal(!isModal)
      setIsCaptionVisible(!isModal)
    }
  }

  function onStart() {
    if (!matches) {
      // setDirty && setDirty(true)
      setIsCaptionVisible(true)
      setIsDragging(true)
    }
  }

  function onEnd() {
    if (!matches) {
      setIsCaptionVisible(false)
      setIsDragging(false)
    }
  }

  useClickAnyWhere((e) => {
    if (
      e.target != itemRef.current &&
      !itemRef.current?.contains(e.target as Node) &&
      isModal &&
      matches
    ) {
      setIsModal(false)
      setIsCaptionVisible(false)
    }
  })

  // Setup rotation based on speed of drag
  const { rotate, x } = useRotationVelocity(initialRotation)

  const stickerVariants = {
    default: {},
    modal: {
      x: -boundingRect.x / 2 + boundingRect.width,
      rotate: 0,
      scale: 1.4,
      zIndex: 1000,
    },
    dragging: {
      scale: 1.8,
      zIndex: 1000,
    },
  }

  return (
    <motion.div
      ref={itemRef}
      variants={{
        hidden: {
          opacity: 0,
          scale: 0.9,
          y: 10,
        },
        shown: {
          opacity: 1,
          scale: 1,
          y: matches && preventYOffset ? Math.abs(initialY) : initialY,
        },
      }}
      style={{
        zIndex: isModal || isDragging ? 1000 : undefined,
      }}
      className={cn("relative cursor-grab active:cursor-grabbing", className)}
    >
      <motion.div
        variants={stickerVariants}
        className={cn(
          "relative drop-shadow-lg h-fit flex-shrink-1 min-w-[96px]"
        )}
        drag={!matches}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragTransition={{
          power: 0.1,
          bounceStiffness: 200,
        }}
        dragElastic={0.8}
        style={{
          rotate: isModal ? 0 : rotate,
          x,
        }}
        animate={
          matches
            ? isModal
              ? "modal"
              : "default"
            : isDragging
            ? "dragging"
            : "default"
        }
        onTap={onOpen}
        onHoverStart={onStart}
        onHoverEnd={onEnd}
        onDragEnd={onEnd}
      >
        <div className="pointer-events-none select-none">{children}</div>

        <AnimatePresence>
          {caption && caption.length > 0 && isCaptionVisible && (
            <motion.div
              key="child"
              initial={{ opacity: 0, y: -48, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 0.9 }}
              exit={{ opacity: 0, y: -48, scale: 0.5 }}
              style={{
                left: `50%`,
                x: `-50%`,
              }}
              className={cn(
                "pointer-events-none max-w-screen-sm select-none z-10 absolute top-full mx-auto text-[10px] text-center bg-white/95 backdrop-blur-3xl text-black mt-2 py-2 px-3 text-balance rounded-sm min-w-[160px]"
              )}
            >
              {caption}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

function StickerHeader({ className }: { className?: string }) {
  const [resetIndex, setResetIndex] = useState<number>(0)

  const container = {
    hidden: { opacity: 0 },
    shown: {
      opacity: 1,
      transition: {
        delayChilcren: 0,
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div
      key={resetIndex}
      className={cn(
        "w-full w-min-[280px] md:min-h-[280px] bg-secondary rounded-3xl p-6 @container max-h-72 xs:max-h-none",
        className
      )}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="shown"
        className="grid @lg:flex content-start grid-rows-3 grid-cols-3 gap-[1vw] h-full items-center relative justify-center"
      >
        <DotPattern />
        <Sticker
          caption="I've been on many podcasts like Design Details to talk about design-systems!"
          className="col-start-1 row-start-1"
          index={0}
        >
          <Image
            src="/stickers/design-details.jpg"
            alt="Image of Design Details Podcast cover"
            draggable={false}
            width={100}
            height={100}
            className="rounded-md max-w-[80px] xs:max-w-none"
          />
        </Sticker>
        <Sticker
          caption="It's me, Kathryn!"
          index={1}
          className="z-30 col-start-2 row-start-2"
        >
          <Avatar
            src="/stickers/headshot.jpg"
            alt="Image of Kathryn Gonzalez"
            className="max-w-[100px] max-h-[100px] xs:max-w-none"
          />
        </Sticker>

        <Sticker
          caption="I grew up in South Carolina, and like our motto says—&ldquo;While I breathe I hope.&rdquo;"
          className="col-start-2 row-start-1 @lg:top-0 top-8"
          index={2}
        >
          <img
            src="/stickers/south-carolina.svg"
            className="max-w-[100px] xs:max-w-none"
            draggable={false}
          />
        </Sticker>
        <Sticker
          caption="I joined DoorDash in 2015 as it's first product designer and frontend engineer, when it was just a handful of employees."
          index={3}
          className="col-start-3 row-start-1 @lg:top-0 -top-12"
        >
          <img
            src="/stickers/doordash.svg"
            draggable={false}
            className="max-w-[100px] xs:max-w-none"
          />
        </Sticker>
        <Sticker
          caption="I'm a proud trans and bi-woman that lives in San Francisco!"
          index={4}
          className="col-start-1 row-start-2 @lg:top-0 @lg:left-0 -left-4 top-8"
        >
          <img
            src="/stickers/flag.svg"
            className="max-w-[100px] xs:max-w-none"
            draggable={false}
          />
        </Sticker>
        <Sticker
          caption="Go Blue! I was a two-time dropout from the University of Michigan's engineering school to join startups like DoorDash :)"
          index={5}
          className="col-start-1 row-start-3"
        >
          <img
            src="/stickers/michigan.svg"
            className="max-w-[120px] xs:max-w-none"
            draggable={false}
          />
        </Sticker>
        <Sticker
          index={6}
          className="col-start-3 row-start-3 @lg:top-0 top-8"
          caption="I spoke at Figma's Config 2023 conference, talking about design systems and AI!"
        >
          <img
            src="/stickers/config.svg"
            width="120"
            className="max-w-[100px] xs:max-w-none"
            draggable={false}
          />
        </Sticker>
      </motion.div>
    </div>
  )
}

export default StickerHeader
