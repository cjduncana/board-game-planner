import { ResolverContext } from '../lib/apollo'
import { QueryResolvers } from '../schemas/type-defs.graphqls'
import { boardGames } from './boardGame'

const Query: Required<QueryResolvers<ResolverContext>> = {
  boardGames,
}

export default { Query }
