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
        <Paper size={'small'}>

          <Collection resourceName='content.videos' operationContext={'newest'}>
            <WhenCollection>
              <Section className='youtube-video-section'
                       header={<h2>Nyeste Videoer</h2>}>
                <Filters.Static constraint='$per_page' value={3}/>
                <VideoGridLoop/>
              </Section>
            </WhenCollection>
          </Collection>

          <Collection resourceName='content.videos'
                      operationContext={'highlighted'}>
            <WhenCollection>
              <Section className='youtube-video-section'
                       header={<h2>Highlighted</h2>}>
                <Filters.Static constraint='highlighted' value={true}/>
                <Filters.Static constraint='$per_page' value={3}/>
                <VideoGridLoop/>
              </Section>
            </WhenCollection>
          </Collection>

          <Collection resourceName='content.videos' operationContext={'all'}>
            <Section className='youtube-video-section'
                     header={<h2>Alle videoer</h2>}>
              <Filters.Static constraint='$per_page' value={3}/>
              <VideoGridLoop/>
              <Filters.Pagination/>
            </Section>
          </Collection>

        </Paper>
      </Section>
    )
  }
}
