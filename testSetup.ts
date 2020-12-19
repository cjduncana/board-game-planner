import { createConnection } from './utils/testHelpers'

module.exports = async (): Promise<void> => {
  const connection = await createConnection()
  await connection.runMigrations()
}
