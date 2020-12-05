import { MockedResponse } from '../../utils/testHelpers'
import {
  BoardGame,
  BoardGamesDocument,
  BoardGamesQuery,
  BoardGamesQueryVariables,
} from '../boardGame.graphql'

export const catan: BoardGame = {
  __typename: 'BoardGame',
  id: '13',
  name: 'Catan',
  description: 'In CATAN (formerly The Settlers of Catan), players try to be the dominant force on the island of Catan by building settlements, cities, and roads. On each turn dice are rolled to determine what resources the island produces. Players build by spending resources (sheep, wheat, wood, brick and ore) that are depicted by these resource cards; each land type, with the exception of the unproductive desert, produces a specific resource: hills produce brick, forests produce wood, mountains produce ore, fields produce wheat, and pastures produce sheep.&amp;#10;&amp;#10;Setup includes randomly placing large hexagonal tiles (each showing a resource or the desert) in a honeycomb shape and surrounding them with water tiles, some of which contain ports of exchange. Number disks, which will correspond to die rolls (two 6-sided dice are used), are placed on each resource tile. Each player is given two settlements (think: houses) and roads (sticks) which are, in turn, placed on intersections and borders of the resource tiles. Players collect a hand of resource cards based on which hex tiles their last-placed house is adjacent to. A robber pawn is placed on the desert tile.&amp;#10;&amp;#10;A turn consists of possibly playing a development card, rolling the dice, everyone (perhaps) collecting resource cards based on the roll and position of houses (or upgraded cities&amp;mdash;think: hotels) unless a 7 is rolled, turning in resource cards (if possible and desired) for improvements, trading cards at a port, and trading resource cards with other players. If a 7 is rolled, the active player moves the robber to a new hex tile and steals resource cards from other players who have built structures adjacent to that tile.&amp;#10;&amp;#10;Points are accumulated by building settlements and cities, having the longest road and the largest army (from some of the development cards), and gathering certain development cards that simply award victory points. When a player has gathered 10 points (some of which may be held in secret), he announces his total and claims the win.&amp;#10;&amp;#10;CATAN has won multiple awards and is one of the most popular games in recent history due to its amazing ability to appeal to experienced gamers as well as those new to the hobby.&amp;#10;&amp;#10;Die Siedler von Catan was originally published by KOSMOS and has gone through multiple editions. It was licensed by Mayfair and has undergone four editions as The Settlers of Catan. In 2015, it was formally renamed CATAN to better represent itself as the core and base game of the CATAN series. It has been re-published in two travel editions, portable edition and compact edition, as a special gallery edition (replaced in 2009 with a family edition), as an anniversary wooden edition, as a deluxe 3D collector\'s edition, in the basic Simply Catan, as a beginner version, and with an entirely new theme in Japan and Asia as Settlers of Catan: Rockman Edition. Numerous spin-offs and expansions have also been made for the game.&amp;#10;&amp;#10;',
  minimumAmountOfPlayers: 3,
  maximumAmountOfPlayers: 4,
  thumbnailUrl: 'https://cf.geekdo-images.com/W3Bsga_uLP9kO91gZ7H8yw__thumb/img/8a9HeqFydO7Uun_le9bXWPnidcA=/fit-in/200x150/filters:strip_icc()/pic2419375.jpg',
  imageUrl: 'https://cf.geekdo-images.com/W3Bsga_uLP9kO91gZ7H8yw__original/img/A-0yDJkve0avEicYQ4HoNO-HkK8=/0x0/pic2419375.jpg',
}

export const catanFirstAdventure: BoardGame = {
  __typename: 'BoardGame',
  id: '325333',
  name: 'Catan: First Adventure Print &amp; Play',
  description: 'The kids on Catan are very adventurous. They learn to sail at a very young age and like to spend their time sailing around the small offshore islands and playing exciting games. Today you are playing pirates.&amp;#10;&amp;#10;You and your friends race to build small pirate lairs and, ultimately, a great pirate fort. The first to do so will be crowned the ruler of the pirates!&amp;#10;&amp;#10;For this game, one friend pretends to be a Ghost Captain and tries to prevent the others from completing their lairs. Who among you will be the most powerful pirate?&amp;#10;&amp;#10;Print, craft, and play this special kids\' game, which is released as a part of the CATAN #StayAndPlay campaign, which has the goal of making home-staying during the COVID-19 pandemic a little more fun.&amp;#10;&amp;#10;',
  minimumAmountOfPlayers: 2,
  maximumAmountOfPlayers: 4,
  thumbnailUrl: null,
  imageUrl: null,
}

export const sevenWondersCatan: BoardGame = {
  __typename: 'BoardGame',
  id: '110308',
  name: '7 Wonders: Catan',
  description: '7 Wonders: Catan is a mini-expansion for the 2011 Kennerspiel des Jahres winner 7 Wonders that pays homage to the SdJ poster child The Settlers of Catan. 7 Wonders: Catan debuted at Spiel 2011 with all funds collected from sale of the expansion being donated to Aktion Deutschland Hilft.&amp;#10;&amp;#10;Contents:&amp;#10;1x Wonder cardboard&amp;#10;1x Wonder randomizer card&amp;#10;1x &amp;quot;Klaus Teuber\'s note (advertisment mostly)&amp;#10;all wrapped in shrinkwrap.&amp;#10;&amp;#10;',
  minimumAmountOfPlayers: 2,
  maximumAmountOfPlayers: 7,
  thumbnailUrl: 'https://cf.geekdo-images.com/F99j2tOu97d_ekn3D1GGAQ__thumb/img/yOuyBE7eAPQ8b2dxzZzsz575eqE=/fit-in/200x150/filters:strip_icc()/pic1115825.jpg',
  imageUrl: 'https://cf.geekdo-images.com/F99j2tOu97d_ekn3D1GGAQ__original/img/-jTNZl6eOV9PLHGSpkjSO772xMs=/0x0/pic1115825.jpg',
}

type MockedBoardGames = MockedResponse<BoardGamesQuery, BoardGamesQueryVariables>

export const mockedBoardGames: MockedBoardGames = {
  request: { query: BoardGamesDocument, variables: { query: 'Catan' } },
  result: { data: { boardGames: [catan, catanFirstAdventure] } },
}
