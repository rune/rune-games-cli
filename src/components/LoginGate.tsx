import { Text, Box } from "ink"
import { UncontrolledTextInput } from "ink-text-input"
import React, { ReactNode, useState, useEffect, useMemo } from "react"

import { useCheckVerification } from "../gql/useCheckVerification.js"
import { useMe } from "../gql/useMe.js"
import { useStartVerification } from "../gql/useStartVerification.js"
import { useUpdateDevTeamById } from "../gql/useUpdateDevTeamById.js"
import { formatError } from "../lib/formatError.js"
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

  const sanitizedNewHandle = newHandle.trim()

  useEffect(() => {
    if (me && sanitizedNewHandle) {
      updateDevTeamById({ id: me.id, patch: { handle: sanitizedNewHandle } })
    }
  }, [me, sanitizedNewHandle, updateDevTeamById])

  if (alreadyHasAuthToken && meLoading) {
    return <Step status="waiting" label="Checking authorization" />
  }

  if (me?.handle && children) {
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
      {!alreadyHasAuthToken && (
        <>
          <Step
            status={
              verificationToken
                ? "success"
                : startVerificationLoading
                ? "waiting"
                : "in-progress"
            }
            label={(status) =>
              status === "success"
                ? "Email sent"
                : status === "waiting"
                ? "Sending verification email"
                : "Enter your email to login or create a new account"
            }
            view={(status) =>
              status === "in-progress" && (
                <Box>
                  <Text>Email: </Text>
                  <UncontrolledTextInput
                    placeholder="email@example.com"
                    initialValue={email}
                    onSubmit={setEmail}
                  />
                </Box>
              )
            }
          />
          {!!verificationToken && (
            <Step
              status={authToken ? "success" : "waiting"}
              label={(status) =>
                status === "success"
                  ? "Email confirmed"
                  : `An email was sent to \`${sanitizedEmail}\`, please open it and click the link inside to proceed`
              }
            />
          )}
        </>
      )}

      {authToken && (
        <Step
          status={
            me?.handle
              ? "success"
              : updateDevTeamByIdLoading || meLoading
              ? "waiting"
              : "in-progress"
          }
          label={(status) =>
            status === "success"
              ? `You’re logged in successfully as \`${me?.handle}\`!`
              : status === "waiting"
              ? updateDevTeamByIdLoading
                ? "Setting your handle"
                : "Checking authorization"
              : "To finish setting up your account, please enter your desired handle"
          }
          view={(status) =>
            (status === "in-progress" || updateDevTeamByIdError) && (
              <Box flexDirection="column">
                {updateDevTeamByIdError && (
                  <Text color="red">
                    {formatError(updateDevTeamByIdError, {
                      'violates check constraint "dev_team_handle_check"':
                        "Invalid input, try a different handle",
                      'violates unique constraint "dev_team_handle_key"':
                        "This handle is already taken, please choose another",
                      default: "Something went wrong",
                    })}
                  </Text>
                )}
                <Box>
                  <Text>Handle: </Text>
                  <UncontrolledTextInput
                    placeholder="coolDev"
                    initialValue={newHandle}
                    onSubmit={setNewHandle}
                  />
                </Box>
              </Box>
            )
          }
        />
      )}
    </Box>
  )
}
