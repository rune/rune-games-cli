import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Cursor: any;
  Datetime: string;
}

export interface CheckVerificationInput {
  clientMutationId?: InputMaybe<Scalars['String']>;
  verificationToken: Scalars['String'];
}

export interface CheckVerificationPayload {
  __typename: 'CheckVerificationPayload';
  authToken: Maybe<Scalars['String']>;
  clientMutationId: Maybe<Scalars['String']>;
}

export interface DevTeam {
  __typename: 'DevTeam';
  createdAt: Scalars['Datetime'];
  email: Maybe<Scalars['String']>;
  /** Reads and enables pagination through a set of `Game`. */
  games: GamesConnection;
  handle: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  updatedAt: Scalars['Datetime'];
}


export interface DevTeamGamesArgs {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<GameCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<GamesOrderBy>>;
}

/** A condition to be used against `DevTeam` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export interface DevTeamCondition {
  /** Checks for equality with the object’s `email` field. */
  email?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `handle` field. */
  handle?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']>;
}

/** Represents an update to a `DevTeam`. Fields that are set will be updated. */
export interface DevTeamPatch {
  handle?: InputMaybe<Scalars['String']>;
}

/** A connection to a list of `DevTeam` values. */
export interface DevTeamsConnection {
  __typename: 'DevTeamsConnection';
  /** A list of edges which contains the `DevTeam` and cursor to aid in pagination. */
  edges: Array<DevTeamsEdge>;
  /** A list of `DevTeam` objects. */
  nodes: Array<DevTeam>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `DevTeam` you could get from the connection. */
  totalCount: Scalars['Int'];
}

/** A `DevTeam` edge in the connection. */
export interface DevTeamsEdge {
  __typename: 'DevTeamsEdge';
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']>;
  /** The `DevTeam` at the end of the edge. */
  node: DevTeam;
}

/** Methods to use when ordering `DevTeam`. */
export enum DevTeamsOrderBy {
  EMAIL_ASC = 'EMAIL_ASC',
  EMAIL_DESC = 'EMAIL_DESC',
  HANDLE_ASC = 'HANDLE_ASC',
  HANDLE_DESC = 'HANDLE_DESC',
  ID_ASC = 'ID_ASC',
  ID_DESC = 'ID_DESC',
  NATURAL = 'NATURAL',
  PRIMARY_KEY_ASC = 'PRIMARY_KEY_ASC',
  PRIMARY_KEY_DESC = 'PRIMARY_KEY_DESC'
}

export interface Game {
  __typename: 'Game';
  blurredImgDataUrl: Maybe<Scalars['String']>;
  /** Challenge number that increases every day by 1 at tango.next_challenge_at */
  challengeId: Scalars['Int'];
  /** (Denormalized) Total number of comments . */
  commentCount: Scalars['Int'];
  createdAt: Maybe<Scalars['Datetime']>;
  /** Reads a single `DevTeam` that is related to this `Game`. */
  devTeam: Maybe<DevTeam>;
  devTeamId: Scalars['Int'];
  id: Scalars['Int'];
  /** NULL means that the challenge is disabled. Once enabled, challenge cannot be disabled. */
  nextChallengeAt: Maybe<Scalars['Datetime']>;
  /**
   * Sum of the deprecated game_session table rows
   * with duration longer than 3s
   * as well as the new game_play table rows
   * with duration longer than 3s.
   * Note that the sum exludes game plays longer than 86.4s created between 2022-05-26 and 2022-05-31 due to RUNE-7891.
   */
  playCount: Scalars['Int'];
  title: Scalars['String'];
  updatedAt: Maybe<Scalars['Datetime']>;
}

/** A condition to be used against `Game` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export interface GameCondition {
  /** Checks for equality with the object’s `devTeamId` field. */
  devTeamId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `nextChallengeAt` field. */
  nextChallengeAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `title` field. */
  title?: InputMaybe<Scalars['String']>;
}

