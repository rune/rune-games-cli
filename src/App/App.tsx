import { Text } from "ink"
import React from "react"

import { ErrorText } from "../components/ErrorText.js"
import { packageJson } from "../lib/packageJson.js"

import { cli } from "./cli.js"
import { List } from "./List.js"
import { Start } from "./Start/Start.js"

export function App() {
  const command = cli.input[0]

  if (cli.flags.version) return <Text>{packageJson.version}</Text>
  if (!command || command === "help") return <Text>{cli.help}</Text>
  if (command === "start") return <Start />
  if (command === "list") return <List />

  return <ErrorText showHelp>Invalid command `{command}`</ErrorText>
}
