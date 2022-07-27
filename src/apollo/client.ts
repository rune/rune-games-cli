import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/index.js"
import { setContext } from "@apollo/client/link/context/index.js"
import fetch from "cross-fetch"

import { packageJson } from "../lib/packageJson.js"
import { storage } from "../lib/storage/storage.js"

export const client = new ApolloClient({
  link: setContext(() => {
    const authToken = storage.get("authToken")

    return {
      headers: {
        "X-Client-Version": packageJson.version,
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
      },
    }
  }).concat(
    new HttpLink({
      // todo: production
      uri: "http://localhost:3000/dev/graphql",
      fetch,
    })
  ),
  // todo: typePolicies
  cache: new InMemoryCache(),
})
