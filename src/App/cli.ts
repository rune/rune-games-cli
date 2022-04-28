import meow from "meow"

export const cli = meow(
  `
  Usage
    $ rune start <game URL or path>

  Options
    --version, -v   Show CLI version
    
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
