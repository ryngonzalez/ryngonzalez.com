"use client"

import React, { Ref } from "react"
import Image, { ImageProps } from "next/image"
import { motion } from "framer-motion"

type AvatarProps = {
  src: string
  alt: string
}
const MotionImage = motion(
  React.forwardRef((props: ImageProps, ref: Ref<HTMLImageElement>) => (
    <Image ref={ref} {...props} />
  ))
)

function Avatar({ src, alt, ...rest }: AvatarProps) {
  const [imageLoading, setImageLoading] = React.useState(true)

  const imageLoaded = () => {
    setImageLoading(false)
  }

  return (
    <div
      className="relative w-[128px] h-[128px] bg-secondary block rounded-full border-[6px] border-white drop-shadow-lg dark:shadow-inner dark:shadow-gray-50/30"
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
        className="relative rounded-full -z-10"
        alt="Image of Kathryn Gonzalez"
        onLoad={imageLoaded}
        priority={true}
      />
    </div>
  )
}

export default Avatar
