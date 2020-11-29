import { BoardGame, QueryBoardGamesArgs } from '../schemas/type-defs.graphqls'
import { fetchBoardGamesById, searchBoardGameIds } from '../utils/boardGameGeek'

export async function boardGames<Parent>(_parent: Parent, args: QueryBoardGamesArgs): Promise<BoardGame[]> {
  // TODO: Return an empty array if there's no query
  // TODO: Figure out why "7 Wonders: Catan" appears twice
  const gameIds = await searchBoardGameIds(args.query)
  return fetchBoardGamesById(gameIds)
}
