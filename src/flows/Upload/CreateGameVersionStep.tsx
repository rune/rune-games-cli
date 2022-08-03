import AdmZip from "adm-zip"
import { Box, Text, useInput } from "ink"
import React, { useState, useEffect } from "react"

import { Step } from "../../components/Step.js"
import { useCreateGameVersion } from "../../gql/useCreateGameVersion.js"
import { useGame } from "../../gql/useGame.js"
import { formatApolloError } from "../../lib/formatApolloError.js"

export function CreateGameVersionStep({
  gameId,
  gameDir,
}: {
  gameId: number
  gameDir: string
}) {
  const { game, gameLoading } = useGame(gameId)
  const {
    createGameVersion,
    createGameVersionLoading,
    createGameVersionError,
    newGameVersionId,
  } = useCreateGameVersion()
  const [challengeSupport, setChallengeSupport] = useState<
    boolean | undefined
  >()

  useEffect(() => {
    if (game?.gameVersions.nodes.find((version) => version.supportsChallenge)) {
      setChallengeSupport(true)
    }
  }, [game?.gameVersions.nodes])

  useEffect(() => {
    if (typeof challengeSupport === "boolean") {
      const zip = new AdmZip()

      zip.addLocalFolder(gameDir)

      createGameVersion({
        gameId,
        challengeSupport,
        content: {
          name: "content.zip",
          content: zip.toBuffer(),
          type: "application/zip",
        },
      })
    }
  }, [challengeSupport, createGameVersion, gameDir, gameId])

  return (
    <Box flexDirection="column">
      <Step
        status={
          gameLoading
            ? "waiting"
            : typeof challengeSupport === "boolean"
            ? "success"
            : "userInput"
        }
        label={
          gameLoading
            ? "Checking challenge support"
            : typeof challengeSupport === "boolean"
            ? `This game ${
                challengeSupport ? "supports" : "does not support"
              } challenges`
            : "Does this game support challenges?"
        }
        view={
          !gameLoading &&
          challengeSupport === undefined && (
            <Choose
              options={["No", "Yes"]}
              onSubmit={(response) => setChallengeSupport(response === "Yes")}
            />
          )
        }
      />
      {typeof challengeSupport === "boolean" && (
        <Step
          status={
            createGameVersionLoading
              ? "waiting"
              : createGameVersionError
              ? "error"
              : "success"
          }
          label={
            createGameVersionLoading
              ? "Uploading a new game version"
              : createGameVersionError
              ? formatApolloError(createGameVersionError, {
                  game_version_only_one_version_to_be_released:
                    "A previously uploaded version for this game is still in review, you cannot upload a new version yet",
                  default: "Something went wrong",
                })
              : `Version #${newGameVersionId} uploaded successfully and is now in review`
          }
        />
      )}
    </Box>
  )
}

function Choose<T extends string>({
  options,
  onSubmit,
}: {
  options: T[]
  onSubmit: (value: T) => void
}) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  useInput((_, key) => {
    if (key.downArrow || key.rightArrow) {
      setSelectedIndex(
        selectedIndex < options.length - 1 ? selectedIndex + 1 : 0
      )
    } else if (key.upArrow || key.leftArrow) {
      setSelectedIndex(
        selectedIndex > 0 ? selectedIndex - 1 : options.length - 1
      )
    } else if (key.return) {
      onSubmit(options[selectedIndex]!)
    }
  })

  return (
    <Box>
      {options.map((option, i) => (
        <Box key={option} paddingLeft={i > 0 ? 1 : 0}>
          <Text underline={i === selectedIndex} dimColor={i !== selectedIndex}>
            {option}
          </Text>
        </Box>
      ))}
    </Box>
  )
}
