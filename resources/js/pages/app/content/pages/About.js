import React from 'react'
import Page from '@morningtrain/react-app/Page'
import Link from 'widgets/navigation/Link'
import Section from 'layouts/Section'
import TextHeaderWorld from 'widgets/animations/worlds/TextHeaderWorld'
import { router } from '@morningtrain/helpers'
import TextImage from 'layouts/TextImage'

export default class About extends React.Component {
  render () {
    return (
      <Page>
        <TextHeaderWorld text='Om Piratskibet'>
          <div className='buttons-wrap'>
            <Link className='button button--yellow small' route='app.pages.user_introduction'>For Pirater</Link>
            <Link className='button button--yellow small' route='app.pages.parent_introduction'>For forældre</Link>
            <Link className='button button--yellow small' route='app.pages.contact'>Kontakt os</Link>
            <Link className='button button--yellow small' href={router.url('storage/documents/Privatlivspolitik.pdf')} newTab>Privatlivspolitik</Link>
          </div>
        </TextHeaderWorld>

        <Section>

          <TextImage img={router.url('images/about/children-working-together.jpg')}>
            <p>
              På Piratskibet kan børn og unge i fællesskab styrke deres kompetencer inden for
              IT-kreativitet ved at udforske en verden af kvalitetsindhold særligt målrettet børn i alderen 10-12 år.
            </p>
            <p>
              Piratskibet har til formål at understøtte Coding Pirates eksisterende arbejde ved at fungere som
              interessevækkende platform for kommende pirater, samtidigt med at platformen skaber et socialt rum,
              hvor eksisterende pirater kan udveksle idéer og skabe bånd på tværs af landet.
            </p>
            <p>
              Så hvad er en pirat? I Coding Pirates er en pirat et barn/ung der har eller er i gang med at opbygge alle de nødvendige mentale,
              tekniske og kritiske evner, der skal til for at begå sig i det hav af elektronik og digitale verdener, der omgiver os hver dag.
            </p>
            <p>
              Det ser vi som helt essentielt, og derfor understøtter Piratskibet Coding Pirates’ eksisterende mission og vision om at styrke børn
              og unges teknologiske forestillingsevne, opfindsomhed og skaberkraft, og så ruster det dem til i fremtiden at kunne løse de teknologiske udfordringer.
            </p>
          </TextImage>
        </Section>

        <Section>
          <TextImage fit={false} img={router.url('img/logos/industriens-fond.jpg')} direction='reverse'>
            <b>Særlig tak til:</b>
            <p>
              Piratskibet er først og fremmest blevet en realitet på grund af finansiel støtte fra <Link newTab href='https://www.industriensfond.dk' label='Industriens Fond' />, som tidligt så potentialet i Coding Pirates’ arbejde.
              Industriens Fond kunne se styrken i at udvikle en onlineafdeling, der kan støtte op om arbejdet,
              der finder sted i vores mange fysiske afdelinger i hele landet.
            </p>
          </TextImage>
        </Section>

        <Section>
          <TextImage fit={false} img={router.url('img/logos/coding_pirates.png')}>
            <b>Særlig tak til:</b>
            <p>
              Derudover skal der lyde en meget stor tak til alle frivillige i <Link newTab href='https://codingpirates.dk' label='Coding Pirates' />, Coding Pirates Denmarks hovedbestyrelse,
              Piratskibets Advisory Board (Lone Dirckinck-Holmfeld, Rikke Toft Nørgård, Andreas Lieberoth, Gunver Majgaard og Jonas Sindal Birk),
              Styregruppen for Piratskibet (Sune Nilausen, Lis Zacho, Mikkel Kisling og Jørgen Tietze), Center for Digital Pædagogik
              og for uvurderlig rådgivning og sparring fra Amos Blanton.
            </p>
          </TextImage>
        </Section>

      </Page>
    )
  }
}
