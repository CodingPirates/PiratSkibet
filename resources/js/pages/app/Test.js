import React from 'react'
import Page from '@morningtrain/react-app/Page'
import Thread from 'widgets/forum/Thread'

export default class Test extends React.Component {
  render () {
    return (
      <Page>
        <Thread id={1} />
      </Page>
    )
  }
}
