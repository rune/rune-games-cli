import fs from "fs"
import path from "path"

import { __dirname } from "./helpers.js"

export const packageJson: { version: string } = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8")
)
