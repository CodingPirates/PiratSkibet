import React from 'react'
import Page from '@morningtrain/react-app/Page'
import ForumWorld from 'widgets/animations/worlds/ForumWorld'
import ProjectsOverview from 'widgets/projects/ProjectsOverview'

export default class Overview extends React.Component {
  render () {
    return (
      <Page>
        <ForumWorld classNames='forum-world' />
        <ProjectsOverview />
      </Page>
    )
  }
}
