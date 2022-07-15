import {
  FieldPolicy,
  FieldReadFunction,
  TypePolicies,
  TypePolicy,
} from "@apollo/client/cache"
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core"
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Cursor: any
  Datetime: string
}

export interface Game {
  __typename: "Game"
  blurredImgDataUrl: Maybe<Scalars["String"]>
  /** Challenge number that increases every day by 1 at tango.next_challenge_at */
  challengeId: Scalars["Int"]
  /** (Denormalized) Total number of comments . */
  commentCount: Scalars["Int"]
  createdAt: Maybe<Scalars["Datetime"]>
  devTeamId: Scalars["Int"]
  id: Scalars["Int"]
  /** NULL means that the challenge is disabled. Once enabled, challenge cannot be disabled. */
  nextChallengeAt: Maybe<Scalars["Datetime"]>
  /**
   * Sum of the deprecated game_session table rows
   * with duration longer than 3s
   * as well as the new game_play table rows
   * with duration longer than 3s.
   * Note that the sum exludes game plays longer than 86.4s created between 2022-05-26 and 2022-05-31 due to RUNE-7891.
   */
  playCount: Scalars["Int"]
  title: Scalars["String"]
  updatedAt: Maybe<Scalars["Datetime"]>
}

/** A condition to be used against `Game` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export interface GameCondition {
  /** Checks for equality with the object’s `devTeamId` field. */
  devTeamId?: InputMaybe<Scalars["Int"]>
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars["Int"]>
  /** Checks for equality with the object’s `nextChallengeAt` field. */
  nextChallengeAt?: InputMaybe<Scalars["Datetime"]>
  /** Checks for equality with the object’s `title` field. */
  title?: InputMaybe<Scalars["String"]>
}

/** A connection to a list of `Game` values. */
export interface GamesConnection {
  __typename: "GamesConnection"
  /** A list of edges which contains the `Game` and cursor to aid in pagination. */
  edges: Array<GamesEdge>
  /** A list of `Game` objects. */
  nodes: Array<Game>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `Game` you could get from the connection. */
  totalCount: Scalars["Int"]
}

/** A `Game` edge in the connection. */
export interface GamesEdge {
  __typename: "GamesEdge"
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars["Cursor"]>
  /** The `Game` at the end of the edge. */
  node: Game
}

/** Methods to use when ordering `Game`. */
export enum GamesOrderBy {
  DEV_TEAM_ID_ASC = "DEV_TEAM_ID_ASC",
  DEV_TEAM_ID_DESC = "DEV_TEAM_ID_DESC",
  ID_ASC = "ID_ASC",
  ID_DESC = "ID_DESC",
  NATURAL = "NATURAL",
  NEXT_CHALLENGE_AT_ASC = "NEXT_CHALLENGE_AT_ASC",
  NEXT_CHALLENGE_AT_DESC = "NEXT_CHALLENGE_AT_DESC",
  PRIMARY_KEY_ASC = "PRIMARY_KEY_ASC",
  PRIMARY_KEY_DESC = "PRIMARY_KEY_DESC",
  TITLE_ASC = "TITLE_ASC",
  TITLE_DESC = "TITLE_DESC",
}

/** Information about pagination in a connection. */
export interface PageInfo {
  __typename: "PageInfo"
  /** When paginating forwards, the cursor to continue. */
  endCursor: Maybe<Scalars["Cursor"]>
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars["Boolean"]
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars["Boolean"]
  /** When paginating backwards, the cursor to continue. */
  startCursor: Maybe<Scalars["Cursor"]>
}

/** The root query type which gives access points into the data universe. */
export interface Query {
  __typename: "Query"
  gameById: Maybe<Game>
  gameByTitle: Maybe<Game>
  /** Reads and enables pagination through a set of `Game`. */
  games: Maybe<GamesConnection>
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query
}

/** The root query type which gives access points into the data universe. */
export interface QueryGameByIdArgs {
  id: Scalars["Int"]
}

/** The root query type which gives access points into the data universe. */
export interface QueryGameByTitleArgs {
  title: Scalars["String"]
}

