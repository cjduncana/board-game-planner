import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import Skeleton from '@material-ui/lab/Skeleton'
import he from 'he'
import { useRouter } from 'next/router'
import React from 'react'

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
    return <BoardGameCard key={boardGame.id} {...boardGame} />
  }, [])

  return (
    <Grid container spacing={4}>
      {/* TODO: Provide a message when there are no games */}
      {props.boardGames?.map(renderBoardGame)}
    </Grid>
  )
}

function BoardGameCard(boardGame: BoardGame): JSX.Element {

  const classes = useStyles()

  const boardGameName = he.decode(boardGame.name)

  return (
    <Grid item xs={12} sm={6} md={4}>
      {/* TODO: Turn into MediaCard Component */}
      <Card className={classes.card}>
        {boardGame.imageUrl ?
          (
            <CardMedia
              className={classes.cardMedia}
              image={boardGame.imageUrl}
              title={boardGameName}
            />
          ) : (
            // TODO: Replace with something else
            <Skeleton className={classes.cardMedia} />
          )
        }
        <CardContent className={classes.cardContent}>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.title}
          >
            {boardGameName}
          </Typography>
          <Typography className={classes.description}>
            {he.decode(boardGame.description)}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

type BoardGame = BoardGamesQuery['boardGames'][0]

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: { flexGrow: 1 },
  title: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  description: {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },
}))
