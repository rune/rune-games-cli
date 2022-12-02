import { validationOptions } from "./validateGameFiles"

export function extractMultiplayerMetadata(logicJsContent: string) {
  const minPlayersString = logicJsContent
    .match(validationOptions.metadataRegexes.minPlayers)
    ?.at(1)
  const minPlayers = minPlayersString ? parseInt(minPlayersString) : undefined

  const maxPlayersString = logicJsContent
    .match(validationOptions.metadataRegexes.maxPlayers)
    ?.at(1)
  const maxPlayers = maxPlayersString ? parseInt(maxPlayersString) : undefined

  const handlesPlayerJoined =
    validationOptions.metadataRegexes.playerJoined.test(logicJsContent)

  const handlesPlayerLeft =
    validationOptions.metadataRegexes.playerLeft.test(logicJsContent)

  return {
    minPlayers,
    maxPlayers,
    handlesPlayerJoined,
    handlesPlayerLeft,
  }
}
