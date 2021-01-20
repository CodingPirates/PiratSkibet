import React from 'react'
import Page from '@morningtrain/react-app/Page'
import Topic from 'widgets/forum/Topic'
import { router } from '@morningtrain/helpers'
import ForumWorld from 'widgets/animations/worlds/ForumWorld'

export default class TopicPage extends React.Component {
  render () {
    return (
      <Page>
        <ForumWorld classNames='forum-world' />
        <Topic id={router.parameter('topic')} />
      </Page>
    )
  }
}
