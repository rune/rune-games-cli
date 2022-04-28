import React from "react"

import { ErrorText } from "../components/ErrorText.js"

import { cli } from "./cli.js"
import { Start } from "./Start/Start.js"

export const App = () => {
  const command = cli.input[0]

  if (!command) return <ErrorText>No command specified</ErrorText>
  if (command === "start") return <Start gameUrlOrPath={cli.input[1]} />

  return <ErrorText showHelp>Invalid command '{command}'</ErrorText>
}
