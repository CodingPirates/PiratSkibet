import React from 'react'
import Page from '@morningtrain/react-app/Page'
import Section from 'layouts/Section'
import { Model } from '@morningtrain/react-resources'
import { Heading, Html } from 'support/displays'
import * as Filters from 'support/filters'

export default class Post extends React.Component {
  render () {
    return (
      <Page>
        <Model resourceName='content.posts'>
          <Filters.RouteParameter constraint='path' />
          <div className='post'>
            <Section>
              <Heading name='title' className='post--title' />
            </Section>
            <Section>
              <Html name='content' className='post--content' />
            </Section>
          </div>
        </Model>
      </Page>
    )
  }
}
