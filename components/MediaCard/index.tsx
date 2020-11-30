import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'

export interface Props {
  title: string
  description: string
  imageUrl?: string | null
}

export default function MediaCard(props: Props): JSX.Element {

  const classes = useStyles()

  return (
    <Card className={classes.card}>
      {props.imageUrl ?
        (
          <CardMedia
            className={classes.cardMedia}
            image={props.imageUrl}
            title={props.title}
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
          {props.title}
        </Typography>
        <Typography className={classes.description}>
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  )
}

const useStyles = makeStyles({
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
})
