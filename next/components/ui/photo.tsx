"use client"

import { Ref, forwardRef, useState } from "react"
import Image, { ImageProps } from "next/image"
import { useMouse } from "@uidotdev/usehooks"
import {
  clamp,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion"

import { getRandomNumberInRange } from "@/lib/getRandomNumberInRange"
import { cn } from "@/lib/utils"

const MotionImage = motion(
  forwardRef((props: ImageProps, ref: Ref<HTMLImageElement>) => (
    <Image ref={ref} {...props} />
  ))
)

type Direction = "left" | "right"

export const Photo = ({
  src,
  alt,
  className,
  direction,
  ...props
}: {
  src: string
  alt: string
  className?: string
  direction?: Direction
}) => {
  const [savedRotation] = useState<number>(getRandomNumberInRange(1, 4))
  const initialRotation = savedRotation * (direction == "left" ? -1 : 1)
  const x = useMotionValue(200)
  const y = useMotionValue(200)
  const xSmooth = useSpring(x, { damping: 50, stiffness: 400 })
  const ySmooth = useSpring(y, { damping: 50, stiffness: 400 })
  const rotateY = useTransform(xSmooth, [0, 400], [-15, 15])
  const rotateX = useTransform(ySmooth, [0, 400], [15, -15])

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    x.set(event.clientX - rect.left)
    y.set(event.clientY - rect.top)
  }

  const resetMouse = () => {
    x.set(200)
    y.set(200)
  }

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.4, zIndex: 1000 }}
      whileHover={{ scale: 1.1, rotateZ: 2 * (direction == "left" ? -1 : 1) }}
      whileDrag={{ zIndex: 1000 }}
      initial={{ rotate: initialRotation }}
      className={cn(
        className,
        "max-w-xs md:max-w-none shrink-0 w-fit mx-auto cursor-grab active:cursor-grabbing relative z-0"
      )}
      style={{
        perspective: 400,
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
    >
      <div className="tape z-10"></div>
      <div
        className={cn(
          "relative w-fit h-fit border-[8px] border-background shadow-xl rounded-sm overflow-hidden"
        )}
      >
        <MotionImage
          className={cn("relative w-fit h-fit")}
          width={400}
          height={200}
          src={src}
          alt={alt}
          {...props}
          draggable={false}
        />
        <motion.div
          className="block z-100 h-[512px] w-[512px] absolute -top-1/2 -left-1/2 bg-gradient-radial from-yellow-50/30 via-transparent to-transparent"
          style={{
            x: xSmooth,
            y: ySmooth,
          }}
        />
      </div>
    </motion.div>
  )
}
