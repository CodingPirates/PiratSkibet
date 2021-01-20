import React from 'react'
import Page from '@morningtrain/react-app/Page'
import ForumWorld from 'widgets/animations/worlds/ForumWorld'
import ProjectView from 'widgets/projects/ProjectView'
import { CatchError } from '@morningtrain/react-errors'
import * as Filters from 'support/filters'
import { Model, Redirect } from '@morningtrain/react-resources'
import WhenModel from 'support/conditionals/WhenModel'
import { RefreshOnLoginReaction } from '@morningtrain/react-auth'
import Title from 'support/page/Title'
import Section from 'layouts/Section'
import Link from 'widgets/navigation/Link'

export default class Project extends React.Component {
  render404 () {
    return (
      <div className='project-view'>
        <Section className='project-header'>
          <div className='project-title-wrap'>
            <h1>Showcase blev ikke fundet...</h1>
          </div>
        </Section>

        <Section className='project-edit project-header'>
          <Link
            className='button button--grey button--arrow-left small'
            route='app.projects.overview'
            label='Tilbage til oversigten'
          />
        </Section>
      </div>
    )
  }

  render () {
    return (
      <Page>
        <ForumWorld classNames='forum-world' />
        <Model resourceName='projects.project'>
          <Title name='title' />
          <RefreshOnLoginReaction />
          <CatchError code={400} renderOnError>
            <Redirect route='app.projects.overview' />
          </CatchError>
          <CatchError code={404} errorContent={this.render404()}>
            <Filters.RouteParameter constraint='project' />
            <WhenModel>
              <ProjectView />
            </WhenModel>
          </CatchError>
        </Model>
      </Page>
    )
  }
}
