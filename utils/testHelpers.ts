import { FetchResult, GraphQLRequest as OriginalGraphQLRequest } from '@apollo/client'
import { MockedResponse as OriginalMockedResponse } from '@apollo/client/testing'
import {
  Annotations as OriginalAnnotations,
  ArgType as OriginalArgType,
  BaseMeta,
} from '@storybook/addons'
import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types'
import fetchMock from 'fetch-mock'
import { Rule, StyleSheet } from 'jss'
import TestRenderer from 'react-test-renderer'
import * as TypeORM from 'typeorm'

import { boardGameById, itemWrapper } from '../__mocks__/xml'
import EventEntity from '../entities/event'
import UserEntity from '../entities/user'
import { CreateUser1607941140537 } from '../migrations/1607941140537-CreateUser'
import { CreateEvent1608194761978 } from '../migrations/1608194761978-CreateEvent'
import Url from '../utils/urls'

export function createConnection(): Promise<TypeORM.Connection> {
  return TypeORM.createConnection({
    type: 'mysql',
    database: 'board_game_planner_test',
    username: 'root',
    password: 'mysqlPassword',
    host: '127.0.0.1',
    port: 3311,
    entities: [
      EventEntity,
      UserEntity,
    ],
    migrations: [
      CreateUser1607941140537,
      CreateEvent1608194761978,
    ],
  })
}

export function closeConnection(): Promise<void> {
  return TypeORM.getConnection().close()
}

export function addBoardGameThingMock(mock: fetchMock.FetchMockStatic): fetchMock.FetchMockStatic {
  return mock
    .mock({
      method: 'GET',
      url: `begin:${Url.BOARD_GAME_THING}`,
      response: (url) => {
        const boardGames = url
          .replace(`${Url.BOARD_GAME_THING}?id=`, '')
          .split(',')
          .reduce((acc, id) => {
            const boardGame = boardGameById[id]
            return boardGame ? [...acc, boardGame] : acc
          }, [] as string[])

        return itemWrapper(boardGames.join('\n'))
      },
    })
}

interface ArgType<T> extends OriginalArgType {
  defaultValue?: T
}

type ArgTypes<Args> = {
  [P in keyof Args]?: ArgType<Args[P]>
}

interface Annotations<Args, StoryFnReturnType> extends Omit<OriginalAnnotations<Args, StoryFnReturnType>, 'argTypes'> {
  argTypes?: ArgTypes<Args>
}

export type Meta<Args> = BaseMeta<React.ComponentType> & Annotations<Args, StoryFnReactReturnType>

export interface MockedResponse<Data, Variables> extends OriginalMockedResponse {
  request: GraphQLRequest<Variables>;
  result?: FetchResult<Data>;
}

interface GraphQLRequest<Variables> extends OriginalGraphQLRequest {
  variables?: Variables;
}

export function generateClassName(rule: Rule, sheet?: StyleSheet<string>): string {
  return `${sheet?.options.classNamePrefix}-${rule.key}`
}

export function wait(miliseconds = 0): Promise<void> {
  return TestRenderer.act(() => {
    return new Promise((resolve) => {
      setTimeout(resolve, miliseconds)
    })
  })
}
