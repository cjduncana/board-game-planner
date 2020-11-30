import { Story } from '@storybook/react'
import React from 'react'

import MediaCard, { Props } from '../components/MediaCard'
import { Meta } from '../utils/testHelpers'

export default {
  title: 'MediaCard',
  component: MediaCard,
  argTypes: {
    title: { description: 'Title of the media card' },
    description: { description: 'Description of the media card' },
    imageUrl: {
      description: 'URL of the image used in the media card',
      defaultValue: null,
    },
  },
} as Meta<Props>

const Template: Story<Props> = (props) => <MediaCard {...props} />

export const WithImage = Template.bind({})

WithImage.args = {
  title: 'Pandemic',
  description: `In Pandemic, several virulent diseases have broken out simultaneously all over the world! The players are disease-fighting specialists whose mission is to treat disease hotspots while researching cures for each of four plagues before they get out of hand.

The game board depicts several major population centers on Earth. On each turn, a player can use up to four actions to travel between cities, treat infected populaces, discover a cure, or build a research station. A deck of cards provides the players with these abilities, but sprinkled throughout this deck are Epidemic! cards that accelerate and intensify the diseases' activity. A second, separate deck of cards controls the "normal" spread of the infections.

Taking a unique role within the team, players must plan their strategy to mesh with their specialists' strengths in order to conquer the diseases. For example, the Operations Expert can build research stations which are needed to find cures for the diseases and which allow for greater mobility between cities; the Scientist needs only four cards of a particular disease to cure it instead of the normal five—but the diseases are spreading quickly and time is running out. If one or more diseases spreads beyond recovery or if too much time elapses, the players all lose. If they cure the four diseases, they all win!

The 2013 edition of Pandemic includes two new characters—the Contingency Planner and the Quarantine Specialist—not available in earlier editions of the game.

Pandemic is the first game in the Pandemic series.`,
  imageUrl: 'https://cf.geekdo-images.com/S3ybV1LAp-8SnHIXLLjVqA__original/img/j-pfXZ_0GmOowohzD_T6NDAWGSA=/0x0/pic1534148.jpg',
}

export const WithOutImage = Template.bind({})

WithOutImage.args = {
  title: 'Catan: First Adventure Print & Play',
  description: `The kids on Catan are very adventurous. They learn to sail at a very young age and like to spend their time sailing around the small offshore islands and playing exciting games. Today you are playing pirates.

You and your friends race to build small pirate lairs and, ultimately, a great pirate fort. The first to do so will be crowned the ruler of the pirates!

For this game, one friend pretends to be a Ghost Captain and tries to prevent the others from completing their lairs. Who among you will be the most powerful pirate?

Print, craft, and play this special kids' game, which is released as a part of the CATAN #StayAndPlay campaign, which has the goal of making home-staying during the COVID-19 pandemic a little more fun.`,
}
