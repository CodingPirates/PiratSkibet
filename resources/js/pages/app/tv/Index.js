import React from 'react'
import Page from '@morningtrain/react-app/Page'
import TwitchLiveStream from 'widgets/tv/TwitchLiveStream'
import TwitchVOD from 'widgets/tv/TwitchVOD'
import Section from 'layouts/Section'
import ForumWorld from 'widgets/animations/worlds/ForumWorld'
import VideoBot from 'widgets/video-bot/VideoBot'
import VideoGrid from 'widgets/tv/VideoGrid'

export default class Index extends React.Component {
  render () {
    return (
      <Page>
        <VideoBot position='fixed' />
        <ForumWorld classNames='forum-world' />
        <Section className='coding-pirates-tv'>
          <h1>Coding Pirates TV_</h1>
        </Section>
        <TwitchLiveStream />
        <VideoGrid/>
        <TwitchVOD />
      </Page>
    )
  }
}
