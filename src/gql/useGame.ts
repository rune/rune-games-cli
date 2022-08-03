import { gql, useQuery } from "@apollo/client/index.js"

import { GameDocument } from "../generated/types.js"

export function useGame(id: number | null | undefined) {
  const { data, ...rest } = useQuery(GameDocument, {
    skip: !id,
    ...(id && { variables: { id } }),
  })

  return {
    game: data?.gameById,
    gameLoading: rest.loading,
  }
}

gql`
  query Game($id: Int!) {
    gameById(id: $id) {
      id
      title
      createdAt
      gameVersions {
        nodes {
          gameId
          gameVersionId
          supportsChallenge
          status
        }
      }
    }
  }
`
