import fs from "fs"

export const packageJson: { version: string } = JSON.parse(
  fs.readFileSync(new URL("../package.json", import.meta.url), "utf8")
)
