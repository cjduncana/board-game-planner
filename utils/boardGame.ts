import he from 'he'

import { BoardGamesQuery } from '../schemas/boardGame.graphql'

export type BoardGame = BoardGamesQuery['boardGames'][0]

export function getKey(boardGame: BoardGame): string {
  return boardGame.id
}

export function getTitle(boardGame: BoardGame): string {
  return he.decode(boardGame.name)
}

export function getDescription(boardGame: BoardGame): string {
  return he.decode(boardGame.description)
}

export function getImageUrl(boardGame: BoardGame): string | null | undefined {
  return boardGame.imageUrl
}
