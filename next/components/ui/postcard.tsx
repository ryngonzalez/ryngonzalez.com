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

export const Postcard = ({
  className,
  direction,
  ...props
}: {
  className?: string
  direction?: Direction
}) => {
  const [savedRotation] = useState<number>(getRandomNumberInRange(1, 4))
  const initialRotation = savedRotation * (direction == "left" ? -1 : 1)
  const { rotate, x } = useRotationVelocity(initialRotation)

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.4, zIndex: 1000 }}
      whileHover={{ scale: 1.1, rotateZ: 2 * (direction == "left" ? -1 : 1) }}
      initial={{ rotate: initialRotation }}
      className={cn(
        className,
        "max-w-xs md:max-w-none shrink-0 w-fit mx-auto cursor-grab active:cursor-grabbing relative z-0"
      )}
      style={{ rotate, x }}
    >
      <div className="tape z-10"></div>
      <div className="bg-background shadow-lg w-fit max-w-xs md:max-w-none aspect-[12/8] border border-gray-500/20 grid grid-cols-2 grid-rows-2 p-4 md:p-6 gap-4 after:block after:w-full after:h-full after:absolute after:top-0 after:left-0 after:border-[0.5px] after:border-gray-400/50 postcard">
        <Image
          src="/stickers/paperclip.svg"
          alt="paperclip"
          width={20}
          height={80}
          className="absolute z-50 -top-[20px] -rotate-[20deg] left-[72px]"
        />
        <Image
          src="/photos/vacation.jpg"
          alt="stamp"
          width={72}
          height={72}
          className="row-span-2 row-start-1 col-span-1 w-full h-full object-cover border-background border-[0.5em] border-b-[1em] shadow-lg -rotate-2 -ml-1 -mt-4"
        />
        <Image
          src="/stickers/stamp.svg"
          alt="stamp"
          width={72}
          height={72}
          className="z-10 w-12 md:w-16 col-start-2 row-start-1 justify-self-end"
        />
        <Image
          src="/stickers/waves.svg"
          alt="stamp"
          width={88}
          height={88}
          className="z-10 w-16 md:w-20 col-start-2 row-start-1 justify-self-center rotate-6 self-end opacity-50"
        />
        <div className="row-start-2 col-start-2 self-end whitespace-nowrap">
          <p className="font-serif text-[15px] text-gray-700 border-b overflow-hidden text-ellipsis">
            <span className="text-[12px] tracking-widest font-mono uppercase block text-red-700">
              From:
            </span>
            Kathryn Gonzalez
          </p>
          <p className="text-[10px] font-serif text-gray-700 border-b overflow-hidden text-ellipsis">
            Mandue City, Cebu, 10259
          </p>
          <p className="text-[10px] font-serif text-gray-700 border-b overflow-hidden text-ellipsis">
            Republic of the Philippines
          </p>
        </div>
      </div>
    </motion.div>
  )
}
