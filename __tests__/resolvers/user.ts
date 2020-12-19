import * as TypeORM from 'typeorm'

import getMockUser from '../../entities/__mocks__/user'
import UserEntity from '../../entities/user'
import UserRepository from '../../repositories/user'
import { createUser, login } from '../../resolvers/user'
import { CreateUserInput, QueryLoginArgs } from '../../schemas/type-defs.graphqls'
import { closeConnection, createConnection } from '../../utils/testHelpers'

describe('User resolvers', () => {

  let mockUser: UserEntity
  let userRepo: UserRepository

  beforeAll(async () => {
    await createConnection()
    userRepo = TypeORM.getCustomRepository(UserRepository)
    mockUser = getMockUser()
  })

  afterAll(closeConnection)

  describe('#createUser', () => {

    it('should return a new User if the database does not contain the same email', async () => {

      const user = await createUser({}, { input: createUserInput })

      expect(user).toMatchObject({
        id: expect.any(String),
        name: 'John Doe',
        email: 'john.doe@example.com',
      })

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

      const user = await userRepo.save(mockUser)

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

    beforeAll(() => userRepo.save(mockUser))

    afterAll(() => userRepo.delete(mockUser.id))

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
