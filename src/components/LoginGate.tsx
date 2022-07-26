import { Text, Box } from "ink"
import { UncontrolledTextInput } from "ink-text-input"
import React, { ReactNode, useState, useEffect, useMemo } from "react"

import { useCheckVerification } from "../gql/useCheckVerification.js"
import { useMe } from "../gql/useMe.js"
import { useStartVerification } from "../gql/useStartVerification.js"
import { useUpdateDevTeamById } from "../gql/useUpdateDevTeamById.js"
import { storage } from "../lib/storage/storage.js"

import { Step } from "./Step.js"

const checkVerificationEvery = 2000
const alreadyHasAuthToken = !!storage.get("authToken")

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
  const {
    updateDevTeamById,
    updateDevTeamByIdLoading,
    updateDevTeamByIdError,
  } = useUpdateDevTeamById()

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

  if (alreadyHasAuthToken && meLoading) {
    return (
      <Step
        status="waiting"
        render={{ waiting: () => ({ label: "Checking authorization" }) }}
      />
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

  return (
    <Box flexDirection="column">
      <Step
        status={
          alreadyHasAuthToken
            ? "skip"
            : verificationToken
            ? "success"
            : startVerificationLoading
            ? "waiting"
            : "in-progress"
        }
        render={{
          "in-progress": () => ({
            label: "Enter your email to login or create a new account",
            view: (
              <Box>
                <Text>Email: </Text>
                <UncontrolledTextInput
                  placeholder="email@example.com"
                  initialValue={email}
                  onSubmit={setEmail}
                />
              </Box>
            ),
          }),
          waiting: () => ({ label: "Sending an email" }),
          success: () => ({ label: "Email sent" }),
        }}
      />
      <Step
        status={
          alreadyHasAuthToken
            ? "skip"
            : verificationToken && !authToken
            ? "waiting"
            : verificationToken && authToken
            ? "success"
            : "skip"
        }
        render={{
          waiting: () => ({
            label: `An email was sent to \`${email}\`, click the link inside to proceed`,
          }),
          success: () => ({ label: "Email confirmed" }),
        }}
      />
      <Step
        status={
          meLoading || updateDevTeamByIdLoading
            ? "waiting"
            : me && me.handle
            ? "success"
            : updateDevTeamByIdError
            ? "error"
            : me
            ? "in-progress"
            : "skip"
        }
        render={{
          waiting: () => ({
            label: meLoading
              ? "Checking authorization"
              : updateDevTeamByIdLoading
              ? "Setting your handle"
              : null,
          }),
          success: () => ({ label: "You’re all set!" }),
          "in-progress": () => ({
            label:
              "It looks like you’re creating a dev account for the first time. Please enter you handle",
            view: (
              <Box>
                <Text>Handle: </Text>
                <UncontrolledTextInput
                  placeholder="coolDev"
                  initialValue={newHandle}
                  onSubmit={setNewHandle}
                />
              </Box>
            ),
          }),
          error: () => ({
            label: updateDevTeamByIdError?.message.includes(
              "dev_team_handle_check"
            )
              ? "Invalid characters in the handle"
              : "Something went wrong",
          }),
        }}
      />
    </Box>
  )
}
