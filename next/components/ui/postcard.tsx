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
        "relative mt-12 md:-mt-4 shrink-0 mb-12 w-fit mx-auto",
        direction == "left" ? "md:-ml-24" : "md:-mr-24",
        direction == "left" ? "md:mr-16" : "md:ml-16"
      )}
      style={{ rotate, x }}
    >
      <div className="tape z-10"></div>
      <div className="bg-yellow-50 shadow-lg w-96 aspect-[12/8] border border-gray-500/20 grid grid-cols-2 grid-rows-2 p-6 gap-4 after:block after:w-full after:h-full after:absolute after:top-0 after:left-0 after:border-[12px] after:border-yellow-600/5 postcard">
        <Image
          src="/photos/vacation.jpg"
          alt="stamp"
          width={72}
          height={72}
          className="row-span-2 row-start-1 col-span-1 w-full h-full object-cover border-background border-4 shadow-lg -rotate-2 -ml-1"
        />
        <Image
          src="/stickers/stamp.svg"
          alt="stamp"
          width={72}
          height={72}
          className="col-start-2 row-start-1 justify-self-end"
        />
        <Image
          src="/stickers/waves.svg"
          alt="stamp"
          width={88}
          height={88}
          className="col-start-2 row-start-1 justify-self-center rotate-6 self-end opacity-50"
        />
        <div className="row-start-2 col-start-2 self-end">
          <p className="text-base font-serif text-gray-700 border-b">
            <span className="text-[12px] tracking-widest font-mono uppercase block text-red-700">
              From:
            </span>
            Kathryn Gonzalez
          </p>
          <p className="text-base font-serif text-gray-700 border-b">
            Mandue City, Cebu, 10259
          </p>
          <p className="text-base font-serif text-gray-700 border-b">
            Republic of the Philippines
          </p>
        </div>
      </div>
    </motion.div>
  )
}
