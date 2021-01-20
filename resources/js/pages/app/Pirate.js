import React from 'react'
import Page from '@morningtrain/react-app/Page'
import { router } from '@morningtrain/helpers'
import PirateProfile from 'widgets/pirate/Pirate'

export default class Pirate extends React.Component {
  render () {
    return (
      <Page>
        <>
          <PirateProfile username={router.parameter('username')} />
        </>
      </Page>
    )
  }
}
