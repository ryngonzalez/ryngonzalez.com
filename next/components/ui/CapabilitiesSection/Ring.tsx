"use client"

import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

export function Ring({ className }: { className?: string }) {
  return (
    <motion.svg
      width="95"
      height="131"
      viewBox="0 0 95 131"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <g filter="url(#filter0_ii_271_12)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M26.6926 50.6711C16.4886 72.3237 22.3422 96.3651 38.3446 109.464C42.8319 113.137 45.1979 119.31 42.7258 124.556V124.556C40.2538 129.801 33.9294 132.118 29.1519 128.831C2.06511 110.195 -7.09487 73.1054 7.69628 41.719C22.4874 10.3325 56.9231 -6.2123 88.5382 2.81518C94.1143 4.4074 96.3531 10.7599 93.8811 16.0055V16.0055C91.409 21.2512 85.1421 23.3559 79.4528 22.2332C59.1642 18.2296 36.8965 29.0185 26.6926 50.6711Z"
          fill="#737373"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M26.6926 50.6711C16.4886 72.3237 22.3422 96.3651 38.3446 109.464C42.8319 113.137 45.1979 119.31 42.7258 124.556V124.556C40.2538 129.801 33.9294 132.118 29.1519 128.831C2.06511 110.195 -7.09487 73.1054 7.69628 41.719C22.4874 10.3325 56.9231 -6.2123 88.5382 2.81518C94.1143 4.4074 96.3531 10.7599 93.8811 16.0055V16.0055C91.409 21.2512 85.1421 23.3559 79.4528 22.2332C59.1642 18.2296 36.8965 29.0185 26.6926 50.6711Z"
          fill="url(#paint0_radial_271_12)"
          fill-opacity="0.19"
        />
      </g>
      <defs>
        <filter
          id="filter0_ii_271_12"
          x="0.656738"
          y="0.362305"
          width="94.2236"
          height="131.991"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_271_12"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow_271_12"
            result="effect2_innerShadow_271_12"
          />
        </filter>
        <radialGradient
          id="paint0_radial_271_12"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(71.5 71) rotate(-154.359) scale(69.3271 72.7563)"
        >
          <stop />
          <stop offset="0.783643" stop-color="white" />
          <stop offset="0.914925" />
        </radialGradient>
      </defs>
    </motion.svg>
  )
}
