/**
 * @jest-environment jsdom
 */

import { MockedProvider } from '@apollo/client/testing'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import { RouterContext } from 'next/dist/next-server/lib/router-context'
import { NextRouter } from 'next/router'
import React from 'react'
import TestRenderer from 'react-test-renderer'

import { nextRouter } from '../../__mocks__'
import { baseEvent, createInputEvent } from '../../__mocks__/events'
import Index from '../../pages'
import { mockedBoardGames } from '../../schemas/__mock__/boardGame.graphql'
import { wait } from '../../utils/testHelpers'

// TODO: Fix Image: Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
// TODO: Fix MockedProvider randomly returning the BE result
// Issue is tracked in https://github.com/apollographql/apollo-client/issues/7388
describe('Index page', () => {

  it('should render the page', () => {
    const tree = TestRenderer.create(<Wrapped />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should change the value of the input if the User type a query', () => {
    const { root } = TestRenderer.create(<Wrapped />)

    const input = root.findByType(Input)

    expect(input.props.value).toEqual('')

    TestRenderer.act(() => {
      input.props.onChange(createInputEvent('Catan'))
    })

    expect(input.props.value).toEqual('Catan')
  })

  it('should do nothing if there\'s no new query', () => {
    const { root } = TestRenderer.create(<Wrapped />)

    const form = root.findByType('form')

    expect(mockPush).not.toHaveBeenCalled()

    form.props.onSubmit(baseEvent)

    expect(mockPush).not.toHaveBeenCalled()
  })

  it('should update the router with the new query when the User submit the search', () => {
    const { root } = TestRenderer.create(<Wrapped />)

    const form = root.findByType('form')
    const input = root.findByType(Input)

    TestRenderer.act(() => {
      input.props.onChange(createInputEvent('Catan'))
    })

    expect(mockPush).not.toHaveBeenCalled()

    form.props.onSubmit(baseEvent)

    expect(mockPush).toBeCalledTimes(1)
    expect(mockPush).toHaveBeenCalledWith('pathname?query=Catan', undefined, { shallow: true })
  })

  describe('with a query', () => {

    it('should render the page with results', async () => {
      const component = TestRenderer.create(<Wrapped router={routerWithQuery} />)
      await wait()
      expect(component.toJSON()).toMatchSnapshot()
    })

    it('should search for Board Games if the router has a query', async () => {
      const { root } = TestRenderer.create(<Wrapped router={routerWithQuery} />)

      const gridsBeforeAction = root.findAllByType(Grid)
      expect(gridsBeforeAction).toHaveLength(0)

      await wait()

      const gridsAfterAction = root.findAllByType(Grid)
      expect(gridsAfterAction).toHaveLength(3)
    })

    it('should search for Board Games using the first query if the router has more than one query', async () => {

      const routerWithTwoQueries: NextRouter = {
        ...nextRouter,
        query: { query: ['Catan', 'Pandemic'] },
      }

      const { root } = TestRenderer.create(<Wrapped router={routerWithTwoQueries} />)

      const gridsBeforeAction = root.findAllByType(Grid)
      expect(gridsBeforeAction).toHaveLength(0)

      await wait()

      const gridsAfterAction = root.findAllByType(Grid)
      expect(gridsAfterAction).toHaveLength(3)
    })
  })
})

const mockPush = jest.fn(() => Promise.resolve(false))

const mockedRouter: NextRouter = {
  ...nextRouter,
  push: mockPush,
}

const routerWithQuery: NextRouter = {
  ...nextRouter,
  query: { query: 'Catan' },
}

interface WrappedProps {
  router?: NextRouter
}

function Wrapped(props: WrappedProps): JSX.Element {
  return (
    <RouterContext.Provider value={props.router ?? mockedRouter}>
      <MockedProvider mocks={[mockedBoardGames]}>
        <Index />
      </MockedProvider>
    </RouterContext.Provider>
  )
}
