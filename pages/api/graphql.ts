import { ApolloServer } from 'apollo-server-micro'
import type { PageConfig } from 'next'

import { schema } from '../../lib/schema'

const apolloServer = new ApolloServer({ schema })

export const config: PageConfig = { api: { bodyParser: false } }

export default apolloServer.createHandler({ path: '/api/graphql' })
