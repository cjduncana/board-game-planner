import { BoardGame } from '../schemas/type-defs.graphqls'
import { fetchXml } from '.'

export async function searchBoardGameIds(query: string): Promise<string[]> {
  const res = await fetchXml<SearchResponse>(
    `https://api.geekdo.com/xmlapi2/search?type=boardgame,boardgameexpansion&query=${query}`
  )

  return res.items.item.map(mapSearch)
}

function mapSearch(search: ItemInSearchResponse): string {
  return search['@_id']
}

export async function fetchBoardGamesById(ids: string[]): Promise<BoardGame[]> {
  const res = await fetchXml<ThingResponse>(
    `https://api.geekdo.com/xmlapi2/thing?id=${ids.join(',')}`
  )

  return formatThingResponse(res)
}

function formatThingResponse(response: ThingResponse): BoardGame[] {
  return response.items.item.map(mapThing)
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
  items: { item: ItemInSearchResponse[] }
}

interface ItemInSearchResponse {
  '@_id': string
}

interface ThingResponse {
  items: { item: ItemInThingResponse[] }
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
