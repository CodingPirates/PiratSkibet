import React from 'react'
import Widget from 'widgets/Widget'
import Section from 'layouts/Section'
import { Collection } from '@morningtrain/react-resources'
import * as Filters from 'support/filters'
import VideoGridLoop from 'widgets/tv/VideoGridLoop'

export default class VideoGrid extends Widget {

  renderWidget () {
    return (
      <React.Fragment>

        <Section className='youtube-video-section' header={<h2>Nyeste Videoer</h2>}>
          <Collection resourceName='content.videos' operationContext={'newest'}>
            <Filters.Static constraint='$per_page' value={3} />
            <VideoGridLoop/>
          </Collection>
        </Section>

        <Section className='youtube-video-section' header={<h2>Highlighted</h2>}>
          <Collection resourceName='content.videos' operationContext={'highlighted'}>
            <Filters.Static constraint='highlighted' value={true} />
            <Filters.Static constraint='$per_page' value={3} />
            <VideoGridLoop/>
          </Collection>
        </Section>

        <Section className='youtube-video-section' header={<h2>Alle videoer</h2>}>
          <Collection resourceName='content.videos' operationContext={'all'}>
            <Filters.Static constraint='$per_page' value={3} />
            <VideoGridLoop/>
            <Filters.Pagination/>
          </Collection>
        </Section>

      </React.Fragment>
    )
  }
}
