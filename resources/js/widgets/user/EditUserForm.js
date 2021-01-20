import React from 'react'
import { Model, Trigger } from '@morningtrain/react-resources'
import * as Filters from 'support/filters'
import * as Fields from 'support/fields'
import FieldWrapper from '@morningtrain/react-fields/layouts/FieldWrapper'
import RefreshUserReaction from 'widgets/auth/RefreshUserReaction'
import Checkmark from 'widgets/landlubber/Checkmark'
import moment from 'moment'
import { Fieldset } from 'layouts'
import * as Auth from '@morningtrain/react-auth'

export default class EditUserForm extends React.Component {
  // TODO export this elsewhere
  static get birthdayOptions () {
    const currentYear = moment().year()

    return {
      max: moment(),
      pikadayOptions: {
        yearRange: [
          currentYear - 100,
          currentYear
        ]
      }
    }
  }

  render () {
    return (
      <Auth.Check>
        <Model resourceName='user' submittable>
          <Filters.Env envKey='user.id' constraint='user' />
          <RefreshUserReaction />

          <div className='form-content form-content__tabs'>
            <Fieldset cols={2}>
              <Fields.Input name='name' label='Fulde navn' required />
              <Fields.Input name='email' label='Mail' type='email' required />
              <Fields.Input name='parent_email' label='Forældremail' type='email' required />

              <Fields.Case name='parent_email' exists>
                <FieldWrapper label='Bekræft forældremail'>
                  <Fields.Case name='email_verified_at' exists={false}>
                    {/* TODO - needs permission checks */}
                    <Trigger
                      namespace='auth'
                      resourceName='register'
                      operationName='resend_verification_email'
                      label='Gensend bekræftelses mail'
                      className='button button--pink small'
                    />
                  </Fields.Case>

                  <Fields.Case name='email_verified_at' exists>
                    <div className='checklist-item checklist-item--field'>
                      <Checkmark checked />
                      <span>Forældremail er bekræftet</span>
                    </div>
                  </Fields.Case>
                </FieldWrapper>
              </Fields.Case>

              <Fields.Case name='parent_email' exists={false}>
                <Fields.Blank />
              </Fields.Case>

              <Fields.Case name='birthday' exists>
                <Fields.Date name='birthday' label='Fødselsdag' required {...EditUserForm.birthdayOptions} />
              </Fields.Case>

              <Fields.Case name='birthday' exists={false}>
                <Fields.Date name='birthday' label='Fødselsdag' required={false} {...EditUserForm.birthdayOptions} />
              </Fields.Case>

              <Fields.Case name='zipcode' exists>
                <Fields.Input name='zipcode' label='Postnummer' required />{/* TODO - make zipcode field */}
              </Fields.Case>

              <Fields.Case name='zipcode' exists={false}>
                <Fields.Input name='zipcode' label='Postnummer' required={false} />{/* TODO - make zipcode field */}
              </Fields.Case>

              <Fields.Editor name='description' label='Profil beskrivelse' />
            </Fieldset>

            <Fieldset cols={2}>
              <Fields.Input name='current_password' label='Nuværende adgangskode' type='password' />
              <Fields.Blank />
              <Fields.Input name='password' label='Ny adgangskode' type='password' />
              <Fields.Input name='password_confirmation' label='Gentag ny adgangskode' type='password' />
            </Fieldset>
          </div>

          <div className='modal-footer'>
            <input type='submit' value='Gem' />
          </div>

        </Model>
      </Auth.Check>
    )
  }
}
