import React from 'react'
import Page from '@morningtrain/react-app/Page'
import Link from 'widgets/navigation/Link'
import Section from 'layouts/Section'
import TextHeaderWorld from 'widgets/animations/worlds/TextHeaderWorld'
import TextImage from 'layouts/TextImage'
import router from '@morningtrain/helpers/src/router'

export default class Rules extends React.Component {
  render () {
    return (
      <Page>
        <TextHeaderWorld text='Vi skal være gode ved hinanden' />

        <Section>

          <TextImage img={router.url('images/about/children-working-together.jpg')}>
            <h2>Alle brugere på Piratskibet lover, at:</h2>
            <ol>
              <li>
                <b>Vi gør plads til alle</b>
                <p>Vi sætter stor pris på vores forskelligheder. Det er kedeligt, hvis vi alle er ens.</p>
              </li>
              <li>
                <b>Vi er alle lige</b>
                <p>Ingen er bedre end andre, uanset hvad man ved eller kan.</p>
              </li>
              <li>
                <b>Vi hjælper og støtter hinanden</b>
                <p>Det er vores vigtigste opgave at passe på hinanden. Altid.</p>
              </li>
              <li>
                <b>Vi gør plads til forskellige meninger</b>
                <p>Vi giver plads til andres meninger, og vi lytter. Det er helt i orden, at vi ikke altid er enige.</p>
              </li>
              <li>
                <b>Vi gør plads til forskellige grænser</b>
                <p>Hvad du synes er i orden, er ikke det samme, som hvad andre synes er i orden. Og det er OK.</p>
              </li>
            </ol>
          </TextImage>

          <TextImage img={router.url('images/about/two-children-working-together.jpg')} direction='reverse'>
            <p>
              Hvis du gør noget, der ikke følger de 5 punkter, vil en af Piratskibets frivillige gøre én af de følgende ting:
            </p>
            <ul>
              <li>
                <p>
                  Give dig en advarsel
                </p>
              </li>
              <li>
                <p>
                  Låse din bruger, så du ikke kan uploade, downloade eller skrive
                </p>
              </li>
              <li>
                <p>
                  I værste tilfælde vil du blive bortvist fra Piratskibet
                </p>
              </li>
            </ul>
            <p>
              <b>
                Eksempler på hvad der ikke er i orden
              </b>
            </p>
            <p>
              Listen herunder er kun eksempler. Vores frivillige vil afgøre hver sag hver for sig, men hvis du er i tvivl om noget er okay at gøre så spørg først!
            </p>
            <p>
              Hvad man IKKE skal gøre:
            </p>

            <ul>
              <li>
                <p>
                  Gøre grin med andre eller deres projekter
                </p>
              </li>
              <li>
                <p>
                  Sige grimme ting om folk pga. deres udseende, seksualitet eller holdninger
                </p>
              </li>
              <li>
                <p>
                  Lægge ting op du ikke ejer, eller ikke har fået lov til at lægge op.  Det gælder også hvis man bare linker til det.
                </p>
              </li>
              <li>
                <p>
                  Linke til ting der er upassende, f.eks. voldelige eller seksuelle ting.
                </p>
              </li>
            </ul>
          </TextImage>

          <TextImage img={router.url('images/about/child-with-screen.jpg')}>
            <h2>Vil du gerne i kontakt med os?</h2>
            <p>
              Er man uenig i en frivilligs vurdering, eller har problemer med en frivilligs adfærd, så kan man skrive
              til <a href='mailto:piratskibet@codingpirates.dk'>piratskibet@codingpirates.dk</a>, som bliver
              læst af de ansvarlige for Piratskibet og Coding Pirates Denmark.
            </p>
            <p>
              Herudover vil alle brud på dansk lovgivning blive meldt til politiet.
            </p>
          </TextImage>

        </Section>
      </Page>
    )
  }
}
