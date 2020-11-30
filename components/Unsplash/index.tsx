import Image, { ImageProps } from 'next/image'
import React from 'react'

export type Props =
  & CreditProps
  & ImageProps
  ;

export default function Unsplash(props: Props): JSX.Element {

  const { username, fullName, ...imageProps } = props

  return (
    <React.Fragment>
      <Credit username={username} fullName={fullName} />
      <Image {...imageProps} />
    </React.Fragment>
  )
}

interface CreditProps {
  username: string
  fullName: string
}

function Credit(props: CreditProps): JSX.Element {
  return <span>Photo by <UserLink {...props} /> on <UnsplashLink /></span>
}

function UserLink(props: CreditProps): JSX.Element {
  return (
    <NewTabLink href={`https://unsplash.com/@${props.username}?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText`} >
      {props.fullName}
    </NewTabLink>
  )
}

function UnsplashLink(): JSX.Element {
  return (
    <NewTabLink href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
      Unsplash
    </NewTabLink>
  )
}

interface NewTabLinkProps {
  href: string
  children: string
}

function NewTabLink(props: NewTabLinkProps): JSX.Element {
  return <a {...props} target="_blank" rel="noreferrer" />
}
