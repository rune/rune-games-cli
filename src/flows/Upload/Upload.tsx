import { Box, Text } from "ink"
import React, { useState } from "react"

import { ChooseGameStep } from "./ChooseGameStep.js"
import { GameDirInputStep } from "./GameDirInputStep.js"

export function Upload() {
  const [gameDir, setGameDir] = useState<string | undefined>()
  const [gameId, setGameId] = useState<number | null | undefined>()

  return (
    <Box flexDirection="column">
      {/* TODO: remove dev code */}
      <Text>{JSON.stringify({ gameDir, gameId })}</Text>
      <GameDirInputStep onComplete={setGameDir} />
      {gameDir !== undefined && <ChooseGameStep onComplete={setGameId} />}
    </Box>
  )
}
