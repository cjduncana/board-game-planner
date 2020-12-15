import { Context } from '../lib/context'
import { QueryResolvers } from '../schemas/type-defs.graphqls'
import { boardGames } from './boardGame'

const Query: Required<QueryResolvers<Context>> = {
  boardGames,
}

export default { Query }
