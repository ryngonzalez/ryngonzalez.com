"use client"

import { useState } from "react"
import { DragEndEvent, useDndMonitor, useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"

import Avatar from "./avatar"

function StickerHeader() {
  const [activeId, setActiveId] = useState<string | null>(null)

  const [stickerStates, setStickerStates] = useState<any>({
    rectangle: { x: 0, y: 0 },
    avatar: { x: 0, y: 0 },
    doordash: { x: 0, y: 0 },
  })

  function onDragStart(event: DragEndEvent) {
    setActiveId(event.active.id as string)
  }

  function onDragEnd(event: DragEndEvent) {
    const { x, y } = event.delta
    const current = stickerStates[event.active.id]
    setStickerStates({
      ...stickerStates,
      [event.active.id]: {
        x: current?.x + x,
        y: current?.y + y,
      },
    })
    setActiveId(null)
  }

  useDndMonitor({
    onDragStart,
    onDragEnd,
  })

  let drags = ["rectangle", "avatar", "doordash"].reduce(
    (acc: any, id: string) => ({ [id]: useDraggable({ id }), ...acc }),
    {}
  )

  drags = Object.keys(drags).reduce((acc, dragKey: any) => {
    const dragValue = drags[dragKey]
    console.log(dragValue)
    return {
      ...acc,
      [dragKey]: {
        ...dragValue,
        transformedValue: {
          x: (dragValue.transform?.x || 0) + stickerStates[dragKey].x,
          y: (dragValue.transform?.y || 0) + stickerStates[dragKey].y,
        },
      },
    }
  }, {})

  return (
    <div className="w-fill relative top-8 left-0">
      <div
        className="w-12 h-12 bg-red-100 absolute top-1/2"
        ref={drags["rectangle"].setNodeRef}
        style={{
          transform: `${CSS.Translate.toString(
            drags["rectangle"].transformedValue
          )} ${activeId == "rectangle" ? "rotate(12deg)" : "rotate(0deg)"}`,
        }}
        {...drags["rectangle"].listeners}
        {...drags["rectangle"].attributes}
      ></div>
      <Avatar
        src="/Headshot-transformed.jpeg"
        alt="Image of Kathryn Gonzalez"
        style={{
          transform: `${CSS.Translate.toString(
            drags["avatar"].transformedValue
          )} ${activeId == "avatar" ? "rotate(12deg)" : "rotate(0deg)"}`,
        }}
        {...drags["avatar"].listeners}
        {...drags["avatar"].attributes}
      />
      <img
        src="/doordash-sticker.svg"
        className="drop-shadow-lg absolute shadow-black"
        draggable={false}
        style={{
          transform: `${CSS.Translate.toString(
            drags["doordash"].transformedValue
          )} ${activeId == "doordash" ? "rotate(-8deg)" : "rotate(12deg)"}`,
        }}
        {...drags["doordash"].listeners}
        {...drags["doordash"].attributes}
      />
    </div>
  )
}

export default StickerHeader
