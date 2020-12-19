import * as TypeORM from 'typeorm'

module.exports = async (): Promise<void> => {
  const connection = TypeORM.getConnection()
  await connection.dropDatabase()
  return connection.close()
}
