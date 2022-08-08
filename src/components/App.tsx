import { Text } from "ink"
import React from "react"

import { List } from "../flows/List.js"
import { Logout } from "../flows/Logout.js"
import { Start } from "../flows/Start/Start.js"
import { Upload } from "../flows/Upload/Upload.js"
import { cliCommand, cli } from "../lib/cli.js"
import { packageJson } from "../lib/packageJson.js"

import { LoginGate } from "./LoginGate.js"

export function App() {
  const { command, commandInvalid } = cliCommand()

  if (commandInvalid) {
    return <Text color="red">Invalid command `{command}`</Text>
  }

  if (cli.flags.version) return <Text>{packageJson.version}</Text>
  if (!command || command === "help") return <Text>{cli.help}</Text>
  if (command === "start") return <Start />
  if (command === "logout") return <Logout />

  return (
    <LoginGate>
      {command === "list" ? <List /> : command === "upload" ? <Upload /> : null}
    </LoginGate>
  )
}
