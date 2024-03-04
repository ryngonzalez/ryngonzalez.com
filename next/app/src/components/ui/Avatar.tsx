"use client"

import React, { Ref } from "react"
import Image, { ImageProps } from "next/image"
import { motion } from "framer-motion"

import { cn } from "@/app/src/lib/utils"

type AvatarProps = {
  src: string
  alt: string
  className?: string
}
const MotionImage = motion(
  React.forwardRef((props: ImageProps, ref: Ref<HTMLImageElement>) => (
    <Image ref={ref} {...props} />
  ))
)

function Avatar({ src, alt, className, ...rest }: AvatarProps) {
  const [imageLoading, setImageLoading] = React.useState(true)

  const imageLoaded = () => {
    setImageLoading(false)
  }

  return (
    <div
      className={cn(
        "relative w-[128px] h-[128px] block rounded-full border-[6px] border-white",
        className
      )}
      {...rest}
    >
      <MotionImage
        initial={{ opacity: 0 }}
        animate={{
          opacity: imageLoading ? 0 : 1,
        }}
        draggable={false}
        transition={{ opacity: { delay: 0, duration: 0.2 } }}
        src={src}
        width={128}
        height={128}
        className="rounded-full -z-10"
        alt="Image of Kathryn Gonzalez"
        onLoad={imageLoaded}
        priority={true}
      />
    </div>
  )
}

export default Avatar
