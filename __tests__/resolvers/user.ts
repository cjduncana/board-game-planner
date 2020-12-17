import * as TypeORM from 'typeorm'

import UserEntity from '../../entities/user'
import { CreateUser1607941140537 as CreateUser } from '../../migrations/1607941140537-CreateUser'
import UserRepository from '../../repositories/user'
import { createUser, login } from '../../resolvers/user'
import { CreateUserInput, QueryLoginArgs } from '../../schemas/type-defs.graphqls'

describe('User resolvers', () => {

  beforeAll(async () => {
    await TypeORM.createConnection({
      type: 'mysql',
      database: 'board_game_planner_test',
      username: 'root',
      password: 'mysqlPassword',
      host: '127.0.0.1',
      port: 3311,
      dropSchema: true,
      entities: [UserEntity],
      migrations: [CreateUser],
      migrationsRun: true,
      logging: false,
    })
  })

  afterAll(async () => {
    const connection = TypeORM.getConnection()
    await connection.dropDatabase()
    await connection.close()
  })

  describe('#createUser', () => {

    it('should return a User if the database does not contain the same email', async () => {

      const user = await createUser({}, { input: createUserInput })

      expect(user).toMatchObject({
        id: expect.any(String),
        name: 'John Doe',
        email: 'john.doe@example.com',
      })

      const userRepo = TypeORM.getCustomRepository(UserRepository)
      await userRepo.delete(user.id)
    })

    it('should throw if the user provide an empty name', async () => {

      const error = createUser({}, { input: { ...createUserInput, name: '' } })

      await expect(error).rejects.toThrow('Empty information')
    })

    it('should throw if the user provide an empty email', async () => {

      const error = createUser({}, { input: { ...createUserInput, email: '' } })

      await expect(error).rejects.toThrow('Empty information')
    })

    it('should throw if the user provide an empty password', async () => {

      const error = createUser({}, { input: { ...createUserInput, password: '' } })

      await expect(error).rejects.toThrow('Empty information')
    })

    it('should throw if the database does contain the same email', async () => {

      const userRepo = TypeORM.getCustomRepository(UserRepository)
      const { name, email, password } = createUserInput
      const user = await userRepo.createUser(name, email, password)

      const error = createUser({}, { input: createUserInput })

      await expect(error).rejects.toThrow('Duplicate email address')

      await userRepo.delete(user.id)
    })

    it('should throw if the database throws', async () => {

      const getCustomRepositorySpy = jest.spyOn(TypeORM, 'getCustomRepository')
        .mockImplementation(() => ({
          createUser: (): Promise<void> => Promise.reject(new Error('Error')),
        }))

      const error = createUser({}, { input: createUserInput })

      await expect(error).rejects.toThrow('Error')

      getCustomRepositorySpy.mockRestore()
    })
  })

  describe('#login', () => {

    beforeAll(async () => {
      const userRepo = TypeORM.getCustomRepository(UserRepository)
      const { name, email, password } = createUserInput
      await userRepo.createUser(name, email, password)
    })

    afterAll(async () => {
      const userRepo = TypeORM.getCustomRepository(UserRepository)
      const { email } = createUserInput
      await userRepo.delete({ email })
    })

    it('should return a User and a token if the user gave the correct credentials', async () => {

      const { user, token } = await login({}, queryLoginArgs)

      expect(user).toMatchObject({
        id: expect.any(String),
        name: 'John Doe',
        email: 'john.doe@example.com',
      })

      expect(typeof token).toEqual('string')
    })

    it('should throw if the user provide an empty email', async () => {

      const error = login({}, { ...queryLoginArgs, email: '' })

      await expect(error).rejects.toThrow('Empty information')
    })

    it('should throw if the user provide an empty password', async () => {

      const error = login({}, { ...queryLoginArgs, password: '' })

      await expect(error).rejects.toThrow('Empty information')
    })

    it('should throw if the user provide the wrong email', async () => {

      const error = login({}, { ...queryLoginArgs, email: 'wrong' })

      await expect(error).rejects.toThrow('Invalid email address or password')
    })

    it('should throw if the user provide the wrong password', async () => {

      const error = login({}, { ...queryLoginArgs, password: 'wrong' })

      await expect(error).rejects.toThrow('Invalid email address or password')
    })
  })
})

const queryLoginArgs: QueryLoginArgs = {
  email: 'john.doe@example.com',
  password: 'password',
}

const createUserInput: CreateUserInput = {
  ...queryLoginArgs,
  name: 'John Doe',
}
