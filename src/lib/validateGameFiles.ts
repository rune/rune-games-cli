import { parse, valid } from "node-html-parser"
import semver from "semver"

export const validationOptions = {
  sdkUrlStart: "https://cdn.jsdelivr.net/npm/rune-games-sdk",
  sdkVersionRegex: /rune-games-sdk@(\d\.\d(\.\d)?)/,
  minSdkVersion: "2.4.0",
  maxFiles: 1000,
  maxSizeMb: 25,
}

export async function validateGameFiles(
  files: { content?: string; path: string; size: number }[]
) {
  const { sdkUrlStart, sdkVersionRegex, minSdkVersion, maxFiles, maxSizeMb } =
    validationOptions

  const errors: string[] = []

  if (files.length > maxFiles) errors.push(`Too many files (>${maxFiles})`)

  const totalSize = files.reduce((acc, file) => acc + file.size, 0)

  if (totalSize > maxSizeMb * 1e6) {
    errors.push(`Game size must be less than ${maxSizeMb}MB`)
  }

  const indexHtml = files.find(
    (file) => file.path === "index.html" || file.path.endsWith("/index.html")
  )

  if (indexHtml) {
    if (indexHtml.content) {
      try {
        if (!valid(indexHtml.content)) {
          errors.push("index.html is not valid HTML")
        } else {
          const parsedIndexHtml = parse(indexHtml.content)
          const scripts = parsedIndexHtml.getElementsByTagName("script")
          const sdkScript = scripts.find((script) =>
            script.getAttribute("src")?.startsWith(sdkUrlStart)
          )

          if (sdkScript) {
            if (scripts.indexOf(sdkScript) !== 0) {
              errors.push("Rune SDK must be the first script in index.html")
            }

            const sdkVersion = sdkScript
              .getAttribute("src")
              ?.match(sdkVersionRegex)?.[1]

            const sdkVersionCoerced = semver.coerce(sdkVersion)
            const minSdkVersionCoerced = semver.coerce(minSdkVersion)

            if (
              sdkVersionCoerced &&
              minSdkVersionCoerced &&
              semver.lt(sdkVersionCoerced, minSdkVersionCoerced)
            ) {
              errors.push(
                `Rune SDK is below minimum version (included ${sdkVersion}, min ${minSdkVersion})`
              )
            }
          } else {
            errors.push("Game index.html must include Rune SDK script")
          }
        }
      } catch (e) {
        errors.push("index.html is not valid HTML")
      }
    } else {
      errors.push("index.html content has not been provided for validation")
    }
  } else {
    errors.push("Game must include index.html")
  }

  return {
    valid: errors.length === 0,
    errors,
    indexHtml,
  }
}
