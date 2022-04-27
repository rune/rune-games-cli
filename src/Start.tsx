import express from "express"
import getPort from "get-port"
import { Text, useInput } from "ink"
import path from "path"
import React, { useState, useEffect } from "react"

import { detectLocalIP } from "./detectLocalIP.js"
import { packageJson } from "./packageJson.js"

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
  }, [])

  useInput((input) => {
    if (input === "q") process.exit()
  })

  if (!gameUrlOrPath) {
    return <Text color="red">Game URL or path is not set</Text>
  }

  return (
    <>
      <Text color="green">
        {appServer
          ? `App is available at http://localhost:${appServer.port}${
              localIp && ` (http://${localIp}:${appServer.port})`
            }`
          : "App server is starting"}
      </Text>
      {type === "path" ? (
        <Text color="green">
          {gameServer
            ? `Game is available at http://localhost:${gameServer.port}${
                localIp && ` (http://${localIp}:${gameServer.port})`
              }`
            : "Game server is starting"}
        </Text>
      ) : (
        <Text color="green">Game is available at {gameUrlOrPath}</Text>
      )}
      <Text color="yellow">Press `q` to exit</Text>
    </>
  )
}

const wrapperDir = new URL("wrapper", import.meta.url).pathname

function useAppServer({ gameUrl }: { gameUrl?: string }) {
  const [port, setPort] = useState<number | null>(null)

  useEffect(() => {
    if (!gameUrl) return

    getPort({ port: 3000 }).then((freePort) => {
      const appServer = express()

      appServer.get("/data", (_, res) => {
        res.json({
          cliVersion: packageJson.version,
          gameUrl,
        })
      })

      appServer.use("/", express.static(wrapperDir))
      appServer.use("*", (_, res) => {
        res.sendFile(path.resolve(wrapperDir, "index.html"))
      })
      appServer.listen(freePort, () => {
        setPort(freePort)
      })
    })
  }, [gameUrl])

  return port ? { port } : null
}

function useGameServer({ gamePath }: { gamePath?: string }) {
  const [port, setPort] = useState<number | null>(null)

  useEffect(() => {
    if (!gamePath) return

    getPort({ port: 3001 }).then((freePort) => {
      const gameServer = express()

      gameServer.use("/", express.static(path.resolve(gamePath)))

      gameServer.listen(freePort, () => {
        setPort(freePort)
      })
    })
  }, [gamePath])

  return port ? { port } : null
}