import { formatDistanceToNowStrict } from "date-fns"
import React, { useState, useMemo, useCallback, useEffect } from "react"

import { Select } from "../../components/Select.js"
import { Step } from "../../components/Step.js"
import { useGames } from "../../gql/useGames.js"
import { useMe } from "../../gql/useMe.js"

export function ChooseGameStep({
  currentGameId,
  onComplete,
}: {
  currentGameId: number | null | undefined
  onComplete: (gameId: number | null) => void
}) {
  const { me } = useMe()
  const { games, gamesLoading } = useGames({
    skip: !me,
    condition: { devTeamId: me?.id },
  })
  const [gameId, setGameId] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (currentGameId) setGameId(currentGameId)
  }, [currentGameId])

  const items = useMemo(
    () => [
      { label: "New game", value: null },
      ...(games ?? []).map((game) => ({
        label: `${game.title}${
          game.createdAt
            ? ` (created ${formatDistanceToNowStrict(new Date(game.createdAt), {
                addSuffix: true,
              })})`
            : ""
        }`,
        value: game.id,
      })),
    ],
    [games]
  )

  const onSubmit = useCallback(() => setSubmitted(true), [])

  useEffect(() => {
    if (submitted) onComplete(gameId)
  }, [gameId, onComplete, submitted])

  const chosenGameLabel = useMemo(() => {
    if (gameId === null) return "Will create a new game"

    return `Will upload a new version of ${
      games?.find((game) => game.id === gameId)?.title ?? "..."
    }`
  }, [gameId, games])

  return (
    <Step
      status={gamesLoading ? "waiting" : submitted ? "success" : "userInput"}
      label={
        gamesLoading
          ? "Loading a list of games"
          : submitted
          ? chosenGameLabel
          : "Choose a game to upload"
      }
      view={
        !gamesLoading &&
        !submitted && (
          <Select
            items={items}
            value={gameId}
            onChange={setGameId}
            onSubmit={onSubmit}
          />
        )
      }
    />
  )
}
