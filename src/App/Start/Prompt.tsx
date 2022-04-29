import { useInput, Text } from "ink"
import React, { useState } from "react"

import { BlinkingCursor } from "./BlinkingCursor.js"

export function Prompt({
  prompt,
  onSubmit,
}: {
  prompt: string
  onSubmit: (value: string) => void
}) {
  const [typed, setTyped] = useState("")

  useInput((input, key) => {
    if (input.length > 1) {
      setTyped("")
      onSubmit(input)
    } else if (key.return) {
      setTyped("")
      onSubmit(typed)
    } else if (key.backspace || key.delete) {
      setTyped(typed.slice(0, -1))
    } else if (input) {
      setTyped(`${typed}${input}`)
    }
  })

  return (
    <Text>
      <Text underline>{prompt}</Text>: {typed}
      <BlinkingCursor />
    </Text>
  )
}
