import { Binary } from "bson"

export interface Storage extends StorageObject {
  lastAppServerPort: number
  lastGameServerPort: number
}

export interface StorageObject {
  [key: string]: StorageValue<string | number | boolean | null | Date | Binary>
}

type StorageValue<T> =
  | T
  | StorageValue<T>[]
  | { [key: string]: StorageValue<T> }
