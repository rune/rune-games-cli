import fs from "fs"
import { Text, Box, Spacer } from "ink"
import { UncontrolledTextInput } from "ink-text-input"
import path from "path"
import React, { useState, useMemo } from "react"

import { packageJson } from "../../lib/packageJson.js"
import { cli } from "../cli.js"

import { ExitKey } from "./ExitKey.js"
import { useAppServer } from "./useAppServer.js"
import { useGameServer } from "./useGameServer.js"
import { useLocalUrls } from "./useLocalUrls.js"

export function Start() {
  const [gameUrlOrPath, setGameUrlOrPath] = useState(cli.input[1])

  const gameType = useMemo(
    () =>
      gameUrlOrPath
        ? gameUrlOrPath.match(/^https?:\/\//)
          ? "url"
          : fs.existsSync(path.resolve(gameUrlOrPath))
          ? "path"
          : null
        : null,
    [gameUrlOrPath]
  )
  const ready = gameType !== null
  const error = !ready && !!gameUrlOrPath

  const gameServer = useGameServer({
    gamePath: gameType === "path" ? gameUrlOrPath : undefined,
  })

  const appServer = useAppServer({
    gameUrl:
      gameType === "url"
        ? gameUrlOrPath
        : gameType === "path" && gameServer
        ? `http://localhost:${gameServer.port}`
        : undefined,
  })

  const appUrls = useLocalUrls(appServer?.port)

  return (
    <Box>
      <Box
        paddingX={4}
        paddingY={1}
        borderStyle="round"
        borderColor={ready ? "green" : error ? "red" : "yellow"}
        flexDirection="column"
      >
        {ready ? (
          <>
            <Text color="green">App is available at {appUrls.join(", ")}</Text>
            <Text color="green">Game: {gameUrlOrPath}</Text>
          </>
        ) : (
          <>
            <Text color="yellow">
              App will start once you enter the game URL or path
            </Text>
            <Text>
              <Text underline color="yellow">
                Game
              </Text>
              :{" "}
              <UncontrolledTextInput
                placeholder="Enter URL or path"
                onSubmit={setGameUrlOrPath}
              />
            </Text>
            {error && (
              <Text color="red">
                Invalid URL or non-existent path `{gameUrlOrPath}`
              </Text>
            )}
          </>
        )}
        <Box height={1} />
        <Box>
          {ready && (
            <>
              <ExitKey />
              <Box width={1} />
            </>
          )}
          <Spacer />
          <Text>Rune CLI v{packageJson.version}</Text>
        </Box>
      </Box>
      <Spacer />
    </Box>
  )
}
