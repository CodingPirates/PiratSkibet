import React from 'react'
import Page from '@morningtrain/react-app/Page'
import ForumWorld from 'widgets/animations/worlds/ForumWorld'
import Threads from 'widgets/forum/Threads'
import TopicsOverview from 'widgets/forum/TopicsOverview'
import Section from 'layouts/Section'
import VideoBot from 'widgets/video-bot/VideoBot'
import CompactCreateThread from 'widgets/forum/CompactCreateThread'
import * as Filters from 'support/filters'
import Search from 'widgets/forum/Search'

export default class Overview extends React.Component {
  render () {
    return (
      <Page>
        <ForumWorld classNames='forum-world' />
        <div className='forum-topcis'>
          <Section>
            <h1 className='forum-title'>Piratsnak_</h1>
            <VideoBot position='absolute' alignRight alignBottom />
          </Section>
        </div>
        <CompactCreateThread />
        <Threads
          title='Aktuelle Chats_' showPagination={false} showSearch={false}
          collectionProps={{ operationContext: 'recent' }}
        >
          <Filters.Static constraint='$order' value={{ orderByActivity: 'DESC' }} />
          <Filters.Static constraint='$per_page' value={3} />
        </Threads>
        <Threads
          title='Mest populære chats_' showPagination={false} showSearch={false}
          collectionProps={{ operationContext: 'popular' }}
        >
          <Filters.Static constraint='$order' value={{ sort_score: 'DESC' }} />
          <Filters.Static constraint='$per_page' value={3} />
        </Threads>
        <Search />
        <TopicsOverview />
      </Page>
    )
  }
}
