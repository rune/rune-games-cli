import { Text } from "ink"
import React from "react"

import { useGames } from "../../gql/useGames.js"
import { useMe } from "../../gql/useMe.js"

export function List() {
  const { me } = useMe()
  const { games } = useGames({ skip: !me, condition: { devTeamId: me?.id } })

  return <Text>{JSON.stringify({ me, games })}</Text>
}
