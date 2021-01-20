import React from 'react'
import Page from '@morningtrain/react-app/Page'
import BackendLogin from 'widgets/auth/BackendLogin'

export default class Home extends React.Component {
  render () {
    return (
      <Page>
        <BackendLogin />
      </Page>
    )
  }
}
