import { BoardGame, QueryBoardGamesArgs } from '../schemas/type-defs.graphqls'
import { fetchBoardGamesById, searchBoardGameIds } from '../utils/boardGameGeek'

export async function boardGames<Parent>(_parent: Parent, args: QueryBoardGamesArgs): Promise<BoardGame[]> {

  const gameIds = (args.query) ? await searchBoardGameIds(args.query) : []

  return (gameIds.length) ? fetchBoardGamesById(gameIds) : []
}
