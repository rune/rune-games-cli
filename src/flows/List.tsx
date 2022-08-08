import figures from "figures"
import { Text, Box } from "ink"
import React from "react"

import { useGames, gameItemLabel } from "../gql/useGames.js"
import { useMe } from "../gql/useMe.js"

export function List() {
  const { me } = useMe()
  const { games } = useGames({ skip: !me, condition: { devTeamId: me?.id } })

  if (!games?.length) return <Text>You have not submitted any games yet</Text>

  return (
    <Box flexDirection="column">
      <Text>Your games:</Text>
      {games.map((game) => (
        <Text key={game.id}>
          {figures.bullet} {gameItemLabel(game)}
        </Text>
      ))}
    </Box>
  )
}
