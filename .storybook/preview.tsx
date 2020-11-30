import { StylesProvider } from '@material-ui/core'
import React from 'react'

import { generateClassName } from '../utils/testHelpers'

export const decorators = [
  (Story) => (
    <StylesProvider generateClassName={generateClassName}>
      <Story />
    </StylesProvider>
  )
]

export const parameters = { actions: { argTypesRegex: '^on[A-Z].*' } }