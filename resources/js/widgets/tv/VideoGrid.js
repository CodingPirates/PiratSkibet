import React from 'react'
import Widget from 'widgets/Widget'
import Paper from 'layouts/Paper'
import Section from 'layouts/Section'
import { Collection } from '@morningtrain/react-resources'
import * as Filters from 'support/filters'
import VideoGridLoop from 'widgets/tv/VideoGridLoop'
import WhenCollection from 'support/conditionals/WhenCollection'

export default class VideoGrid extends Widget {
  renderWidget () {
    return (
      <Section>
        <Paper size='small'>

          <Collection
            resourceName='content.videos'
            operationContext='highlighted'
          >
            <WhenCollection>
              <Section
                className='youtube-video-section'
                header={<h2>Highlighted</h2>}
              >
                <Filters.Static constraint='highlighted' value />
                <Filters.Static constraint='$per_page' value={3} />
                <VideoGridLoop />
              </Section>
            </WhenCollection>
          </Collection>

        </Paper>

        <Collection resourceName='content.videos' operationContext='all'>
          <div className='projects-overview'>
            <div className='projects-content'>
              <div className='filter-bar filter-bar--no-bottom'>
                <span className='subtitle'>videolager</span>
                <div className='filter-bar__filters filter-bar__filters--inputs'>
                  <div className='search-wrap'>
                    <Filters.Search />
                  </div>
                  <div className='select-wrap'>
                    <Filters.ResourceFilter
                      constraint='category'
                      resourceName='projects.category'
                      operationName='index'
                      placeholder='Alle Kategorier'
                      label='Filtrer efter Kategori'
                      optionsKey='name'
                    >
                      <Filters.Static constraint='parents' value />
                    </Filters.ResourceFilter>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Paper size='small' top={false}>
            <Section
              className='youtube-video-section'
              header={<h2>Alle videoer</h2>}
            >

              <Filters.Static constraint='$per_page' value={6} />
              <VideoGridLoop />
              <Filters.Pagination />
            </Section>

          </Paper>
        </Collection>

      </Section>
    )
  }
}
