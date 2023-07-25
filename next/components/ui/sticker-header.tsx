"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion"
import { useClickAnyWhere, useElementSize, useMediaQuery } from "usehooks-ts"

import { useElementBoundingRect } from "@/lib/hooks"
import { cn } from "@/lib/utils"
import Avatar from "@/components/ui/avatar"
import { Icons } from "@/components/icons"

function getRandomNumberInRange(min: number, max: number): number {
  if (min >= max) {
    throw new Error("Min value should be less than max value")
  }
  return Math.random() * (max - min) + min
}

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

function ResetButton({ resetState }: { resetState: () => void }) {
  return (
    <motion.button
      className="absolute bottom-0 right-0 p-2 bg-background border border-secondary-foreground/20 rounded-full shadow-sm shadow-black/30"
      onClick={resetState}
      whileTap={{ scale: 0.8, rotate: 180 }}
      whileHover={{ scale: 1.15 }}
      initial={{ opacity: 0, y: -48, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -48, scale: 0 }}
    >
      <Icons.refresh
        size={18}
        className="stroke-secondary-foreground stroke-2"
      />
    </motion.button>
  )
}

function Sticker({
  children,
  containerRef,
  index = 1,
  caption,
  setDirty,
  className,
  preventYOffsetOnMobile: preventYOffset,
}: {
  children: React.ReactNode
  containerRef?: React.MutableRefObject<HTMLElement | null>
  index: number
  caption?: string
  setDirty?: (dirty: boolean) => void
  className?: string
  preventYOffsetOnMobile?: boolean
}) {
  // Create refs for the sticker and caption, and set up measurement of elements
  const appRef = containerRef || useRef<HTMLElement | null>(null)
  const itemRef = useRef<HTMLDivElement | null>(null)
  const [captionRef, { width, height }] = useElementSize()
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

  function onTapStart() {
    if (!matches) {
      setDirty && setDirty(true)
      setIsCaptionVisible(true)
      setIsDragging(true)
    }
  }

  function hideCaption() {
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
  const x = useMotionValue(0)
  const xSmooth = useSpring(x, { damping: 50, stiffness: 400 })
  const xVelocity = useVelocity(xSmooth)
  const rotate = useTransform(
    xVelocity,
    [-3000, 0, 3000],
    [-25, initialRotation, 25],
    {
      clamp: true,
    }
  )

  const stickerVariants = {
    default: {},
    modal: {
      x: -boundingRect.x + boundingRect.width * 2 + 45,
      rotate: 0,
      scale: 1.8,
      zIndex: 1000,
    },
    desktopTap: {
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
        show: {
          opacity: 1,
          scale: 1,
          y: matches && preventYOffset ? Math.abs(initialY) : initialY,
        },
      }}
      style={{
        zIndex: isModal || isDragging ? 1000 : undefined,
      }}
      className={cn("relative", className)}
    >
      <motion.div
        variants={stickerVariants}
        className={cn(
          "relative drop-shadow-lg h-fit flex-shrink-1 min-w-[96px]"
        )}
        drag={!matches}
        dragConstraints={appRef}
        whileTap={!matches ? "desktopTap" : "default"}
        dragTransition={{
          power: 0.1,
          bounceStiffness: 200,
        }}
        dragElastic={0.8}
        style={{
          rotate: isModal ? 0 : rotate,
          x,
        }}
        animate={isModal ? "modal" : ""}
        onTap={onOpen}
        onDrag={() => {
          setIsDragging(true)
        }}
        onTapStart={onTapStart}
        onTapCancel={hideCaption}
        onDragEndCapture={hideCaption}
        onDragEnd={hideCaption}
        onTouchEnd={hideCaption}
        onMouseUp={hideCaption}
        onKeyUp={hideCaption}
      >
        <div className="pointer-events-none select-none">{children}</div>

        <AnimatePresence>
          {caption && caption.length > 0 && isCaptionVisible && (
            <motion.div
              ref={captionRef}
              key="child"
              initial={{ opacity: 0, y: -48, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -48, scale: 0.5 }}
              style={{
                x: (boundingRect.width - width) / 2 + (matches ? 25 : 0),
              }}
              className={cn(
                "max-w-screen-sm md:w-fit select-none -z-10 absolute top-full translate-y-full mx-auto text-[10px] text-center bg-yellow-300 text-black mt-3 py-2 px-3 text-balance rounded-sm",
                caption.length < 10 ? "w-fit" : "min-w-[160px]"
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

function StickerHeader() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [resetIndex, setResetIndex] = useState<number>(0)
  const [dirty, setDirty] = useState<boolean>(false)

  function resetState() {
    setResetIndex((prev) => prev + 1)
    setDirty(false)
  }

  function setAsDirty() {
    setDirty(true)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChilcren: 0,
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div
      key={resetIndex}
      className="w-full w-min-[280px] md:h-[240px] container m-auto bg-muted rounded-3xl p-6 border border-muted-foreground/10"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        ref={containerRef}
        className="grid md:flex content-start grid-rows-2 grid-cols-4 gap-4 h-full items-center relative justify-center"
      >
        <DotPattern />
        <Sticker
          containerRef={containerRef}
          caption="I've been on many podcasts like Design Details to talk about design-systems!"
          index={0}
          setDirty={setAsDirty}
        >
          <Image
            src="/stickers/design-details.jpg"
            alt="Image of Design Details Podcast cover"
            draggable={false}
            width={100}
            height={100}
            className="rounded-md"
          />
        </Sticker>
        <Sticker
          containerRef={containerRef}
          caption="It me!"
          index={1}
          setDirty={setAsDirty}
          className="z-30 top-6 md:top-0"
        >
          <Avatar
            src="/stickers/headshot.jpg"
            alt="Image of Kathryn Gonzalez"
          />
        </Sticker>

        <Sticker
          containerRef={containerRef}
          caption="I grew up in South Carolina, and like our motto says—&ldquo;While I breath I hope.&rdquo;"
          index={2}
          setDirty={setAsDirty}
        >
          <img src="/stickers/south-carolina.svg" draggable={false} />
        </Sticker>
        <Sticker
          containerRef={containerRef}
          caption="I joined DoorDash in 2015 as it's first product designer and frontend engineer, when it was just a handful of employees."
          index={3}
          setDirty={setAsDirty}
        >
          <img src="/stickers/doordash.svg" draggable={false} />
        </Sticker>
        <Sticker
          containerRef={containerRef}
          caption="I'm a proud trans and bi-woman that lives in San Francisco!"
          index={4}
          setDirty={setAsDirty}
        >
          <img src="/stickers/flag.svg" draggable={false} />
        </Sticker>
        <Sticker
          containerRef={containerRef}
          caption="Go Blue! I was a two-time dropout from their engineering school to join startups like DoorDash :)"
          index={5}
          setDirty={setAsDirty}
          className="top-6 md:top-0"
        >
          <img src="/stickers/michigan.svg" draggable={false} />
        </Sticker>
        <Sticker
          containerRef={containerRef}
          index={6}
          setDirty={setAsDirty}
          className="left-8 -top-8 md:left-0 md:top-0"
          caption="I spoke at Figma's Config 2023 conference, talking about design systems and AI!"
          preventYOffsetOnMobile
        >
          <img src="/stickers/config.svg" draggable={false} />
        </Sticker>
        <AnimatePresence>
          {dirty && <ResetButton resetState={resetState} />}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default StickerHeader
