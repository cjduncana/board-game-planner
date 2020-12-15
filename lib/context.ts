import {
  ApolloServerPlugin,
  GraphQLServiceContext,
  GraphQLServerListener,
} from 'apollo-server-plugin-base'
import { Connection, getConnectionManager } from 'typeorm'

export interface Context {
  connection: Connection
}

export function createContext(): Context {
  const connectionManager = getConnectionManager()
  return { connection: connectionManager.get(CONNECTION_NAME) }
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
  }).connect()
}
