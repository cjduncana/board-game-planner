import { Story } from '@storybook/react'
import React from 'react'

import MediaGrid, { Props } from '../components/MediaGrid'
import {
  catan,
  catanFirstAdventure,
  sevenWondersCatan,
} from '../schemas/__mock__/boardGame.graphql'
import {
  BoardGame,
  getKey,
  getTitle,
  getDescription,
  getImageUrl,
} from '../utils/boardGame'
import { Meta } from '../utils/testHelpers'

export default {
  title: 'MediaGrid',
  component: MediaGrid,
  argTypes: {
    data: { description: 'List of the media object to show in the grid' },
    isLoading: {
      description: 'Toggle to show the loading state',
      defaultValue: false,
    },
    NotCalled: { description: 'Node to show when there\'s no data' },
    Empty: { description: 'Node to show when the list is empty' },
    getKey: {
      description: 'Function used to uniquely identify an item from the list',
    },
    getTitle: {
      description: 'Function used to extract the title from an item in the list',
    },
    getDescription: {
      description: 'Function used to extract the description from an item in the list',
    },
    getImageUrl: {
      description: 'Function used to possibly extract the image URL from an item in the list',
    },
  },
  args: { getKey, getTitle, getDescription, getImageUrl },
} as Meta<Props<BoardGame>>

const Template: Story<Props<BoardGame>> = (props) => <MediaGrid {...props} />

export const Done = Template.bind({})

Done.args = { data: [catan, catanFirstAdventure, sevenWondersCatan] }

export const Loading = Template.bind({})

Loading.args = { isLoading: true }
