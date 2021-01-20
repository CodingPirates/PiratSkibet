import React from 'react'
import Page from '@morningtrain/react-app/Page'
import { Section, FlexSplitter, FlexItem } from 'layouts'
import ContactForm from 'widgets/forms/ContactForm'
import CourseLevelWorld from 'widgets/animations/worlds/CourseLevelWorld'
import WorldWithScrollableContent from 'layouts/WorldWithScrollableContent'
import TextHeaderWorld from 'widgets/animations/worlds/TextHeaderWorld'
import Link from 'widgets/navigation/Link'

export default class Contact extends React.Component {
  render () {
    return (
      <Page>
        <TextHeaderWorld text='Kontakt os'>
          <div className='buttons-wrap'>
            <Link className='button button--yellow small' route='app.pages.about'>Tilbage</Link>
          </div>
        </TextHeaderWorld>

        <Section className='contact-form-wrap'>
          <FlexSplitter cols={2} verticalCenter>
            <FlexItem>
              <h2>Kontakt Coding Pirates</h2>
              <p>
                Piratskibets besætning kan kontaktes på mail via <a href='mailto:piratskibet@codingpirates.dk'>piratskibet@codingpirates.dk</a> Sekretariatet kan kontaktes på mail via <a href='mailto:kontakt@codingpirates.dk'>kontakt@codingpirates.dk</a>
              </p>
              <p>
                Du kan også komme forbi eller sende et brev:
                <br />
                Coding Pirates Denmark
                <br />
                Sverigesgade 20, 1. sal
                <br />
                5000 Odense C
              </p>
            </FlexItem>
            <FlexItem>
              <ContactForm type='copyright' />
            </FlexItem>
          </FlexSplitter>
        </Section>
      </Page>
    )
  }
}
