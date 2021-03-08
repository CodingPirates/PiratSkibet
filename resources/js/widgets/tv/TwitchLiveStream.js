import Widget from 'widgets/Widget'
import Embed from 'react-twitch/Embed'
import React from 'react'
import { Env } from '@morningtrain/helpers'
import Section from 'layouts/Section'
import TVMonitor from 'widgets/tv/TVMonitor'

export default class TwitchLiveStream extends Widget {
  get channel () {
    const channels = Env.get('content.twitch.channels', [])

    if (channels.length > 0) {
      return channels[0]
    }

    return {}
  }

  renderWidget () {
    if (this.channel.is_live === false) {
      return null
    }

    return (
      <Section className={'tv-livestream'} header={(
        <React.Fragment>
          <h2>Vi streamer lige nu!_</h2>
          <h3>{this.channel.stream_title}</h3>
        </React.Fragment>
      )}>
        <TVMonitor maxWidth='800px' center>
          <Embed channel={this.channel.channel_name} chat={false} />
        </TVMonitor>
      </Section>
    )
  }
}
