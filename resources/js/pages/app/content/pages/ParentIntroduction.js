import React from 'react'
import Page from '@morningtrain/react-app/Page'
import router from '@morningtrain/helpers/src/router'
import Section from 'layouts/Section'
import TextImage from 'layouts/TextImage'
import TextHeaderWorld from 'widgets/animations/worlds/TextHeaderWorld'
import Link from 'widgets/navigation/Link'

export default class ParentIntroduction extends React.Component {
  render () {
    return (
      <Page>
        <TextHeaderWorld text='For forældre'>
          <div className='buttons-wrap'>
            <Link className='button button--yellow small' route='app.pages.about'>Tilbage</Link>
          </div>
        </TextHeaderWorld>

        <Section>

          <TextImage img={router.url('images/about/child-lego-bricks.jpg')}>
            <h2>Piratskibet er et online fællesskab, hvor børn kan lære at være kreative med teknologi</h2>
            <p>
              Dit barn lærte at gå, tale og cykle via legende forsøg - det er det samme med teknologi: børn lærer bedst, når de er frie til at udforske og være kreative. I dag findes der et hav af nye teknologier, som børn kan lære.
              Både programmeringssprog og “micro controllers” kan ses som en slags fingermaling og farveblyanter for det 21. århundrede,
              som børn nemt og sjovt kan lære gennem leg og kreativ tænkning. Alt dette matcher den nationale indsats omkring
              teknologiforståelse i de danske folkeskoler, som du kan læse mere om her:
            </p>
            <p>
              <ul>
                <li>
                  <a href='https://www.uvm.dk/aktuelt/nyheder/uvm/2018/dec/181221-indholdet-i-forsoegsfaget-teknologiforstaaelse-er-klar'>
                    Undervisningsministeriet om Teknologiforståelse
                  </a>
                </li>
                <li>
                  <a href='https://www.folkeskolen.dk/646492/eksperternes-udkast-nyt-teknologifag-skal-ruste-elever-til-at-vaere-medskabere-af-et-digitalt-samfund'>
                    Folkeskolen.dk og Ole Sejer Iversen om hvad Teknologiforståelse er
                  </a>
                </li>
              </ul>
            </p>
            <p>
              Vores rolle som forældre og undervisere er at hjælpe dem igang, at udvise oprigtig interesse i deres kreationer og
              idéer og at rose deres indsats i at forstå deres verden med disse værktøjer
            </p>
          </TextImage>

          <TextImage img={router.url('images/about/child-with-mentor.jpg')} direction='reverse'>
            <h2>Piratskibet er et sikkert og venligt miljø</h2>
            <p>
              Med Piratskibet har vi skabt et fællesskab, hvor børn kan bruge teknologier til at skabe og dele ting,
              som de finder interessant og meningsfuldt. Piratskibet er et trygt sted, hvor børn færdes i et positivt og venligt miljø.
              Dette sikres ved, at et stærkt hold af frivillige modererer Piratskibet.
              Derudover er mange af Coding Pirates’ frivillige selv aktive på Piratskibet og
              viser sig som de gode eksempler baseret ud fra vores officielle regelsæt <Link route='app.pages.rules' label='“vi skal være gode ved hinanden”' />
            </p>
            <p>
              Hvis man oplever noget, der overskrider regelsættet, kan man rapportere sådanne hændelser til Coding Pirates.
              Sagen vil blive gennemgået af Coding Pirates uanset hændelsens type og størrelse.
            </p>
            <blockquote>
              Citat / highlight boks: “Rather than trying to minimize screen time, I think parents and teachers should try to maximize creative time.” - Mitchel Resnick, Leder af MIT’s Scratch projekt.
            </blockquote>
          </TextImage>

          <TextImage img={router.url('images/about/child-with-screen.jpg')}>
            <h2>Ikke al skærmtid er ens</h2>
            <p>
              Piratskibet sigter efter at skabe en gejst for kreativ brug af computere og andre teknologier. Netop derfor mener vi ikke, at alle former for skærmtid kan skæres over én kam.
              I dag har mange børn (og voksne) muligheder for at slå hjernen fra foran en skærm.
            </p>
            <p>
              Men passiv iagttagelse af en skærm og aktiv brug af online værktøjer er ikke det samme. Piratskibet vil det sidste - vi inviterer børn til at skabe spændende indhold og derefter dele idéerne med andre. Dét, mener vi, er sund og fornuftig skærmtid!
            </p>
            <p>
              Vi håber, at du som forælder kan nikke genkendende til denne skærmtids-differentiering og se hvorfor Piratskibet er en god og brugbar måde for børn at bruge noget af sin tid på.
            </p>
          </TextImage>

        </Section>
      </Page>
    )
  }
}
