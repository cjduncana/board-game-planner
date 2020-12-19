import fetchMock from 'fetch-mock'
import * as TypeORM from 'typeorm'

import getMockUser from '../../entities/__mocks__/user'
import UserEntity from '../../entities/user'
import UserRepository from '../../repositories/user'
import { createEvent } from '../../resolvers/event'
import { CreateEventInput } from '../../schemas/type-defs.graphqls'
import {
  addBoardGameThingMock,
  closeConnection,
  createConnection,
} from '../../utils/testHelpers'

describe('Event resolvers', () => {

  let mockUser: UserEntity
  let userRepo: UserRepository

  beforeAll(async () => {
    await createConnection()
    userRepo = TypeORM.getCustomRepository(UserRepository)
    mockUser = getMockUser()
  })

  afterAll(closeConnection)

  describe('#createEvent', () => {

    beforeAll(() => userRepo.save(mockUser))

    afterAll(() => userRepo.delete(mockUser.id))

    it('should return a new Event if the user provided well-formatted information', async () => {

      const event = await createEvent({}, { input: createEventInput }, { userId: mockUser.id })

      expect(event).toMatchObject({
        id: expect.any(String),
        creator: {
          id: '1a89ff62-d165-4187-b7dc-9732f0e0a8ec',
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
        startTime: '2017-05-15T08:30:00',
        location: {
          latitude: 8.977415,
          longitude: -79.558449,
        },
        players: [{
          id: '1a89ff62-d165-4187-b7dc-9732f0e0a8ec',
          name: 'John Doe',
          email: 'john.doe@example.com',
        }],
        games: [{
          id: '13',
          name: 'Catan',
          description: 'In CATAN (formerly The Settlers of Catan), players try to be the dominant force on the island of Catan by building settlements, cities, and roads. On each turn dice are rolled to determine what resources the island produces. Players build by spending resources (sheep, wheat, wood, brick and ore) that are depicted by these resource cards; each land type, with the exception of the unproductive desert, produces a specific resource: hills produce brick, forests produce wood, mountains produce ore, fields produce wheat, and pastures produce sheep.&amp;#10;&amp;#10;Setup includes randomly placing large hexagonal tiles (each showing a resource or the desert) in a honeycomb shape and surrounding them with water tiles, some of which contain ports of exchange. Number disks, which will correspond to die rolls (two 6-sided dice are used), are placed on each resource tile. Each player is given two settlements (think: houses) and roads (sticks) which are, in turn, placed on intersections and borders of the resource tiles. Players collect a hand of resource cards based on which hex tiles their last-placed house is adjacent to. A robber pawn is placed on the desert tile.&amp;#10;&amp;#10;A turn consists of possibly playing a development card, rolling the dice, everyone (perhaps) collecting resource cards based on the roll and position of houses (or upgraded cities&amp;mdash;think: hotels) unless a 7 is rolled, turning in resource cards (if possible and desired) for improvements, trading cards at a port, and trading resource cards with other players. If a 7 is rolled, the active player moves the robber to a new hex tile and steals resource cards from other players who have built structures adjacent to that tile.&amp;#10;&amp;#10;Points are accumulated by building settlements and cities, having the longest road and the largest army (from some of the development cards), and gathering certain development cards that simply award victory points. When a player has gathered 10 points (some of which may be held in secret), he announces his total and claims the win.&amp;#10;&amp;#10;CATAN has won multiple awards and is one of the most popular games in recent history due to its amazing ability to appeal to experienced gamers as well as those new to the hobby.&amp;#10;&amp;#10;Die Siedler von Catan was originally published by KOSMOS and has gone through multiple editions. It was licensed by Mayfair and has undergone four editions as The Settlers of Catan. In 2015, it was formally renamed CATAN to better represent itself as the core and base game of the CATAN series. It has been re-published in two travel editions, portable edition and compact edition, as a special gallery edition (replaced in 2009 with a family edition), as an anniversary wooden edition, as a deluxe 3D collector\'s edition, in the basic Simply Catan, as a beginner version, and with an entirely new theme in Japan and Asia as Settlers of Catan: Rockman Edition. Numerous spin-offs and expansions have also been made for the game.&amp;#10;&amp;#10;',
          minimumAmountOfPlayers: 3,
          maximumAmountOfPlayers: 4,
          thumbnailUrl: 'https://cf.geekdo-images.com/W3Bsga_uLP9kO91gZ7H8yw__thumb/img/8a9HeqFydO7Uun_le9bXWPnidcA=/fit-in/200x150/filters:strip_icc()/pic2419375.jpg',
          imageUrl: 'https://cf.geekdo-images.com/W3Bsga_uLP9kO91gZ7H8yw__original/img/A-0yDJkve0avEicYQ4HoNO-HkK8=/0x0/pic2419375.jpg',
        }, {
          id: '30549',
          name: 'Pandemic',
          description: 'In Pandemic, several virulent diseases have broken out simultaneously all over the world! The players are disease-fighting specialists whose mission is to treat disease hotspots while researching cures for each of four plagues before they get out of hand.&amp;#10;&amp;#10;The game board depicts several major population centers on Earth. On each turn, a player can use up to four actions to travel between cities, treat infected populaces, discover a cure, or build a research station. A deck of cards provides the players with these abilities, but sprinkled throughout this deck are Epidemic! cards that accelerate and intensify the diseases\' activity. A second, separate deck of cards controls the &amp;quot;normal&amp;quot; spread of the infections.&amp;#10;&amp;#10;Taking a unique role within the team, players must plan their strategy to mesh with their specialists\' strengths in order to conquer the diseases. For example, the Operations Expert can build research stations which are needed to find cures for the diseases and which allow for greater mobility between cities; the Scientist needs only four cards of a particular disease to cure it instead of the normal five&amp;mdash;but the diseases are spreading quickly and time is running out. If one or more diseases spreads beyond recovery or if too much time elapses, the players all lose. If they cure the four diseases, they all win!&amp;#10;&amp;#10;The 2013 edition of Pandemic includes two new characters&amp;mdash;the Contingency Planner and the Quarantine Specialist&amp;mdash;not available in earlier editions of the game.&amp;#10;&amp;#10;Pandemic is the first game in the Pandemic series.&amp;#10;&amp;#10;',
          minimumAmountOfPlayers: 2,
          maximumAmountOfPlayers: 4,
          thumbnailUrl: 'https://cf.geekdo-images.com/S3ybV1LAp-8SnHIXLLjVqA__thumb/img/oqViRj6nVxK3m36NluTxU1PZkrk=/fit-in/200x150/filters:strip_icc()/pic1534148.jpg',
          imageUrl: 'https://cf.geekdo-images.com/S3ybV1LAp-8SnHIXLLjVqA__original/img/j-pfXZ_0GmOowohzD_T6NDAWGSA=/0x0/pic1534148.jpg',
        }],
      })
    })

    it('should throw if the code does not authenticate the user', async () => {

      const error = createEvent({}, { input: createEventInput }, {})

      await expect(error).rejects.toThrow('Invalid credentials')
    })

    it('should throw if the code does authenticate a non-existent user', async () => {

      const error = createEvent({}, { input: createEventInput }, {
        userId: '689eec93-b074-41d4-af7c-f5720e522bbf',
      })

      await expect(error).rejects.toThrow('Invalid credentials')
    })

    it('should throw if the user provide an empty start time', async () => {

      const error = createEvent({}, {
        input: { ...createEventInput, startTime: '' },
      }, { userId: mockUser.id })

      await expect(error).rejects.toThrow('Empty information')
    })

    it('should throw if the user provide an invalid start time', async () => {

      const error = createEvent({}, {
        input: { ...createEventInput, startTime: 'wrong' },
      }, { userId: mockUser.id })

      await expect(error).rejects.toThrow('the input "wrong" can\'t be parsed as ISO 8601')
    })

    it('should throw if the user provide an empty latitude', async () => {

      const error = createEvent({}, {
        input: { ...createEventInput, latitude: 0 },
      }, { userId: mockUser.id })

      await expect(error).rejects.toThrow('Empty information')
    })

    it('should throw if the user provide an empty longitude', async () => {

      const error = createEvent({}, {
        input: { ...createEventInput, longitude: 0 },
      }, { userId: mockUser.id })

      await expect(error).rejects.toThrow('Empty information')
    })
  })
})

const createEventInput: CreateEventInput = {
  startTime: '2017-05-15T08:30:00',
  latitude: 8.977415,
  longitude: -79.558449,
  gameIds: ['13', '30549'],
}

addBoardGameThingMock(fetchMock)
