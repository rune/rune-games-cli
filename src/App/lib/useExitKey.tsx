import { useInput } from "ink"

export function useExitKey() {
  useInput((input) => {
    if (input === "q") process.exit()
  })
}
