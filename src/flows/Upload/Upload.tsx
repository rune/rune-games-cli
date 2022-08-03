import { Box } from "ink"
import React, { useState } from "react"

import { ChooseGameStep } from "./ChooseGameStep.js"
import { CreateGameVersionStep } from "./CreateGameVersionStep.js"
import { CreateNewGameStep } from "./CreateNewGameStep.js"
import { GameDirInputStep } from "./GameDirInputStep.js"

export function Upload() {
  const [gameDir, setGameDir] = useState<string | undefined>()
  const [gameId, setGameId] = useState<number | null | undefined>()

  return (
    <Box flexDirection="column">
      <GameDirInputStep onComplete={setGameDir} />
      {gameDir !== undefined && (
        <ChooseGameStep currentGameId={gameId} onComplete={setGameId} />
      )}
      {gameId === null && <CreateNewGameStep onComplete={setGameId} />}
      {!!gameId && !!gameDir && (
        <CreateGameVersionStep gameId={gameId} gameDir={gameDir} />
      )}
    </Box>
  )
}
