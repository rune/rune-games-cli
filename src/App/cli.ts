import meow from "meow"

export const cli = meow(
  `
  Usage
    $ rune start <game URL or path>
`,
  { importMeta: import.meta }
)
