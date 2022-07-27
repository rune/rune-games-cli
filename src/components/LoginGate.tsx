import { Text, Box } from "ink"
import React, { ReactNode } from "react"

import { Login } from "../flows/Login.js"
import { useMe } from "../gql/useMe.js"

export function LoginGate({ children }: { children: ReactNode }) {
  const { me } = useMe()

  if (!me?.handle) return <Login />

  return (
    <Box flexDirection="column">
      {children}
      <Box paddingTop={1}>
        <Text dimColor>
          Logged in as `{me.handle}` ({me.email})
        </Text>
      </Box>
    </Box>
  )
}
