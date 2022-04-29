import { Text } from "ink"
import React, { useState, useEffect } from "react"

export function BlinkingCursor() {
  const [blink, setBlink] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => setBlink(!blink), 500)

    return () => clearInterval(interval)
  }, [blink])

  return <Text>{blink ? "█" : " "}</Text>
}
