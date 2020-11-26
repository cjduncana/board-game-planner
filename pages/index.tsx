import Container from '@material-ui/core/Container'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import { useRouter } from 'next/router'
import React from 'react'

export default function Index(): JSX.Element {

  const classes = useStyles()
  const router = useRouter()

  const [query, setQuery] = React.useState<string>()

  const onSearch: React.FormEventHandler = React.useCallback((event) => {
    event.preventDefault()
    router.push(`${router.pathname}?query=${query}`, undefined, { shallow: true })
  }, [router, query])

  const onQueryChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((event) => {
    event.preventDefault()
    setQuery(event.currentTarget.value)
  }, [setQuery])

  return (
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
            value={query ?? ''}
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
  )
}

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
}))
