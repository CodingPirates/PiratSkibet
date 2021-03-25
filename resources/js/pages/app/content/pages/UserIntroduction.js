import React from 'react'
import Page from '@morningtrain/react-app/Page'
import Section from 'layouts/Section'
import TextHeaderWorld from 'widgets/animations/worlds/TextHeaderWorld'
import TextImage from 'layouts/TextImage'
import router from '@morningtrain/helpers/src/router'
import Link from 'widgets/navigation/Link'
import { Env } from '@morningtrain/helpers'

export default class UserIntroduction extends React.Component {
  render () {
    return (
      <Page>
        <TextHeaderWorld text='For Pirater'>
          <div className='buttons-wrap'>
            <Link className='button button--yellow small' route='app.pages.about'>Tilbage</Link>
          </div>
        </TextHeaderWorld>

        <Section>

          <TextImage img={router.url('images/about/child-lego-bricks.jpg')}>
            <h2>I. Hvad er Piratskibet?</h2>
            <p>
              Piratskibet er et online sted, hvor du kan skabe fede projekter med teknologi, og dele dem med andre jævnaldrende, som har samme interesser som dig.
            </p>
          </TextImage>

          <TextImage img={router.url('images/about/child-with-mentor.jpg')} direction='reverse'>
            <h2>II. Hvordan kommer jeg i gang?</h2>
            <p>
              Det er nemt at gå på opdagelse i Piratskibet! Du kan starte med at kigge i de eksisterende projekter,
              som både børn og frivillige har lagt op. Du vil lynhurtigt finde ud af, hvad du synes er spændende.
              Alt hvad der ligger på Piratskibet må man “remixe”. Det betyder, at du gerne må
              tage andre projekter og lave noget nyt ud af dem. Hvis du lægger dit eget projekt op,
              som er baseret på andres arbejde, er det god stil at kreditere dem, du er blevet inspireret af.
            </p>
            <p>
              Du kan også hoppe ind i <a href={Env.get('services.discord.url', '#')} target='_blank'>Piratsnak</a>. Her kan du se, hvad andre arbejder på eller måske se, hvilke gode film der går i biografen for tiden.
            </p>
            <p>
              Sidst men ikke mindst kan du tage forbi Kodehavet, hvor du kan lære nye teknologier.
            </p>
          </TextImage>

          <TextImage img={router.url('images/about/child-with-screen.jpg')}>
            <h2>III. Hvad er reglerne?</h2>
            <p>
              Piratskibet er et venligt og kreativt fællesskab, hvor alle folk med alle mulige interesser er velkomne.
              Det betyder, at vi selvfølgelig skriver venligt til hinanden, når vi kommenterer på hinandens projekter.
              På den måde sørger vi samtidig for, at alle synes, Piratskibet er et rart og fedt sted at være.
            </p>
            <p>
              Vi har lavet et regelsæt, som findes <Link route='app.pages.rules' label='her' />. Der står bl.a.:
            </p>
            <ul>
              <li>Vi gør plads til alle</li>
              <li>Vi er alle lige</li>
              <li>Vi hjælper og støtter hinanden</li>
              <li>Vi gør plads til forskellige meninger</li>
              <li>Vi gør plads til forskellige grænser</li>
            </ul>
          </TextImage>

          <TextImage img={router.url('images/about/children-getting-help.jpg')} direction='reverse'>
            <h2>IV. Hvad hvis der er noget, jeg ikke kan finde ud af?</h2>
            <p>
              Det er helt naturligt, at man nogle gange går i stå midt i et spændende projekt. Men frygt ej -
              der er helt sikkert en god løsning på dit problem. Mange af de frivillige
              arbejder til dagligt som professionelle programmører og teknologi-hajer,
              og de vil rigtig gerne give gode tips og tricks til, hvordan du kommer videre. Der er flere måder hvorpå, du kan få hjælp:
            </p>
            <ul>
              <li>Du kan lave en kommentar og spørgsmål på projekter, der er lagt op på Piratskibet.</li>
              <li>Du kan også spørge på <a href={Env.get('services.discord.url', '#')} target='_blank'>Piratsnak</a>, hvor du kan stille spørgsmål om tekniske udfordringer eller andet, som du har brug for at vide. </li>
              <li>Hvis du går til Coding Pirates, kan du også spørge om hjælp til din lokale klubaften.</li>
            </ul>
            <p>
              Det er en rigtig god ide at dele et link til dit projekt - også selvom det ikke er færdigt. Det gør det meget nemmere at hjælpe, når vi kan se dit projekt.
            </p>
            <p>
              Når du finder en løsning på dit problem, så husk at skrive det i Piratsnak-chatten. Så kan andre pirater nemlig også få gavn af din løsning.
            </p>
          </TextImage>

          <TextImage img={router.url('images/about/children-working-together.jpg')}>
            <h2>V. Har du forslag eller kommentarer?</h2>
            <p>
              Vi vil meget gerne høre fra dig, hvis du har gode forslag eller kommentarer til Piratskibet. Hold dig ikke tilbage!
              Vi ved nemlig, at dine idéer og tanker kan være med til at gøre Piratskibet endnu bedre.
              Du kan sende en e-mail til <a href='mailto:piratskibet@codingpirates.dk'>piratskibet@codingpirates.dk</a>.
            </p>
          </TextImage>

        </Section>
      </Page>
    )
  }
}
