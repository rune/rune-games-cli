import figures from "figures"
import { Box, Text, useInput } from "ink"
import React, { useState, useMemo, useCallback, useEffect } from "react"

import { Step } from "../../components/Step.js"
import { useGames } from "../../gql/useGames.js"
import { useMe } from "../../gql/useMe.js"

export function ChooseGameStep({
  onComplete,
}: {
  onComplete: (gameId: number | null) => void
}) {
  const { me } = useMe()
  const { games } = useGames({ skip: !me, condition: { devTeamId: me?.id } })
  const [gameId, setGameId] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const items = useMemo(
    () => [
      { label: "New game", value: null },
      ...(games ?? []).map((game) => ({ label: game.title, value: game.id })),
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
      games?.find((game) => game.id === gameId)?.title
    }`
  }, [gameId, games])

  return (
    <Step
      status={submitted ? "success" : "userInput"}
      label={submitted ? chosenGameLabel : "Choose a game to upload"}
      view={
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

export function Select<T>({
  items,
  value,
  onChange,
  onSubmit,
}: {
  items: { label: string; value: T }[]
  value: T
  onChange: (value: T) => void
  onSubmit: () => void
}) {
  useInput((_, key) => {
    const currentIndex = items.findIndex((item) => item.value === value)
    const nextItem = items[currentIndex + 1]
    const prevItem = items[currentIndex - 1]

    if (key.downArrow && nextItem) onChange(nextItem.value)
    else if (key.upArrow && prevItem) onChange(prevItem.value)
    else if (key.return) onSubmit()
  })

  return (
    <Box flexDirection="column">
      {items.map((item, i) => (
        <Text key={i} dimColor={value !== item.value}>
          {value === item.value ? figures.pointer : " "} {item.label}
        </Text>
      ))}
    </Box>
  )
}
