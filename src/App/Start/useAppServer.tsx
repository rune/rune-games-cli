import express from "express"
import http from "http"
import path from "path"
import { useState, useEffect } from "react"

import { choosePort } from "../../lib/choosePort.js"
import { getServerPort } from "../../lib/getServerPort.js"
import { packageJson } from "../../lib/packageJson.js"
import { rootPath } from "../../lib/rootPath.js"
import { storage } from "../../lib/storage/storage.js"

const appDir = path.resolve(rootPath, "app")

export function useAppServer({ gameUrl }: { gameUrl?: string }) {
  const [port, setPort] = useState<number | null>(null)

  useEffect(() => {
    if (!gameUrl || port) return

    choosePort([3000, storage.get("lastAppServerPort")]).then((portToUse) => {
      const appServer = express()

      appServer.get("/data", (_, res) => {
        res.json({
          cliVersion: packageJson.version,
          gameUrl,
        })
      })

      appServer.use("/", express.static(appDir))

      appServer.use("*", (_, res) => {
        res.sendFile(path.resolve(appDir, "index.html"))
      })

      const server = http.createServer(appServer)
      server.listen(portToUse, () => setPort(getServerPort(server)))
    })
  }, [gameUrl, port])

  useEffect(() => {
    if (port) storage.set("lastAppServerPort", port)
  }, [port])

  return port ? { port } : null
}
