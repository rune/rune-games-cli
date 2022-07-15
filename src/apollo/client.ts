import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/index.js"
import { setContext } from "@apollo/client/link/context/index.js"
import fetch from "cross-fetch"

import { packageJson } from "../lib/packageJson.js"

export const client = new ApolloClient({
  link: setContext(async () => ({
    headers: {
      "X-Client-Version": packageJson.version,
      // todo: auth
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZfaWQiOjIsInJvbGUiOiJkZXYiLCJpYXQiOjE2NTc3OTYxNzMsImV4cCI6MTY4OTM1Mzc3M30.3BO2mD2vGrhjXpN5HA7WT67VhFdjXWcc-Af5yaGCYLQ`,
    },
  })).concat(
    new HttpLink({
      // todo: production
      uri: "https://localhost:3000/dev-graphql",
      fetch,
    })
  ),
  // todo: typePolicies
  cache: new InMemoryCache(),
})
