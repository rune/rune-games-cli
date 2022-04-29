import fs from "fs"
import { Text, Box, Spacer } from "ink"
import path from "path"
import React, { useState } from "react"

import { packageJson } from "../../lib/packageJson.js"
import { useExitKey } from "../../lib/useExitKey.js"
import { cli } from "../cli.js"

import { Prompt } from "./Prompt.js"
import { useAppServer } from "./useAppServer.js"
import { useGameServer } from "./useGameServer.js"
import { useLocalUrls } from "./useLocalUrls.js"

export function Start() {
  const [gameUrlOrPath, setGameUrlOrPath] = useState(cli.input[1])

  // todo: only when server is running, not input
  //  probably just split this into two components
  useExitKey()

  const type = gameUrlOrPath
    ? gameUrlOrPath.match(/^https?:\/\//)
      ? "url"
      : fs.existsSync(path.resolve(gameUrlOrPath))
      ? "path"
      : null
    : null

  const gameServer = useGameServer({
    gamePath: type === "path" ? gameUrlOrPath : undefined,
  })
  const appServer = useAppServer({
    gameUrl:
      type === "url"
        ? gameUrlOrPath
        : type === "path" && gameServer
        ? `http://localhost:${gameServer.port}`
        : undefined,
  })

  const appUrls = useLocalUrls(appServer?.port)

  if (!type) {
    return (
      <Box>
        <Box
          paddingX={4}
          paddingY={1}
          borderStyle="round"
          borderColor="yellow"
          flexDirection="column"
        >
          {!!gameUrlOrPath && (
            <>
              <Text color="red">
                Invalid game URL or path `{gameUrlOrPath}`
              </Text>
              <Box height={1} />
            </>
          )}
          <Prompt
            prompt="Enter the game URL or path"
            onSubmit={setGameUrlOrPath}
          />
        </Box>
        <Spacer />
      </Box>
    )
  }

  return (
    <Box>
      <Box
        paddingX={4}
        paddingY={1}
        borderStyle="round"
        borderColor="green"
        flexDirection="column"
      >
        {appUrls.length > 0 ? (
          <Text color="green">App is available at {appUrls.join(", ")}</Text>
        ) : (
          <Text color="yellow">App is starting...</Text>
        )}
        <Text color="green">Game: {gameUrlOrPath}</Text>
        <Box height={1} />
        <Box>
          <Text>Press `q` to exit</Text>
          <Box width={1} />
          <Spacer />
          <Text>Version {packageJson.version}</Text>
        </Box>
      </Box>
      <Spacer />
    </Box>
  )
}
