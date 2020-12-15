import { ApolloServer } from 'apollo-server-micro'
import type { PageConfig } from 'next'

import { closeConnectionPlugin, createContext } from '../../lib/context'
import { schema } from '../../lib/schema'

const apolloServer = new ApolloServer({
  context: createContext,
  plugins: [closeConnectionPlugin],
  schema,
})

export const config: PageConfig = { api: { bodyParser: false } }

export default apolloServer.createHandler({ path: '/api/graphql' })
