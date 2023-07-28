"use client"

import { Ref, forwardRef, useState } from "react"
import Image, { ImageProps } from "next/image"
import { motion } from "framer-motion"

import { getRandomNumberInRange } from "@/lib/getRandomNumberInRange"
import { useRotationVelocity } from "@/lib/useRotationVelocity"
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
  const [savedRotation] = useState<number>(getRandomNumberInRange(2, 6))
  const initialRotation = savedRotation * (direction == "left" ? -1 : 1)
  const { rotate, x } = useRotationVelocity(initialRotation)

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.4, zIndex: 1000 }}
      initial={{ rotate: initialRotation }}
      className={cn(
        className,
        "relative mt-12 max-w-xs md:max-w-none md:-mt-4 shrink-0 mb-12 w-fit mx-auto",
        direction == "left" ? "md:-ml-24" : "md:-mr-24",
        direction == "left" ? "md:mr-16" : "md:ml-16"
      )}
      style={{ rotate, x }}
    >
      <div className="tape z-10"></div>
      <MotionImage
        className={cn(
          "relative w-fit h-fit border-[8px] border-background shadow-xl rounded-sm overflow-hidden"
        )}
        width={360}
        height={200}
        src={src}
        alt={alt}
        {...props}
        draggable={false}
      />
    </motion.div>
  )
}
