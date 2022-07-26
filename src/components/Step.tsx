import { Box, Text } from "ink"
import SpinnerImport from "ink-spinner"
import React, { ReactNode } from "react"

// @ts-ignore
export const Spinner = SpinnerImport.default as typeof SpinnerImport

export function Step({
  status,
  render,
}: {
  status: "skip" | "in-progress" | "waiting" | "success" | "error"
  render: {
    [K in Exclude<typeof status, "skip">]?: () => {
      label: string | null
      view?: ReactNode
    }
  }
}) {
  if (status === "skip") return null

  const content = render[status]

  if (!content) return null

  const { label, view } = content()

  return (
    <Box flexDirection="column">
      <Box>
        <Text
          color={
            status === "success"
              ? "green"
              : status === "error"
              ? "red"
              : "yellow"
          }
        >
          {status === "waiting" ? (
            <>
              <Spinner />
              &nbsp;
            </>
          ) : (
            <Text>
              {status === "success" ? "✓" : status === "error" ? "✖" : "•"}
              &nbsp;
            </Text>
          )}
          {label}
        </Text>
      </Box>
      <Box paddingLeft={2}>{view}</Box>
    </Box>
  )
}
