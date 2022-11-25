import { Text } from "ink"
import React from "react"

export function renderErrorCodeLine({
  code,
  line,
  column,
  endLine,
  endColumn,
}: {
  code: string
  line: number
  column: number
  endLine?: number
  endColumn?: number
}) {
  const content = code.split("\n").at(line - 1)

  if (!content) return null

  endColumn = endLine === line ? endColumn ?? column : content?.length

  return (
    <Text color="cyan">
      {line}:{column} {content.slice(0, column - 1)}
      <Text backgroundColor="red">
        {content.slice(column - 1, endColumn - 1)}
      </Text>
      {content.slice(endColumn - 1)}
    </Text>
  )
}
