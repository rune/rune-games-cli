import { ESLint, Linter } from "eslint"
import { parse, valid } from "node-html-parser"
import semver from "semver"

import { FileInfo } from "./getGameFiles.js"

import LintMessage = Linter.LintMessage

export const validationOptions = {
  sdkUrlStart: "https://cdn.jsdelivr.net/npm/rune-games-sdk",
  sdkVersionRegex: /rune-games-sdk@(\d\.\d(\.\d)?)/,
  minSdkVersion: "2.4.0",
  maxFiles: 1000,
  maxSizeMb: 25,
}

const eslint = new ESLint({
  useEslintrc: false,
  baseConfig: {
    root: true,
    env: {
      es6: true,
    },
    globals: {
      Rune: true,
    },
    rules: {
      "no-undef": "error",
    },
  },
})

export interface ValidationError {
  message: string
  lintErrors?: LintMessage[]
}

export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
}

export async function validateGameFiles(
  files: FileInfo[]
): Promise<ValidationResult> {
  const { sdkUrlStart, sdkVersionRegex, minSdkVersion, maxFiles, maxSizeMb } =
    validationOptions

  const errors: ValidationError[] = []

  if (files.length > maxFiles) {
    errors.push({ message: `Too many files (>${maxFiles})` })
  }

  const totalSize = files.reduce((acc, file) => acc + file.size, 0)

  if (totalSize > maxSizeMb * 1e6) {
    errors.push({ message: `Game size must be less than ${maxSizeMb}MB` })
  }

  const indexHtml = files.find(
    (file) => file.path === "index.html" || file.path.endsWith("/index.html")
  )
  const logicJs = files.find(
    (file) => file.path === "logic.js" || file.path.endsWith("/logic.js")
  )
  const clientJs = files.find(
    (file) => file.path === "client.js" || file.path.endsWith("/client.js")
  )

  if (indexHtml) {
    if (indexHtml.content) {
      try {
        if (!valid(indexHtml.content)) {
          errors.push({ message: "index.html is not valid HTML" })
        } else {
          const parsedIndexHtml = parse(indexHtml.content)
          const scripts = parsedIndexHtml.getElementsByTagName("script")
          const sdkScript = scripts.find((script) =>
            script.getAttribute("src")?.startsWith(sdkUrlStart)
          )

          if (sdkScript) {
            if (sdkScript.getAttribute("src")?.endsWith("/multiplayer.js")) {
              const logicScript = scripts.find(
                (script) =>
                  script.getAttribute("src") === "logic.js" ||
                  script.getAttribute("src")?.endsWith("/logic.js")
              )
              const clientScript = scripts.find(
                (script) =>
                  script.getAttribute("src") === "client.js" ||
                  script.getAttribute("src")?.endsWith("/client.js")
              )

              if (logicScript) {
                if (scripts.indexOf(logicScript) !== 1) {
                  errors.push({
                    message: "logic.js must be the second script in index.html",
                  })
                }

                if (logicJs) {
                  if (logicJs.content) {
                    await eslint
                      .lintText(logicJs.content)
                      .then((results) => {
                        const result = results.at(0)

                        if (result) {
                          if (result.messages.length > 0) {
                            errors.push({
                              message: "logic.js contains invalid code",
                              lintErrors: result.messages,
                            })
                          }
                        } else {
                          errors.push({ message: "failed to lint logic.js" })
                        }
                      })
                      .catch(() => {
                        errors.push({ message: "failed to lint logic.js" })
                      })
                  } else {
                    errors.push({
                      message:
                        "logic.js content has not been provided for validation",
                    })
                  }
                } else {
                  errors.push({
                    message: "logic.js must be included in the game files",
                  })
                }
              } else {
                errors.push({
                  message: "logic.js file is not included in index.html",
                })
              }

              if (clientScript) {
                if (scripts.indexOf(clientScript) !== 2) {
                  errors.push({
                    message: "client.js must be the third script in index.html",
                  })
                }

                if (!clientJs) {
                  errors.push({
                    message: "client.js must be included in the game files",
                  })
                }
              } else {
                errors.push({
                  message: "client.js file is not included in index.html",
                })
              }
            }

            if (scripts.indexOf(sdkScript) !== 0) {
              errors.push({
                message: "Rune SDK must be the first script in index.html",
              })
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
              errors.push({
                message: `Rune SDK is below minimum version (included ${sdkVersion}, min ${minSdkVersion})`,
              })
            }
          } else {
            errors.push({
              message: "Game index.html must include Rune SDK script",
            })
          }
        }
      } catch (e) {
        errors.push({ message: "index.html is not valid HTML" })
      }
    } else {
      errors.push({
        message: "index.html content has not been provided for validation",
      })
    }
  } else {
    errors.push({ message: "Game must include index.html" })
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
