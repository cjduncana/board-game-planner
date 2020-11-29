import { BaseRouter, CompletePrivateRouteInfo } from 'next/dist/next-server/lib/router/router'
import { NextRouter, Router } from 'next/router'
import React from 'react'

const baseRouter: BaseRouter = {
  route: 'route',
  pathname: 'pathname',
  query: {},
  asPath: 'asPath',
  basePath: 'basePath',
}

export const nextRouter: NextRouter = {
  ...baseRouter,
  push: () => Promise.resolve(false),
  replace: () => Promise.resolve(false),
  reload: () => undefined,
  back: () => undefined,
  prefetch: Promise.resolve,
  beforePopState: () => undefined,
  events: {
    on: (): void => undefined,
    off: (): void => undefined,
    emit: (): void => undefined,
  },
  isFallback: false,
}

const completePrivateRouteInfo: CompletePrivateRouteInfo = {
  Component: React.createElement,
  styleSheets: [],
}

export const router: Router = {
  ...nextRouter,
  components: {},
  sdc: {},
  sub: Promise.resolve,
  clc: null,
  pageLoader: {},
  _bps: undefined,
  _wrapApp: () => undefined,
  isSsr: false,
  onPopState: () => undefined,
  change: () => Promise.resolve(false),
  changeState: () => undefined,
  handleRouteInfoError: () => Promise.resolve(completePrivateRouteInfo),
  getRouteInfo: () => Promise.resolve(completePrivateRouteInfo),
  set: Promise.resolve,
  onlyAHashChange: () => false,
  scrollToHash: () => undefined,
  urlIsNew: () => false,
  _resolveHref: () => ({}),
  fetchComponent: () => Promise.resolve({
    page: React.createElement,
    mod: {},
    styleSheets: [],
  }),
  _getData: Promise.resolve,
  _getStaticData: () => Promise.resolve({}),
  _getServerData: () => Promise.resolve({}),
  getInitialProps: Promise.resolve,
  abortComponentLoad: () => undefined,
  notify: Promise.resolve,
}
