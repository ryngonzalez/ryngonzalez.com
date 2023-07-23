"use client"

import { useState } from "react"
import { DndContext } from "@dnd-kit/core"

function DndProvider({ children }: { children: React.ReactNode }) {
  return <DndContext>{children}</DndContext>
}

export default DndProvider
