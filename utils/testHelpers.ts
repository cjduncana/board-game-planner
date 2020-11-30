import { FetchResult, GraphQLRequest as OriginalGraphQLRequest } from '@apollo/client'
import { MockedResponse as OriginalMockedResponse } from '@apollo/client/testing'
import {
  Annotations as OriginalAnnotations,
  ArgType as OriginalArgType,
  BaseMeta,
} from '@storybook/addons'
import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types'
import { Rule, StyleSheet } from 'jss'
import TestRenderer from 'react-test-renderer'

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
