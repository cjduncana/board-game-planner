import { UserInputError } from 'apollo-server-micro'
import jwt from 'jsonwebtoken'
import { getCustomRepository } from 'typeorm'

import UserRepository from '../repositories/user'
import {
  LoginResult,
  MutationCreateUserArgs,
  QueryLoginArgs,
  User,
} from '../schemas/type-defs.graphqls'

export function createUser<Parent>(
  _parent: Parent,
  { input }: MutationCreateUserArgs,
): Promise<User> {

  if (!input.name || !input.email || !input.password) {
    throw new UserInputError('Empty information', input)
  }

  // TODO: Turn into an async function
  return getCustomRepository(UserRepository)
    .createUser(input.name, input.email, input.password)
    .catch((error) => {

      if (error.code === 'ER_DUP_ENTRY') {
        throw new UserInputError('Duplicate email address', input)
      }

      throw error
    })
}

export async function login<Parent>(_parent: Parent, args: QueryLoginArgs): Promise<LoginResult> {

  if (!args.email || !args.password) {
    throw new UserInputError('Empty information', args)
  }

  const userRepo = getCustomRepository(UserRepository)

  try {
    const user = await userRepo.validate(args.email, args.password)

    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET as string)

    return { user, token }
  } catch (error) {
    throw new UserInputError('Invalid email address or password', args)
  }
}
