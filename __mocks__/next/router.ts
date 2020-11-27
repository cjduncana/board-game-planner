import { NextRouter } from 'next/router'

export const mockPush = jest.fn(() => Promise.resolve(false))

export function useRouter(): NextRouter {
  return {
    route: 'route',
    pathname: 'pathname',
    query: {},
    asPath: 'asPath',
    basePath: 'basePath',
    push: mockPush,
    replace: () => Promise.resolve(false),
    reload: () => undefined,
    back: () => undefined,
    prefetch: Promise.resolve,
    beforePopState: () => undefined,
    events: {
      on: () => undefined,
      off: () => undefined,
      emit: () => undefined,
    },
    isFallback: false,
  }
}
