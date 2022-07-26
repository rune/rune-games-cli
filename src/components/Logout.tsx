import { Text } from "ink"
import React, { useEffect } from "react"

import { storage } from "../lib/storage/storage.js"

export function Logout() {
  const loggedIn = !!storage.get("authToken")

  useEffect(() => {
    if (loggedIn) storage.delete("authToken")
  }, [loggedIn])

  return <Text>{loggedIn ? "Logged out!" : "Not logged in"}</Text>
}
