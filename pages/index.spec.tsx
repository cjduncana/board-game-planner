/**
 * @jest-environment jsdom
 */

import Input from '@material-ui/core/Input'
import React from 'react'
import TestRenderer from 'react-test-renderer'

import { baseEvent, createInputEvent } from '../__mocks__'
import { mockPush } from '../__mocks__/next/router'
import Index from '.'

describe('Index page', () => {

  it('should render the page', () => {
    const tree = TestRenderer.create(<Index />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should change the value of the input if the User type a query', () => {
    const { root } = TestRenderer.create(<Index />)

    const input = root.findByType(Input)

    expect(input.props.value).toEqual('')

    TestRenderer.act(() => {
      input.props.onChange(createInputEvent('test'))
    })

    expect(input.props.value).toEqual('test')
  })

  it('should update the router with the new query when the User submit the search', () => {
    const { root } = TestRenderer.create(<Index />)

    const form = root.findByType('form')
    const input = root.findByType(Input)

    TestRenderer.act(() => {
      input.props.onChange(createInputEvent('test'))
    })

    expect(mockPush).not.toHaveBeenCalled()

    form.props.onSubmit(baseEvent)

    expect(mockPush).toBeCalledTimes(1)
    expect(mockPush).toHaveBeenCalledWith('pathname?query=test', undefined, { shallow: true })
  })
})
