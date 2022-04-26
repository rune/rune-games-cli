#!/usr/bin/env node

import React, { useEffect, useMemo } from "react"
import { render, Text } from "ink"
import getPort from "get-port"

import express from "express"
import meow from "meow"
import { packageJson } from "./packageJson.js"

const cli = meow(
  `
	Usage
	  $ foo <game url or path>

	Options
	  --https, -s   Use https

	Examples
	  $ foo unicorns --rainbow
	  🌈 unicorns 🌈
`,
  {
    importMeta: import.meta,
    flags: {
      rainbow: {
        type: "number",
        alias: "r",
      },
    },
  }
)

console.log([cli.input, cli.flags.rainbow])

// cli.showVersion()

getPort()
  .then((port) => {
    console.log("getPort", port)
  })
  .catch((err) => {
    console.log("error", err)
  })

// const app = express()
// const port = 3000

// todo: test sdk on one port, game on second and wrapper on third

// todo: perhaps just serve game and wrapper on different ports always? to avoid clearLocalStorage having effect on wrapper

// app.use(
//   "/sdk",
//   express.static("/Users/helios/Projects/rune/rune-games-sdk/dist")
// )
//
// app.use(
//   "/__game__",
//   express.static("/Users/helios/Projects/rune/rune-games-cli/__temp/5")
// )

// app.use(
//   "/__build*",
//   express.static("/Users/helios/Projects/rune/rune-games-cli/__temp/5", {
//     // redirect: false,
//   })
// )

// app.use("/", express.static("/Users/helios/Projects/rune/TinCan/app/web/build"))
//
// app.use("*", (_, res) => {
//   res.sendFile("/Users/helios/Projects/rune/TinCan/app/web/build/index.html")
// })
//
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

const Counter = () => {
  const appServer = useMemo(() => express(), [])
  const gameServer = useMemo(() => express(), [])
  const sdkServer = useMemo(() => express(), [])

  useEffect(() => {
    appServer.get("/data", (_, res) => {
      // todo: remove?
      res.setHeader("Access-Control-Allow-Origin", "*")
      res.json({
        cliVersion: packageJson.version,
        gameUrl: "http://localhost:3002",
      })
    })
    appServer.use(
      "/",
      express.static("/Users/helios/Projects/rune/TinCan/app/web/build")
    )
    appServer.use("*", (_, res) => {
      res.sendFile(
        "/Users/helios/Projects/rune/TinCan/app/web/build/index.html"
      )
    })
    appServer.listen(3001, () => {
      console.log("listening")
    })

    gameServer.use(
      "/",
      express.static("/Users/helios/Projects/rune/rune-games-cli/__temp/5")
    )
    gameServer.listen(3002)

    sdkServer.use(
      "/",
      express.static("/Users/helios/Projects/rune/rune-games-sdk/dist")
    )
    sdkServer.listen(3003)
  }, [])

  return <Text>Hello</Text>
}

render(<Counter />)
