import { useInput } from "ink"

export function useExitKey(active: boolean) {
  useInput(
    (input) => {
      if (input === "q") process.exit()
    },
    { isActive: active }
  )
}
