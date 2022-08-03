import { Box } from "ink"
import TextInputImport from "ink-text-input"
import React, { useState, useCallback, useEffect } from "react"

import { Step } from "../../components/Step.js"
import { useCreateGame } from "../../gql/useCreateGame.js"
import { formatApolloError } from "../../lib/formatApolloError.js"
import { prepareFileUpload } from "../../lib/prepareFileUpload.js"

// @ts-ignore
const TextInput = TextInputImport.default as typeof TextInputImport

export function CreateNewGameStep({
  onComplete,
}: {
  onComplete: (newGameId: number) => void
}) {
  const [title, setTitle] = useState("")
  const [titleSubmitted, setTitleSubmitted] = useState(false)
  const [logoPath, setLogoPath] = useState("")
  const [logoPathSubmitted, setLogoPathSubmitted] = useState(false)
  const { createGame, createGameLoading, createGameError, createdGameId } =
    useCreateGame()

  const onSubmitTitle = useCallback(() => {
    if (title) setTitleSubmitted(true)
  }, [title])

  const onSubmitLogoPath = useCallback(() => {
    setLogoPathSubmitted(true)
  }, [])

  useEffect(() => {
    if (titleSubmitted && logoPathSubmitted) {
      createGame({
        title,
        ...(logoPath && { logo: prepareFileUpload(logoPath) }),
      })
    }
  }, [createGame, logoPath, logoPathSubmitted, title, titleSubmitted])

  useEffect(() => {
    if (createGameError) {
      setTitleSubmitted(false)
      setLogoPathSubmitted(false)
    }
  }, [createGameError])

  useEffect(() => {
    if (createdGameId) onComplete(createdGameId)
  }, [createdGameId, onComplete])

  return (
    <Box flexDirection="column">
      <Step
        status={titleSubmitted ? "success" : "userInput"}
        label={
          titleSubmitted
            ? `Will create a game called ${title}`
            : "Enter new game title"
        }
        view={
          !titleSubmitted && (
            <TextInput
              placeholder="My cool game"
              value={title}
              onChange={setTitle}
              onSubmit={onSubmitTitle}
            />
          )
        }
      />
      {titleSubmitted && (
        <Step
          status={logoPathSubmitted ? "success" : "userInput"}
          label={
            logoPathSubmitted
              ? logoPath === ""
                ? "Will create a game without a logo"
                : `Will use the logo at ${logoPath}`
              : "Provide path to game logo (optional)"
          }
          view={
            !logoPathSubmitted && (
              <TextInput
                placeholder="/path/to/logo.png"
                value={logoPath}
                onChange={setLogoPath}
                onSubmit={onSubmitLogoPath}
              />
            )
          }
        />
      )}
      {(createGameLoading || createGameError) && (
        <Step
          status={createGameLoading ? "waiting" : "error"}
          label={
            createGameError
              ? formatApolloError(createGameError, {
                  "[tango][CREATE_GAME_FAILED_TITLE_TAKEN]":
                    "This game title is already taken, try something else",
                  "[tango][CREATE_GAME_FAILED_TITLE_INVALID]":
                    "This game title is invalid, try something else",
                  "Input buffer contains unsupported image format":
                    "Not an image file",
                  default: `Something went wrong ${createGameError.message}`,
                })
              : "Creating the game"
          }
        />
      )}
    </Box>
  )
}
