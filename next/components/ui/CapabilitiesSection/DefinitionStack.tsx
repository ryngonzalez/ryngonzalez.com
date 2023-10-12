"use client"

import { AnimatePresence, MotionProps, motion } from "framer-motion"

import { cn } from "@/lib/utils"

import { Ring } from "./Ring"

export function DefinitionStack({
  className,
  allCapabilities,
  index,
  handleNextClick,
}: {
  className?: string
  allCapabilities: { title: string; definition: React.ReactNode }[]
  index: number
  handleNextClick: () => void
}) {
  const variants = {
    initial: {},
    hovered: { rotate: -1 },
    exit: {},
  }
  let generatedVariants = [
    {
      initial: { x: 0, y: 0, rotate: 0 },
      exit: {
        x: -10,
        y: -10,
        rotate: -4,
        opacity: 0,
        scale: 1,
        rotateX: -34,
        rotateY: -35,
        rotateZ: -4,
        zIndex: 1000,
      },
      hovered: {
        x: 8,
        y: 6,
        rotate: 2,
      },
    },
  ]
  for (let index = 1; index <= 2; index++) {
    const prevVariant = generatedVariants[index - 1]
    generatedVariants[index] = {
      initial: {
        x: prevVariant.initial.x + 8,
        y: prevVariant.initial.y + 6,
        rotate: prevVariant.initial.rotate + 2,
      },
      exit: generatedVariants[0].exit,
      hovered: {
        x: prevVariant.hovered.x + 8,
        y: prevVariant.hovered.y + 6,
        rotate: prevVariant.hovered.rotate + 2,
      },
    }
  }

  const background = allCapabilities[(index + 2) % allCapabilities.length]
  const next = allCapabilities[(index + 1) % allCapabilities.length]
  const current = allCapabilities[index]

  return (
    <motion.div
      className={cn(
        "font-mono text-base relative origin-bottom-left h-80 md:min-w-[450px] w-full max-w-lg",
        className
      )}
      style={{ perspective: 10000 }}
      variants={variants}
      animate="initial"
      whileHover="hovered"
      onClick={handleNextClick}
    >
      <AnimatePresence>
        <Card
          variants={generatedVariants[2]}
          className="hidden sm:block origin-bottom-left sm:h-80 w-full z-0"
          key={background.title}
        >
          {background.definition}
        </Card>
        <Card
          variants={generatedVariants[1]}
          className="hidden sm:block origin-bottom-left sm:h-80 w-full z-0"
          key={next.title}
        >
          {next.definition}
        </Card>
        <Card
          variants={generatedVariants[0]}
          className="origin-bottom-left sm:h-80 w-full z-10"
          key={current.title}
        >
          {current.definition}
        </Card>
      </AnimatePresence>
      {/* <div ></div> */}
      <Ring className="hidden sm:block -rotate-[50deg] z-10 absolute bottom-[-24px] left-[8px] w-12 h-12" />
      <Ring className="hidden sm:block rotate-[135deg] -z-10 absolute bottom-[-18px] left-[26px] w-12 h-12" />
    </motion.div>
  )
}
function Card({
  children,
  className,
  ...rest
}: {
  children?: React.ReactNode
  className?: string
} & MotionProps) {
  return (
    <motion.div
      className={cn(
        "bg-purple-50 p-6 sm:p-8 rounded-3xl absolute shadow-lg shadow-black/10 border border-purple-200/80 min-w-[80vw] md:min-w-[450px]",
        "after:hidden after:sm:block after:absolute after:left-4 after:bottom-4 after:h-5 after:w-5 after:rounded-3xl after:border after:border-purple-300/80 after:bg-purple-300/50 after:shadow-inner after:shadow-black/20",
        className
      )}
      initial={false}
      animate="initial"
      exit={"exit"}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
