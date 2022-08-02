import { useQuery, gql } from "@apollo/client/index.js"

import { GamesDocument, GameCondition } from "../generated/types.js"

export function useGames({
  skip,
  condition,
}: {
  skip?: boolean
  condition?: GameCondition
} = {}) {
  const { data, ...rest } = useQuery(GamesDocument, {
    skip,
    variables: { condition },
  })

  return {
    games: data?.games?.nodes,
    gamesLoading: rest.loading,
  }
}

gql`
  query Games($condition: GameCondition) {
    games(condition: $condition) {
      nodes {
        id
        title
      }
    }
  }
`
