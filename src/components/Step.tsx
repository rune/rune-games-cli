import { Box, Text } from "ink"
import SpinnerImport from "ink-spinner"
import React, { ReactNode } from "react"

// @ts-ignore
const Spinner = SpinnerImport.default as typeof SpinnerImport

type StepStatus = "in-progress" | "waiting" | "success" | "error"

export function Step({
  status,
  label,
  view,
}: {
  status: StepStatus
  label: string | ((status: StepStatus) => string)
  view?: ReactNode | ((status: StepStatus) => ReactNode)
}) {
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
          {typeof label === "function" ? label(status) : label}
        </Text>
      </Box>
      <Box paddingLeft={2}>
        {typeof view === "function" ? view(status) : view}
      </Box>
    </Box>
  )
}
