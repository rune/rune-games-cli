import React, { useEffect } from "react"

import { storage } from "../lib/storage/storage.js"

import { Step } from "./Step.js"

export function Logout() {
  const loggedIn = !!storage.get("authToken")

  useEffect(() => {
    if (loggedIn) storage.delete("authToken")
  }, [loggedIn])

  return (
    <Step
      status={loggedIn ? "success" : "error"}
      render={{
        success: () => ({ label: "Logged out successfully!" }),
        error: () => ({ label: "You’re not logged in" }),
      }}
    />
  )
}
