import React from 'react'
import Page from '@morningtrain/react-app/Page'
import Thread from 'widgets/forum/Thread'
import { router } from '@morningtrain/helpers'

export default class TopicPage extends React.Component {
  render () {
    return (
      <Page>
        <div className='forum'>
          <Thread id={router.parameter('thread')} />
        </div>
      </Page>
    )
  }
}
