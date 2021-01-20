import React from 'react'
import Widget from 'widgets/Widget'
import { Model } from '@morningtrain/react-resources'
import { Fieldset } from 'layouts'
import * as Auth from '@morningtrain/react-auth'
import * as Modals from 'support/modals'
import * as Fields from 'support/fields'
import * as Filters from 'support/filters'
import RefreshUserReaction from 'widgets/auth/RefreshUserReaction'
import CloseModalOnSuccess from 'support/reactions/CloseModalOnSuccess'

export default class PirateVowsModal extends Widget {
  constructor (props) {
    super(props)

    this.modal = React.createRef()
  }

  open () {
    return this.modal.current.open()
  }

  static get terms () {
    return {
      1: {
        title: '1. Vi gør plads til alle',
        label: 'Uanset om en har træben, klap for øjet eller er vandskræk. Vi sætter stor pris på vores forskelligheder. Det er kedeligt, hvis vi alle er ens.'
      },
      2: {
        title: '2. Vi er alle lige',
        label: 'Uanset om en har sejlet flere sømil end en anden. Ingen er bedre end andre, uanset hvor længe man har været pirat.'
      },
      3: {
        title: '3. Vi hjælper og støtter hinanden',
        label: 'Uanset hvad. Vi lader aldrig nogen gå planken ud! Piratens vigtigste opgave er at passe på sine medpirater. Altid.'
      },
      4: {
        title: '4. Vi gør plads til forskellige meninger',
        label: 'Uanset om skipperen mener noget andet end landkrabben. Vi giver plads til andres meninger, og vi lytter. Det er helt i orden, at vi ikke altid er enige.'
      },
      5: {
        title: '5. Vi gør plads til forskellige grænser',
        label: 'Uanset hvor på de syv have, du befinder dig. Hvad du synes er i orden, er ikke det samme, som hvad andre synes er i orden. Og det er OK.'
      },
      6: {
        title: '6. Vi bruger vores piratviden til fællesskabets bedste',
        label: 'Uanset om dine bramsejl er bedre end andres. Vores piratviden er værdifuld. Vi deler den med andre i fællesskabet, så vi alle kan blive klogere.'
      }
    }
  }

  renderTermsFields () {
    return Object.keys(PirateVowsModal.terms).map(index => {
      const key = `vow_${index}`

      return (
        <React.Fragment key={key}>
          <Fields.Checkbox
            id={key} name={key} required
            label={PirateVowsModal.terms[index].title}
            boxed
          />
          <label htmlFor={key}>
            <p>{PirateVowsModal.terms[index].label}</p>
          </label>
        </React.Fragment>
      )
    })
  }

  renderWidget () {
    return (
      <Auth.Check>
        <Modals.Modal ref={this.modal} label='Piratløfter'>
          <Model
            resourceName='user' submittable
            submitoperationName='accept_pirate_vows'
          >
            <CloseModalOnSuccess />
            <Filters.Env envKey='user.id' constraint='user' />
            <RefreshUserReaction />

            <div className='form-content vows-wrapper'>
              <Fieldset cols={1}>
                <Fields.Nested name='vows'>
                  {this.renderTermsFields()}
                </Fields.Nested>
              </Fieldset>
            </div>

            <div className='modal-footer'>
              <input type='submit' value='Gem' />
            </div>
          </Model>
        </Modals.Modal>
      </Auth.Check>

    )
  }
}
