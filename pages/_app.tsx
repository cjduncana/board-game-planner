import 'fontsource-roboto'

import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import EventIcon from '@material-ui/icons/Event'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'

export default function App(props: AppProps): JSX.Element {

  const classes = useStyles()

  return (
    <React.Fragment>
      <Head>
        <title>Board Game Planner</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <EventIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Board Game Planner
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <props.Component {...props.pageProps} />
      </main>
    </React.Fragment>
  )
}

const useStyles = makeStyles((theme) => ({
  icon: { marginRight: theme.spacing(2) },
}))
