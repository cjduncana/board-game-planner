import fetchMock from 'fetch-mock'

import {
  boardGameById,
  emptyItems,
  itemWrapper,
  pandemicId,
} from '../../__mocks__/xml'
import { boardGames } from '../../resolvers/boardGame'
import Url from '../../utils/urls'

describe('Board Game resolvers', () => {

  describe('#boardGames', () => {

    it('should immediately return an empty array if the User provided no query', async () => {

      const response = await boardGames({}, { query: '' })

      expect(response).toEqual([])
    })

    it('should return an empty array if no Board Games were found', async () => {

      const response = await boardGames({}, { query: 'Empty' })

      expect(response).toEqual([])
    })

    it('should return an array of Board Games if Board Games were found', async () => {

      const response = await boardGames({}, { query: 'Pandemic' })

      expect(response).toEqual([{
        id: '30549',
        name: 'Pandemic',
        description: 'In Pandemic, several virulent diseases have broken out simultaneously all over the world! The players are disease-fighting specialists whose mission is to treat disease hotspots while researching cures for each of four plagues before they get out of hand.&amp;#10;&amp;#10;The game board depicts several major population centers on Earth. On each turn, a player can use up to four actions to travel between cities, treat infected populaces, discover a cure, or build a research station. A deck of cards provides the players with these abilities, but sprinkled throughout this deck are Epidemic! cards that accelerate and intensify the diseases\' activity. A second, separate deck of cards controls the &amp;quot;normal&amp;quot; spread of the infections.&amp;#10;&amp;#10;Taking a unique role within the team, players must plan their strategy to mesh with their specialists\' strengths in order to conquer the diseases. For example, the Operations Expert can build research stations which are needed to find cures for the diseases and which allow for greater mobility between cities; the Scientist needs only four cards of a particular disease to cure it instead of the normal five&amp;mdash;but the diseases are spreading quickly and time is running out. If one or more diseases spreads beyond recovery or if too much time elapses, the players all lose. If they cure the four diseases, they all win!&amp;#10;&amp;#10;The 2013 edition of Pandemic includes two new characters&amp;mdash;the Contingency Planner and the Quarantine Specialist&amp;mdash;not available in earlier editions of the game.&amp;#10;&amp;#10;Pandemic is the first game in the Pandemic series.&amp;#10;&amp;#10;',
        minimumAmountOfPlayers: 2,
        maximumAmountOfPlayers: 4,
        thumbnailUrl: 'https://cf.geekdo-images.com/S3ybV1LAp-8SnHIXLLjVqA__thumb/img/oqViRj6nVxK3m36NluTxU1PZkrk=/fit-in/200x150/filters:strip_icc()/pic1534148.jpg',
        imageUrl: 'https://cf.geekdo-images.com/S3ybV1LAp-8SnHIXLLjVqA__original/img/j-pfXZ_0GmOowohzD_T6NDAWGSA=/0x0/pic1534148.jpg',
      }])
    })
  })
})

fetchMock
  .get(`${Url.BOARD_GAME_SEARCH}&query=Empty`, emptyItems)
  .get(`${Url.BOARD_GAME_SEARCH}&query=Pandemic`, pandemicId)
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
