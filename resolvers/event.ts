import { AuthenticationError, UserInputError } from 'apollo-server-micro'
import { DateTime } from 'luxon'
import { getCustomRepository, getRepository } from 'typeorm'

import EventEntity from '../entities/event'
import { Context } from '../lib/context'
import UserRepository from '../repositories/user'
import {
  Event,
  MutationCreateEventArgs,
} from '../schemas/type-defs.graphqls'
import { fetchBoardGamesById } from '../utils/boardGameGeek'

export async function createEvent<Parent>(
  _parent: Parent,
  { input }: MutationCreateEventArgs,
  { userId }: Context
): Promise<Event> {

  if (!userId) {
    throw new AuthenticationError('Invalid credentials')
  }

  const userRepo = getCustomRepository(UserRepository)
  const user = await userRepo.findOne(userId)

  if (!user) {
    throw new AuthenticationError('Invalid credentials')
  }

  if (!input.startTime || !input.latitude || !input.longitude) {
    throw new UserInputError('Empty information', input)
  }

  const startTime = DateTime.fromISO(input.startTime)

  if (startTime.invalidExplanation) {
    throw new UserInputError(startTime.invalidExplanation, input)
  }

  const boardGames = await fetchBoardGamesById(input.gameIds)

  const eventRepo = getRepository(EventEntity)
  const event = await eventRepo.save({
    ...input,
    creator: user,
    players: [user],
    gameIds: boardGames.map(({ id }) => id),
    startTime: startTime.toJSDate(),
  })

  return {
    ...event,
    games: boardGames,
    startTime: input.startTime,
    location: input,
  }
}
