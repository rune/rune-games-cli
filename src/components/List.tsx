import { Text, Box } from "ink"
import React from "react"

import { useGames } from "../gql/useGames.js"
import { useMe } from "../gql/useMe.js"

export function List() {
  const { me } = useMe()
  const { games } = useGames({ skip: !me, condition: { devTeamId: me?.id } })

  return (
    <Box flexDirection="column">
      <Text>Your games:</Text>
      {!games?.length && <Text>You have not submitted any games yet</Text>}
      {games?.map((game) => (
        <Text key={game.id}>- {game.title}</Text>
      ))}
    </Box>
  )
}
