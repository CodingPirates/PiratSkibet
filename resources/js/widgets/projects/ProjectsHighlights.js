import React from 'react'
import Widget from 'widgets/Widget'
import Section from 'layouts/Section'
import { Collection, Iterator } from '@morningtrain/react-resources'
import * as Filters from 'support/filters'
import Project from 'widgets/projects/Project'
import WhenCollection from 'support/conditionals/WhenCollection'
import SimplePagination from 'layouts/SimplePagination'
import Link from 'widgets/navigation/Link'

export default class ProjectsHighlights extends Widget {
  renderWidget () {
    return (
      <Collection resourceName='projects.project'>
        <Filters.Static constraint='$per_page' value={6} />
        {/* <WhenCollection empty={false}> */}
        <div className='events-section'>
          <Section>
            <div className='title-bar'>
              <h2>Showcase_</h2>
              <Filters.Pagination layout={SimplePagination} />
              <Link route='app.projects.overview'>Se alle projekter</Link>
            </div>
            <div className='project-results project-results--gallery'>
              <Iterator>
                <Project type='gallery' />
              </Iterator>
            </div>
          </Section>
        </div>
        {/* </WhenCollection> */}
      </Collection>
    )
  }
}
