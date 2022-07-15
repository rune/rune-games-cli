import { useQuery, gql } from "@apollo/client/index.js"
import { Box, Text, Spacer } from "ink"
import React from "react"

import { GamesDocument } from "../generated/types.js"

export function List() {
  const { data } = useQuery(GamesDocument)

  return (
    <Box>
      <Box
        paddingX={4}
        paddingY={1}
        borderStyle="round"
        borderColor="green"
        flexDirection="column"
      >
        {data?.games?.nodes.map((game) => (
          <Text key={game.id}>- {game.title}</Text>
        ))}
      </Box>
      <Spacer />
    </Box>
  )
}

gql`
  query Games {
    games {
      nodes {
        id
        title
      }
    }
  }
`
