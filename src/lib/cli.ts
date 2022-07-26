import meow from "meow"

export const cli = meow(
  `
  Usage
    $ rune start <[optional] game path or URL, defaults to current directory>

  Options
    --version, -v   Show CLI version

  Examples
    $ cd game/path && rune start

    $ rune start game/path

    $ rune start https://game-url.com
`,
  {
    importMeta: import.meta,
    autoHelp: false,
    autoVersion: false,
    flags: {
      version: {
        type: "boolean",
        alias: "v",
      },
    },
  }
)

export const validCommands = [
  "help",
  "start",
  "login",
  "logout",
  "list",
] as const

export function cliCommand() {
  const command = cli.input[0] as typeof validCommands[number] | undefined

  return {
    command,
    commandInvalid: command && !validCommands.includes(command),
  }
}