/** A connection to a list of `Game` values. */
export interface GamesConnection {
  __typename: 'GamesConnection';
  /** A list of edges which contains the `Game` and cursor to aid in pagination. */
  edges: Array<GamesEdge>;
  /** A list of `Game` objects. */
  nodes: Array<Game>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Game` you could get from the connection. */
  totalCount: Scalars['Int'];
}

/** A `Game` edge in the connection. */
export interface GamesEdge {
  __typename: 'GamesEdge';
  /** A cursor for use in pagination. */
  cursor: Maybe<Scalars['Cursor']>;
  /** The `Game` at the end of the edge. */
  node: Game;
}

/** Methods to use when ordering `Game`. */
export enum GamesOrderBy {
  DEV_TEAM_ID_ASC = 'DEV_TEAM_ID_ASC',
  DEV_TEAM_ID_DESC = 'DEV_TEAM_ID_DESC',
  ID_ASC = 'ID_ASC',
  ID_DESC = 'ID_DESC',
  NATURAL = 'NATURAL',
  NEXT_CHALLENGE_AT_ASC = 'NEXT_CHALLENGE_AT_ASC',
  NEXT_CHALLENGE_AT_DESC = 'NEXT_CHALLENGE_AT_DESC',
  PRIMARY_KEY_ASC = 'PRIMARY_KEY_ASC',
  PRIMARY_KEY_DESC = 'PRIMARY_KEY_DESC',
  TITLE_ASC = 'TITLE_ASC',
  TITLE_DESC = 'TITLE_DESC'
}

/** The root mutation type which contains root level fields which mutate data. */
export interface Mutation {
  __typename: 'Mutation';
  checkVerification: CheckVerificationPayload;
  startVerification: StartVerificationPayload;
  /** Updates a single `DevTeam` using a unique key and a patch. */
  updateDevTeamByEmail: Maybe<UpdateDevTeamPayload>;
  /** Updates a single `DevTeam` using a unique key and a patch. */
  updateDevTeamByHandle: Maybe<UpdateDevTeamPayload>;
  /** Updates a single `DevTeam` using a unique key and a patch. */
  updateDevTeamById: Maybe<UpdateDevTeamPayload>;
}


/** The root mutation type which contains root level fields which mutate data. */
export interface MutationCheckVerificationArgs {
  input: CheckVerificationInput;
}


/** The root mutation type which contains root level fields which mutate data. */
export interface MutationStartVerificationArgs {
  input: StartVerificationInput;
}


/** The root mutation type which contains root level fields which mutate data. */
export interface MutationUpdateDevTeamByEmailArgs {
  input: UpdateDevTeamByEmailInput;
}


/** The root mutation type which contains root level fields which mutate data. */
export interface MutationUpdateDevTeamByHandleArgs {
  input: UpdateDevTeamByHandleInput;
}


/** The root mutation type which contains root level fields which mutate data. */
export interface MutationUpdateDevTeamByIdArgs {
  input: UpdateDevTeamByIdInput;
}

/** Information about pagination in a connection. */
export interface PageInfo {
  __typename: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor: Maybe<Scalars['Cursor']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor: Maybe<Scalars['Cursor']>;
}

/** The root query type which gives access points into the data universe. */
export interface Query {
  __typename: 'Query';
  devTeamByEmail: Maybe<DevTeam>;
  devTeamByHandle: Maybe<DevTeam>;
  devTeamById: Maybe<DevTeam>;
  /** Reads and enables pagination through a set of `DevTeam`. */
  devTeams: Maybe<DevTeamsConnection>;
  gameById: Maybe<Game>;
  gameByTitle: Maybe<Game>;
  /** Reads and enables pagination through a set of `Game`. */
  games: Maybe<GamesConnection>;
  me: DevTeam;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
}


/** The root query type which gives access points into the data universe. */
export interface QueryDevTeamByEmailArgs {
  email: Scalars['String'];
}


/** The root query type which gives access points into the data universe. */
export interface QueryDevTeamByHandleArgs {
  handle: Scalars['String'];
}


/** The root query type which gives access points into the data universe. */
export interface QueryDevTeamByIdArgs {
  id: Scalars['Int'];
}


/** The root query type which gives access points into the data universe. */
export interface QueryDevTeamsArgs {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<DevTeamCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<DevTeamsOrderBy>>;
}


/** The root query type which gives access points into the data universe. */
export interface QueryGameByIdArgs {
  id: Scalars['Int'];
}


/** The root query type which gives access points into the data universe. */
export interface QueryGameByTitleArgs {
  title: Scalars['String'];
}


/** The root query type which gives access points into the data universe. */
export interface QueryGamesArgs {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<GameCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<GamesOrderBy>>;
}

export interface StartVerificationInput {
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
}

export interface StartVerificationPayload {
  __typename: 'StartVerificationPayload';
  clientMutationId: Maybe<Scalars['String']>;
  verificationToken: Scalars['String'];
}

/** All input for the `updateDevTeamByEmail` mutation. */
export interface UpdateDevTeamByEmailInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  /** An object where the defined keys will be set on the `DevTeam` being updated. */
  patch: DevTeamPatch;
}

/** All input for the `updateDevTeamByHandle` mutation. */
export interface UpdateDevTeamByHandleInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  handle: Scalars['String'];
  /** An object where the defined keys will be set on the `DevTeam` being updated. */
  patch: DevTeamPatch;
}

/** All input for the `updateDevTeamById` mutation. */
export interface UpdateDevTeamByIdInput {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  /** An object where the defined keys will be set on the `DevTeam` being updated. */
  patch: DevTeamPatch;
}

/** The output of our update `DevTeam` mutation. */
export interface UpdateDevTeamPayload {
  __typename: 'UpdateDevTeamPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId: Maybe<Scalars['String']>;
  /** The `DevTeam` that was updated by this mutation. */
  devTeam: Maybe<DevTeam>;
  /** An edge for our `DevTeam`. May be used by Relay 1. */
  devTeamEdge: Maybe<DevTeamsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query: Maybe<Query>;
}


/** The output of our update `DevTeam` mutation. */
export interface UpdateDevTeamPayloadDevTeamEdgeArgs {
  orderBy?: InputMaybe<Array<DevTeamsOrderBy>>;
}

export type CheckVerificationMutationVariables = Exact<{
  verificationToken: Scalars['String'];
}>;


export type CheckVerificationMutation = { __typename: 'Mutation', checkVerification: { __typename: 'CheckVerificationPayload', authToken: string | null } };

export type GamesQueryVariables = Exact<{
  condition?: Maybe<GameCondition>;
}>;


export type GamesQuery = { __typename: 'Query', games: { __typename: 'GamesConnection', nodes: Array<{ __typename: 'Game', id: number, title: string }> } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename: 'Query', me: { __typename: 'DevTeam', id: number, handle: string | null, email: string | null } };

export type StartVerificationMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type StartVerificationMutation = { __typename: 'Mutation', startVerification: { __typename: 'StartVerificationPayload', verificationToken: string } };

export type UpdateDevTeamByIdMutationVariables = Exact<{
  id: Scalars['Int'];
  patch: DevTeamPatch;
}>;


export type UpdateDevTeamByIdMutation = { __typename: 'Mutation', updateDevTeamById: { __typename: 'UpdateDevTeamPayload', devTeam: { __typename: 'DevTeam', id: number, handle: string | null } | null } | null };

export type CheckVerificationPayloadKeySpecifier = ('authToken' | 'clientMutationId' | CheckVerificationPayloadKeySpecifier)[];
export type CheckVerificationPayloadFieldPolicy = {
	authToken?: FieldPolicy<any> | FieldReadFunction<any>,
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DevTeamKeySpecifier = ('createdAt' | 'email' | 'games' | 'handle' | 'id' | 'updatedAt' | DevTeamKeySpecifier)[];
export type DevTeamFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	games?: FieldPolicy<any> | FieldReadFunction<any>,
	handle?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DevTeamsConnectionKeySpecifier = ('edges' | 'nodes' | 'pageInfo' | 'totalCount' | DevTeamsConnectionKeySpecifier)[];
export type DevTeamsConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DevTeamsEdgeKeySpecifier = ('cursor' | 'node' | DevTeamsEdgeKeySpecifier)[];
export type DevTeamsEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GameKeySpecifier = ('blurredImgDataUrl' | 'challengeId' | 'commentCount' | 'createdAt' | 'devTeam' | 'devTeamId' | 'id' | 'nextChallengeAt' | 'playCount' | 'title' | 'updatedAt' | GameKeySpecifier)[];
export type GameFieldPolicy = {
	blurredImgDataUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	challengeId?: FieldPolicy<any> | FieldReadFunction<any>,
	commentCount?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	devTeam?: FieldPolicy<any> | FieldReadFunction<any>,
	devTeamId?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	nextChallengeAt?: FieldPolicy<any> | FieldReadFunction<any>,
	playCount?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GamesConnectionKeySpecifier = ('edges' | 'nodes' | 'pageInfo' | 'totalCount' | GamesConnectionKeySpecifier)[];
export type GamesConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GamesEdgeKeySpecifier = ('cursor' | 'node' | GamesEdgeKeySpecifier)[];
export type GamesEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('checkVerification' | 'startVerification' | 'updateDevTeamByEmail' | 'updateDevTeamByHandle' | 'updateDevTeamById' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	checkVerification?: FieldPolicy<any> | FieldReadFunction<any>,
	startVerification?: FieldPolicy<any> | FieldReadFunction<any>,
	updateDevTeamByEmail?: FieldPolicy<any> | FieldReadFunction<any>,
	updateDevTeamByHandle?: FieldPolicy<any> | FieldReadFunction<any>,
	updateDevTeamById?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PageInfoKeySpecifier = ('endCursor' | 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | PageInfoKeySpecifier)[];
export type PageInfoFieldPolicy = {
	endCursor?: FieldPolicy<any> | FieldReadFunction<any>,
	hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>,
	hasPreviousPage?: FieldPolicy<any> | FieldReadFunction<any>,
	startCursor?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('devTeamByEmail' | 'devTeamByHandle' | 'devTeamById' | 'devTeams' | 'gameById' | 'gameByTitle' | 'games' | 'me' | 'query' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	devTeamByEmail?: FieldPolicy<any> | FieldReadFunction<any>,
	devTeamByHandle?: FieldPolicy<any> | FieldReadFunction<any>,
	devTeamById?: FieldPolicy<any> | FieldReadFunction<any>,
	devTeams?: FieldPolicy<any> | FieldReadFunction<any>,
	gameById?: FieldPolicy<any> | FieldReadFunction<any>,
	gameByTitle?: FieldPolicy<any> | FieldReadFunction<any>,
	games?: FieldPolicy<any> | FieldReadFunction<any>,
	me?: FieldPolicy<any> | FieldReadFunction<any>,
	query?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StartVerificationPayloadKeySpecifier = ('clientMutationId' | 'verificationToken' | StartVerificationPayloadKeySpecifier)[];
export type StartVerificationPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	verificationToken?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UpdateDevTeamPayloadKeySpecifier = ('clientMutationId' | 'devTeam' | 'devTeamEdge' | 'query' | UpdateDevTeamPayloadKeySpecifier)[];
export type UpdateDevTeamPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	devTeam?: FieldPolicy<any> | FieldReadFunction<any>,
	devTeamEdge?: FieldPolicy<any> | FieldReadFunction<any>,
	query?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	CheckVerificationPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CheckVerificationPayloadKeySpecifier | (() => undefined | CheckVerificationPayloadKeySpecifier),
		fields?: CheckVerificationPayloadFieldPolicy,
	},
	DevTeam?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DevTeamKeySpecifier | (() => undefined | DevTeamKeySpecifier),
		fields?: DevTeamFieldPolicy,
	},
	DevTeamsConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DevTeamsConnectionKeySpecifier | (() => undefined | DevTeamsConnectionKeySpecifier),
		fields?: DevTeamsConnectionFieldPolicy,
	},
	DevTeamsEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DevTeamsEdgeKeySpecifier | (() => undefined | DevTeamsEdgeKeySpecifier),
		fields?: DevTeamsEdgeFieldPolicy,
	},
	Game?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GameKeySpecifier | (() => undefined | GameKeySpecifier),
		fields?: GameFieldPolicy,
	},
	GamesConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GamesConnectionKeySpecifier | (() => undefined | GamesConnectionKeySpecifier),
		fields?: GamesConnectionFieldPolicy,
	},
	GamesEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GamesEdgeKeySpecifier | (() => undefined | GamesEdgeKeySpecifier),
		fields?: GamesEdgeFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	PageInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PageInfoKeySpecifier | (() => undefined | PageInfoKeySpecifier),
		fields?: PageInfoFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	StartVerificationPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StartVerificationPayloadKeySpecifier | (() => undefined | StartVerificationPayloadKeySpecifier),
		fields?: StartVerificationPayloadFieldPolicy,
	},
	UpdateDevTeamPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UpdateDevTeamPayloadKeySpecifier | (() => undefined | UpdateDevTeamPayloadKeySpecifier),
		fields?: UpdateDevTeamPayloadFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;

export const CheckVerificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CheckVerification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"verificationToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkVerification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"verificationToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"verificationToken"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authToken"}}]}}]}}]} as unknown as DocumentNode<CheckVerificationMutation, CheckVerificationMutationVariables>;
export const GamesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Games"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"condition"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GameCondition"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"games"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"Variable","name":{"kind":"Name","value":"condition"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<GamesQuery, GamesQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const StartVerificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StartVerification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startVerification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verificationToken"}}]}}]}}]} as unknown as DocumentNode<StartVerificationMutation, StartVerificationMutationVariables>;
export const UpdateDevTeamByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDevTeamById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"patch"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DevTeamPatch"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDevTeamById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"patch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"patch"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"devTeam"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateDevTeamByIdMutation, UpdateDevTeamByIdMutationVariables>;