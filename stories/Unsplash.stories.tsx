import { Story } from '@storybook/react'
import React from 'react'

import Unsplash, { Props } from '../components/Unsplash'
import { Meta } from '../utils/testHelpers'

export default {
  title: 'Unsplash',
  component: Unsplash,
  argTypes: {
    username: { description: 'Username of who provided the image' },
    fullName: { description: 'Full name of who provided the image' },
    src: { description: 'URL of the image' },
    alt: { description: 'Alternative text in case image doesn\'t load' },
    width: { description: 'Width of the image' },
    height: { description: 'Height of the image' },
  },
} as Meta<Props>

const Template: Story<Props> = (props) => <Unsplash {...props} />

export const Default = Template.bind({})

Default.args = {
  username: 'jacielmelnik',
  fullName: 'Jaciel Melnik',
  src: '/green-meeples.jpg',
  alt: 'The Green Meeples',
  width: 640,
  height: 359,
  priority: true,
  layout: 'responsive',
}
