import { Context } from '../lib/context'
import { MutationResolvers, QueryResolvers } from '../schemas/type-defs.graphqls'
import { boardGames } from './boardGame'
import { createUser, login } from './user'

const Query: Required<QueryResolvers<Context>> = {
  boardGames,
  login,
}

const Mutation: Required<MutationResolvers<Context>> = {
  createUser,
}

export default { Mutation, Query }
