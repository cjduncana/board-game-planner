import { BoardGame } from '../schemas/type-defs.graphqls'
import Url from '../utils/urls'
import { fetchXml } from '.'

export async function searchBoardGameIds(query: string): Promise<string[]> {
  const res = await fetchXml<SearchResponse>(
    `${Url.BOARD_GAME_SEARCH}&query=${query}`
  )

  if (Array.isArray(res.items.item)) {
    return res.items.item.map(mapSearch)
  }

  return res.items.item ? [mapSearch(res.items.item)] : []
}

function mapSearch(search: ItemInSearchResponse): string {
  return search['@_id']
}

export async function fetchBoardGamesById(ids: string[]): Promise<BoardGame[]> {
  const res = await fetchXml<ThingResponse>(
    `${Url.BOARD_GAME_THING}?id=${ids.join(',')}`
  )

  return formatThingResponse(res)
}

function formatThingResponse(response: ThingResponse): BoardGame[] {
  if (Array.isArray(response.items.item)) {
    return response.items.item.map(mapThing)
  }

  return response.items.item ? [mapThing(response.items.item)] : []
}

function mapThing(thing: ItemInThingResponse): BoardGame {
  return {
    id: thing['@_id'],
    name: getNameInThing(thing.name),
    description: thing.description,
    minimumAmountOfPlayers: parseInt(thing.minplayers['@_value']),
    maximumAmountOfPlayers: parseInt(thing.maxplayers['@_value']),
    thumbnailUrl: thing.thumbnail,
    imageUrl: thing.image,
  }
}

function getNameInThing(name: NameInItem | NameInItem[]): string {

  if (Array.isArray(name)) {
    return name.find(findPrimaryName)?.['@_value'] ?? name[0]['@_value']
  }

  return name['@_value']
}

function findPrimaryName(name: NameInItem): boolean {
  return name['@_type'] === 'primary'
}

interface SearchResponse {
  items: { item?: ItemInSearchResponse | ItemInSearchResponse[] }
}

interface ItemInSearchResponse {
  '@_id': string
}

interface ThingResponse {
  items: { item?: ItemInThingResponse | ItemInThingResponse[] }
}

interface ItemInThingResponse {
  '@_id': string
  name: NameInItem | NameInItem[]
  description: string
  minplayers: { '@_value': string }
  maxplayers: { '@_value': string }
  thumbnail: string
  image: string
}

interface NameInItem {
  '@_type': 'primary' | 'alternate'
  '@_value': string
}
