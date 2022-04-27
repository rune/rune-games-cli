import { Text } from "ink"
import React from "react"
import meow from "meow"
import { Start } from "./Start.js"

const cli = meow(
  `
	Usage
	  $ rune start <game url or path>
`,
  { importMeta: import.meta }
)

export const App = () => {
  const command = cli.input[0]

  if (!command) return <Text color="red">No command provided</Text>
  if (command === "start") return <Start gameUrlOrPath={cli.input[1]} />

  return <Text color="red">Invalid command</Text>
}
