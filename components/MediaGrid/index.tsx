import Grid, { GridProps } from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'

import MediaCard from '../MediaCard'

export interface Props<ItemT> {
  data?: ItemT[]
  isLoading?: boolean
  NotCalled?: React.ReactNode
  Empty?: React.ReactNode
  getKey(item: ItemT): string | number
  getTitle(item: ItemT): string
  getDescription(item: ItemT): string
  getImageUrl(item: ItemT): string | null | undefined
}

export default function MediaGrid<ItemT>(props: Props<ItemT>): JSX.Element {

  const { getKey, getTitle, getDescription, getImageUrl } = props

  const renderData = React.useCallback((item: ItemT): JSX.Element => (
    <ItemWrapper key={getKey(item)}>
      <MediaCard
        title={getTitle(item)}
        description={getDescription(item)}
        imageUrl={getImageUrl(item)}
      />
    </ItemWrapper>
  ), [getKey, getTitle, getDescription, getImageUrl])

  if (props.isLoading) {
    return (
      <GridWrapper>
        {Array.from(lengthThree, renderSkeletonCard)}
      </GridWrapper>
    )
  }

  if (!props.data) {
    return <React.Fragment>{props.NotCalled}</React.Fragment>
  }

  if (!props.data.length) {
    return <React.Fragment>{props.Empty}</React.Fragment>
  }

  return <GridWrapper>{props.data.map(renderData)}</GridWrapper>
}

function renderSkeletonCard<T>(_value: T, index: number): JSX.Element {
  return <SkeletonCard key={index} />
}

function SkeletonCard(): JSX.Element {

  const classes = useStyles()

  return (
    <ItemWrapper>
      <Skeleton
        className={classes.skeleton}
        variant="rect"
        animation="wave"
      />
    </ItemWrapper>
  )
}

function GridWrapper(props: GridProps): JSX.Element {

  const classes = useStyles()

  return <Grid {...props} container spacing={4} className={classes.wrapper} />
}

function ItemWrapper(props: GridProps): JSX.Element {
  return <Grid {...props} item xs={12} sm={6} md={4} />
}

const useStyles = makeStyles({
  wrapper: { padding: 16 },
  skeleton: { paddingTop: '56.25%' },
})

const lengthThree: ArrayLike<unknown> = { length: 3 }
