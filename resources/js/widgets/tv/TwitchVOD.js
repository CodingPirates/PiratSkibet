import Widget from 'widgets/Widget'
import Embed from 'react-twitch/Embed'
import React from 'react'
import Section from 'layouts/Section'
import TVMonitor from 'widgets/tv/TVMonitor'
import { Env } from '@morningtrain/helpers'

export default class TwitchVOD extends Widget {
  get channel () {
    const channels = Env.get('content.twitch.channels', [])

    if (channels.length > 0) {
      return channels[0]
    }

    return {}
  }

  renderWidget () {
    return (
      <Section className='twitch-vod-section'>
        <h2>Coding Pirates Twitch VOD</h2>
        <TVMonitor maxWidth='800px' center>
          <Embed collection={this.channel.collection} />
        </TVMonitor>
      </Section>
    )
  }
}
