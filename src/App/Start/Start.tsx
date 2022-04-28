import { Text, Box, Spacer } from "ink"
import React from "react"

import { ErrorText } from "../../components/ErrorText.js"
import { packageJson } from "../../lib/packageJson.js"
import { useExitKey } from "../../lib/useExitKey.js"

import { useAppServer } from "./useAppServer.js"
import { useGameServer } from "./useGameServer.js"
import { useLocalUrls } from "./useLocalUrls.js"

export function Start({ gameUrlOrPath }: { gameUrlOrPath?: string }) {
  useExitKey()

  const type = gameUrlOrPath
    ? gameUrlOrPath.startsWith("http")
      ? "url"
      : "path"
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

  if (!gameUrlOrPath) {
    return <ErrorText showHelp>Game URL or path was not provided</ErrorText>
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
        <Box height={1} />
        <Box>
          <Text color="yellow">Press `q` to exit</Text>
          <Box width={1} />
          <Spacer />
          <Text>Version {packageJson.version}</Text>
        </Box>
      </Box>
      <Spacer />
    </Box>
  )
}
