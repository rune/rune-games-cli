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
    games(condition: $condition, orderBy: [PRIMARY_KEY_DESC]) {
      nodes {
        id
        title
        gameVersions(orderBy: [PRIMARY_KEY_DESC]) {
          nodes {
            gameId
            gameVersionId
            status
            supportsChallenge
          }
        }
      }
    }
  }
`
