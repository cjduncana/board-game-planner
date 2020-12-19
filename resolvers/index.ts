import { Context } from '../lib/context'
import { MutationResolvers, QueryResolvers } from '../schemas/type-defs.graphqls'
import { boardGames } from './boardGame'
import { createEvent } from './event'
import { createUser, login } from './user'

const Query: Required<QueryResolvers<Context>> = {
  boardGames,
  login,
}

const Mutation: Required<MutationResolvers<Context>> = {
  createEvent,
  createUser,
}

export default { Mutation, Query }
