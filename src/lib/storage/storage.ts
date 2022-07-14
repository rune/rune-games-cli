import { serialize, deserialize } from "bson"
import fs from "fs"
import os from "os"
import path from "path"

import { Storage } from "./types.js"

const dataDir = path.resolve(os.tmpdir(), "rune")
fs.mkdirSync(dataDir, { recursive: true })

export const storage = {
  get<T extends keyof Storage>(key: T) {
    try {
      return deserialize(fs.readFileSync(valueFile(key))).value as Storage[T]
    } catch (e) {
      return undefined
    }
  },
  set<T extends keyof Storage>(key: T, value: Storage[T]) {
    fs.writeFileSync(valueFile(key), serialize({ value }))
  },
  delete(key: keyof Storage) {
    fs.writeFileSync(valueFile(key), "")
  },
}

function valueFile(key: keyof Storage) {
  return path.resolve(dataDir, `${key}.value`)
}
