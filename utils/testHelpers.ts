import { FetchResult, GraphQLRequest as OriginalGraphQLRequest } from '@apollo/client'
import { MockedResponse as OriginalMockedResponse } from '@apollo/client/testing'
import { Annotations as OriginalAnnotations, ArgType, BaseMeta } from '@storybook/addons'
import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types'
import TestRenderer from 'react-test-renderer'

type ArgTypes<Args> = {
  [P in keyof Args]?: ArgType
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

export function wait(miliseconds = 0): Promise<void> {
  return TestRenderer.act(() => {
    return new Promise((resolve) => {
      setTimeout(resolve, miliseconds)
    })
  })
}
