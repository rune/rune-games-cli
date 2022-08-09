import fetch from "cross-fetch"
import { Box, Text } from "ink"
import React, { useEffect, ReactNode, useState } from "react"
import semver, { ReleaseType } from "semver"

import { packageJson } from "../lib/packageJson.js"

import { Choose } from "./Choose.js"
import { Step } from "./Step.js"

export function VersionCheckGate({ children }: { children: ReactNode }) {
  const [latestVersion, setLatestVersion] = useState<string | undefined>()
  const [loading, setLoading] = useState(true)
  const [diff, setDiff] = useState<ReleaseType | null>(null)
  const [skipped, setSkipped] = useState<boolean | undefined>()

  useEffect(() => {
    getLatestNpmVersion("rune-games-cli")
      .then(setLatestVersion)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (latestVersion) setDiff(semver.diff(packageJson.version, latestVersion))
  }, [latestVersion])

  if (loading) {
    return <Step status="waiting" label="Checking latest CLI version" />
  }

  if (diff && skipped === undefined) {
    return (
      <Step
        status={diff === "major" ? "error" : "userInput"}
        label={`This CLI is out of date (installed: ${
          packageJson.version
        }, latest: ${latestVersion}).${
          diff !== "major" && " Do you want to proceed anyway?"
        }`}
        view={
          diff !== "major" && (
            <Choose
              options={diff === "patch" ? ["Yes", "No"] : ["No", "Yes"]}
              onSubmit={(response) => setSkipped(response === "Yes")}
            />
          )
        }
      />
    )
  }

  if (!skipped) {
    return (
      <Text>
        Run `yarn global add rune-games-cli` or `npm install -g rune-games-cli`
        to install the latest version
      </Text>
    )
  }

  return <Box flexDirection="column">{children}</Box>
}

function getLatestNpmVersion(npmPackage: string) {
  return fetch(`https://registry.npmjs.org/${npmPackage}/latest`)
    .then((res) => res.json())
    .then((res) => res.version as string | undefined)
}