/** The root query type which gives access points into the data universe. */
export interface QueryGamesArgs {
  after?: InputMaybe<Scalars["Cursor"]>
  before?: InputMaybe<Scalars["Cursor"]>
  condition?: InputMaybe<GameCondition>
  first?: InputMaybe<Scalars["Int"]>
  last?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  orderBy?: InputMaybe<Array<GamesOrderBy>>
}

export type GamesQueryVariables = Exact<{ [key: string]: never }>

export type GamesQuery = {
  __typename: "Query"
  games: {
    __typename: "GamesConnection"
    nodes: Array<{ __typename: "Game"; id: number; title: string }>
  } | null
}

export type GameKeySpecifier = (
  | "blurredImgDataUrl"
  | "challengeId"
  | "commentCount"
  | "createdAt"
  | "devTeamId"
  | "id"
  | "nextChallengeAt"
  | "playCount"
  | "title"
  | "updatedAt"
  | GameKeySpecifier
)[]
export type GameFieldPolicy = {
  blurredImgDataUrl?: FieldPolicy<any> | FieldReadFunction<any>
  challengeId?: FieldPolicy<any> | FieldReadFunction<any>
  commentCount?: FieldPolicy<any> | FieldReadFunction<any>
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>
  devTeamId?: FieldPolicy<any> | FieldReadFunction<any>
  id?: FieldPolicy<any> | FieldReadFunction<any>
  nextChallengeAt?: FieldPolicy<any> | FieldReadFunction<any>
  playCount?: FieldPolicy<any> | FieldReadFunction<any>
  title?: FieldPolicy<any> | FieldReadFunction<any>
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
}
export type GamesConnectionKeySpecifier = (
  | "edges"
  | "nodes"
  | "pageInfo"
  | "totalCount"
  | GamesConnectionKeySpecifier
)[]
export type GamesConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>
  nodes?: FieldPolicy<any> | FieldReadFunction<any>
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>
}
export type GamesEdgeKeySpecifier = (
  | "cursor"
  | "node"
  | GamesEdgeKeySpecifier
)[]
export type GamesEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>
  node?: FieldPolicy<any> | FieldReadFunction<any>
}
export type PageInfoKeySpecifier = (
  | "endCursor"
  | "hasNextPage"
  | "hasPreviousPage"
  | "startCursor"
  | PageInfoKeySpecifier
)[]
export type PageInfoFieldPolicy = {
  endCursor?: FieldPolicy<any> | FieldReadFunction<any>
  hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>
  hasPreviousPage?: FieldPolicy<any> | FieldReadFunction<any>
  startCursor?: FieldPolicy<any> | FieldReadFunction<any>
}
export type QueryKeySpecifier = (
  | "gameById"
  | "gameByTitle"
  | "games"
  | "query"
  | QueryKeySpecifier
)[]
export type QueryFieldPolicy = {
  gameById?: FieldPolicy<any> | FieldReadFunction<any>
  gameByTitle?: FieldPolicy<any> | FieldReadFunction<any>
  games?: FieldPolicy<any> | FieldReadFunction<any>
  query?: FieldPolicy<any> | FieldReadFunction<any>
}
export type StrictTypedTypePolicies = {
  Game?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?: false | GameKeySpecifier | (() => undefined | GameKeySpecifier)
    fields?: GameFieldPolicy
  }
  GamesConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | GamesConnectionKeySpecifier
      | (() => undefined | GamesConnectionKeySpecifier)
    fields?: GamesConnectionFieldPolicy
  }
  GamesEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | GamesEdgeKeySpecifier
      | (() => undefined | GamesEdgeKeySpecifier)
    fields?: GamesEdgeFieldPolicy
  }
  PageInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | PageInfoKeySpecifier
      | (() => undefined | PageInfoKeySpecifier)
    fields?: PageInfoFieldPolicy
  }
  Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | QueryKeySpecifier
      | (() => undefined | QueryKeySpecifier)
    fields?: QueryFieldPolicy
  }
}
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies

export const GamesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Games" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "games" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "nodes" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GamesQuery, GamesQueryVariables>
