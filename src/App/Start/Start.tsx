import { Text, useInput, Box, Spacer } from "ink"
import React, { useEffect } from "react"

import { ErrorText } from "../../components/ErrorText.js"
import { detectLocalIP } from "../../lib/detectLocalIP.js"
import { packageJson } from "../../lib/packageJson.js"

import { useAppServer } from "./useAppServer.js"
import { useGameServer } from "./useGameServer.js"

const localIp = detectLocalIP()

export function Start({ gameUrlOrPath }: { gameUrlOrPath?: string }) {
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
        : gameServer
        ? `http://localhost:${gameServer.port}`
        : undefined,
  })

  useEffect(() => {
    if (type === null) process.exit(0)
  }, [type])

  useInput((input) => {
    if (input === "q") process.exit()
  })

  if (!gameUrlOrPath) {
    return <ErrorText showHelp>Game URL or path was not provided</ErrorText>
  }

  const urls = []

  if (appServer) urls.push(`http://localhost:${appServer.port}`)
  if (appServer && localIp) urls.push(`http://${localIp}:${appServer.port}`)

  return (
    <Box>
      <Box
        paddingX={4}
        paddingY={1}
        borderStyle="round"
        borderColor="green"
        flexDirection="column"
      >
        <Text color="green">
          {urls.length > 0
            ? `App is available at ${urls.join(", ")}`
            : "App server is starting"}
        </Text>
        <Box height={1} />
        <Box>
          <Text color="yellow">Press `q` to exit</Text>
          <Spacer />
          <Text>Version {packageJson.version}</Text>
        </Box>
      </Box>
      <Spacer />
    </Box>
  )
}
