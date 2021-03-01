import Widget from 'widgets/Widget'
import React from 'react'
import { Env } from '@morningtrain/helpers'
import Section from 'layouts/Section'
import TVMonitor from 'widgets/tv/TVMonitor'
import {Case} from 'support/fields'
import YoutubeVideo from 'widgets/tv/YoutubeVideo'

export default class Livestream extends Widget {

  get livestream () {
    const livestreams = Env.get('content.livestreams', [])

    return livestreams?.[0] || {}
  }

  renderWidget () {
    const livestream = this.livestream;

    if (livestream.is_live !== true) {
      return null
    }

    return (
      <Section className={'tv-livestream'} header={(<h2>Vi streamer lige nu!_</h2>)}>
        <TVMonitor maxWidth='800px' center>
          <Case when={'youtube_channel'} case={livestream.type}>
            <YoutubeVideo videoId={livestream.embed_id} isChannel={true}/>
          </Case>

          <Case when={'youtube'} case={livestream.type}>
            <YoutubeVideo videoId={livestream.embed_id} />
          </Case>

        </TVMonitor>
      </Section>
    )
  }
}
