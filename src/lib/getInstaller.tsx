import { execSync } from "child_process"

export function getInstaller() {
  try {
    if (execSync(`yarn global list`).toString().includes(`rune-games-cli`)) {
      return "yarn"
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}

  return "npm"
}
