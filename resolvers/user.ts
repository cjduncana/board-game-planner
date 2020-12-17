import { UserInputError } from 'apollo-server-micro'
import { getCustomRepository } from 'typeorm'

import UserRepository from '../repositories/user'
import { MutationCreateUserArgs, User } from '../schemas/type-defs.graphqls'

export function createUser<Parent>(
  _parent: Parent,
  { input }: MutationCreateUserArgs,
): Promise<User> {

  if (!input.name || !input.email || !input.password) {
    throw new UserInputError('Empty information', input)
  }

  return getCustomRepository(UserRepository)
    .createUser(input.name, input.email, input.password)
    .catch((error) => {

      if (error.code === 'ER_DUP_ENTRY') {
        throw new UserInputError('Duplicate email address', input)
      }

      throw error
    })
}
