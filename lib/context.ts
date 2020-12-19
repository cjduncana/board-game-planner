import { IncomingMessage } from 'http'

import {
  ApolloServerPlugin,
  GraphQLServiceContext,
  GraphQLServerListener,
} from 'apollo-server-plugin-base'
import jwt from 'jsonwebtoken'
import { Connection, getConnectionManager } from 'typeorm'

import Event from '../entities/event'
import User from '../entities/user'

export interface Context {
  userId?: string
}

export function createContext({ req }: { req: IncomingMessage }): Context {
  return { userId: getUserId(req.headers.authorization) }
}

const CONNECTION_NAME = 'default'

export const closeConnectionPlugin: ApolloServerPlugin = {
  serverWillStart: async (service: GraphQLServiceContext): Promise<GraphQLServerListener> => {

    service.logger.info('Connecting to the database')

    const connection = await getConnection()

    service.logger.info('Database connected')

    return {
      serverWillStop: (): Promise<void> => {

        service.logger.info('Disconnecting the database')

        return connection.close()
      },
    }
  },
}

function getConnection(): Promise<Connection> {
  const connectionManager = getConnectionManager()

  if (connectionManager.has(CONNECTION_NAME)) {
    return Promise.resolve(connectionManager.get(CONNECTION_NAME))
  }

  return connectionManager.create({
    name: CONNECTION_NAME,
    type: 'mysql',
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
    entities: [Event, User],
  }).connect()
}

function getUserId(token?: string): string | undefined {
  if (!token) {
    return undefined
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)

    if (typeof decoded !== 'string') {
      return (decoded as { sub?: string }).sub
    }

    return undefined
  } catch (error) {
    return undefined
  }
}
