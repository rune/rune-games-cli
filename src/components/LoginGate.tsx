import { Text, Box } from "ink"
import SpinnerImport from "ink-spinner/build/index.js"
import { UncontrolledTextInput } from "ink-text-input"
import React, { ReactNode, useState, useEffect, useMemo } from "react"

import { useCheckVerification } from "../gql/useCheckVerification.js"
import { useMe } from "../gql/useMe.js"
import { useStartVerification } from "../gql/useStartVerification.js"
import { useUpdateDevTeamById } from "../gql/useUpdateDevTeamById.js"
import { storage } from "../lib/storage/storage.js"

// @ts-ignore
const Spinner = SpinnerImport.default as typeof SpinnerImport

const checkVerificationEvery = 2000

export function LoginGate({ children }: { children?: ReactNode }) {
  const [authToken, setAuthToken] = useState(() => storage.get("authToken"))
  const { me, meLoading } = useMe({ skip: !authToken })
  const [email, setEmail] = useState("")
  const [newHandle, setNewHandle] = useState("")
  const { startVerification, startVerificationLoading, verificationToken } =
    useStartVerification()
  const {
    checkVerification,
    checkVerificationLoading,
    authToken: newAuthToken,
  } = useCheckVerification()
  const { updateDevTeamById, updateDevTeamByIdLoading } = useUpdateDevTeamById()

  const sanitizedEmail = useMemo(() => email.trim().toLowerCase(), [email])

  useEffect(() => {
    if (sanitizedEmail) startVerification({ email: sanitizedEmail })
  }, [sanitizedEmail, startVerification])

  useEffect(() => {
    if (verificationToken && !authToken && !checkVerificationLoading) {
      const handle = setTimeout(() => {
        checkVerification({ verificationToken })
      }, checkVerificationEvery)

      return () => clearTimeout(handle)
    }
  }, [
    authToken,
    checkVerification,
    checkVerificationLoading,
    verificationToken,
  ])

  useEffect(() => {
    if (newAuthToken) {
      storage.set("authToken", newAuthToken)
      setAuthToken(newAuthToken)
    }
  }, [newAuthToken])

  useEffect(() => {
    if (me && newHandle) {
      updateDevTeamById({ id: me.id, patch: { handle: newHandle } })
    }
  }, [me, newHandle, updateDevTeamById])

  // todo: list steps + completed, use Static?

  if (meLoading) {
    return (
      <Text>
        Checking authorization <Spinner />
      </Text>
    )
  }

  if (me?.handle) {
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

  if (me) {
    return (
      <Box flexDirection="column">
        <Text>
          It looks like you’re creating a dev account for the first time. Please
          enter you handle
        </Text>
        {updateDevTeamByIdLoading ? (
          <Text>
            Setting the handle <Spinner />
          </Text>
        ) : (
          <Box>
            <Text>Handle: </Text>
            <UncontrolledTextInput
              placeholder="coolDev"
              initialValue={newHandle}
              onSubmit={setNewHandle}
            />
          </Box>
        )}
      </Box>
    )
  }

  if (verificationToken && !authToken) {
    return (
      <Text>
        An email was sent to `{email}`, click the link inside to proceed{" "}
        <Spinner />
      </Text>
    )
  }

  return (
    <Box flexDirection="column">
      <Text>Enter your email to log in or create a dev account</Text>
      {startVerificationLoading ? (
        <Text>
          Sending email <Spinner />
        </Text>
      ) : (
        <Box>
          <Text>Email: </Text>
          <UncontrolledTextInput
            placeholder="email@example.com"
            initialValue={email}
            onSubmit={setEmail}
          />
        </Box>
      )}
    </Box>
  )
}
