"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";



import { Gradient } from "./gradient-mesh-lib";


function GradientMesh() {
  const style = {
    "--gradient-color-1": "#182536",
    "--gradient-color-2": "#1e293b",
    "--gradient-color-3": "#0f172a",
    "--gradient-color-4": "#020617",
  } as React.CSSProperties

  let ref = useRef(null)

  useEffect(() => {
    // Create your instance
    const gradient = new Gradient()

    // Call `initGradient` with the selector to your canvas
    gradient.initGradient(ref.current)
  }, [])

  return (
    <motion.canvas
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3, duration: 4 }}
      style={style}
      className={`absolute -z-10 top-0 bottom-0 right-0 left-0 min-h-screen h-full w-screen`}
      ref={ref}
      data-transition-in
    />
  )
}

export default GradientMesh