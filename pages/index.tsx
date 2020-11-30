import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import he from 'he'
import { useRouter } from 'next/router'
import React from 'react'

import MediaCard from '../components/MediaCard'
import Unsplash from '../components/Unsplash'
import {
  BoardGamesQuery,
  useBoardGamesLazyQuery,
} from '../schemas/boardGame.graphql'

export default function Index(): JSX.Element {

  const classes = useStyles()
  const router = useRouter()

  const [inputQuery, setInputQuery] = React.useState<string>()

  // Only search if there's a query
  const [searchBoardGames, boardGameResult] = useBoardGamesLazyQuery()

  const routerQuery = Array.isArray(router.query.query)
    ? router.query.query[0]
    : router.query.query

  React.useEffect(() => {
    if (routerQuery) {
      searchBoardGames({ variables: { query: routerQuery } })
    }
  }, [routerQuery, searchBoardGames])

  const onSearch: React.FormEventHandler = React.useCallback((event) => {
    event.preventDefault()

    if (inputQuery) {
      router.push(`${router.pathname}?query=${inputQuery}`, undefined, { shallow: true })
    }
  }, [inputQuery, router])

  const onQueryChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((event) => {
    event.preventDefault()
    setInputQuery(event.currentTarget.value)
  }, [setInputQuery])

  return (
    <React.Fragment>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Search the available catalog of board games
          </Typography>
          <form onSubmit={onSearch}>
            <Input
              fullWidth
              value={inputQuery ?? ''}
              onChange={onQueryChange}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </form>
        </Container>
      </div>
      {/* TODO: Use skeleton when loading */}
      {boardGameResult.called && routerQuery ?
        (
          <Body boardGames={boardGameResult.data?.boardGames} />
        ) : (
          <Unsplash
            username="jacielmelnik"
            fullName="Jaciel Melnik"
            src="/green-meeples.jpg"
            alt="The Green Meeples"
            layout="responsive"
            width={640}
            height={359}
            priority
          />
        )
      }
    </React.Fragment>
  )
}

interface BodyProps {
  boardGames?: BoardGame[]
}

function Body(props: BodyProps): JSX.Element {

  const renderBoardGame = React.useCallback((boardGame: BoardGame): JSX.Element => {
    return (
      <Grid item xs={12} sm={6} md={4} key={boardGame.id}>
        <MediaCard
          title={he.decode(boardGame.name)}
          description={he.decode(boardGame.description)}
          imageUrl={boardGame.imageUrl}
        />
      </Grid>
    )
  }, [])

  return (
    <Grid container spacing={4}>
      {/* TODO: Provide a message when there are no games */}
      {props.boardGames?.map(renderBoardGame)}
    </Grid>
  )
}

type BoardGame = BoardGamesQuery['boardGames'][0]

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
}))
