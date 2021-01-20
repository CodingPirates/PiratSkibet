import React from 'react'
import Page from '@morningtrain/react-app/Page'
import { router } from '@morningtrain/helpers'
import MainWorld from 'widgets/animations/worlds/Main'
import NewsSection from 'widgets/news/NewsSection'
import EventsSection from 'widgets/events/EventsSection'
import TwitchLiveStream from 'widgets/tv/TwitchLiveStream'
import SponsorLogoWall from 'widgets/sponsors/SponsorLogoWall'
import SponsorLogo from 'widgets/sponsors/SponsorLogo'
import ProjectsHighlights from 'widgets/projects/ProjectsHighlights'

export default class Home extends React.Component {
  render () {
    return (
      <Page>
        <MainWorld />
        <NewsSection />
        <ProjectsHighlights />
        <EventsSection />
        <TwitchLiveStream />
        <SponsorLogoWall>
          <SponsorLogo href='https://www.industriensfond.dk/' src={router.url('img/logos/industriens-fond.jpg')} alt='industriens fond logo' />
          <SponsorLogo href='https://codingpirates.dk/' src={router.url('img/logos/coding_pirates.png')} alt='coding pirates' />
        </SponsorLogoWall>
      </Page>
    )
  }
}
