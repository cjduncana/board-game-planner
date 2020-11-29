import { FetchResult, GraphQLRequest as OriginalGraphQLRequest } from '@apollo/client'
import { MockedResponse as OriginalMockedResponse } from '@apollo/client/testing'
import TestRenderer from 'react-test-renderer'

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
