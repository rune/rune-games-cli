import AdmZip from "adm-zip"
import { Box } from "ink"
import React, { useState, useEffect } from "react"

import { Choose } from "../../components/Choose.js"
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
            ? "Checking daily challenge support"
            : typeof challengeSupport === "boolean"
            ? `This game ${
                challengeSupport ? "supports" : "does not support"
              } daily challenges`
            : "Does this game support daily challenges?"
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
