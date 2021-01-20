import React from 'react'
import { Model } from '@morningtrain/react-resources'
import { Reaction } from '@morningtrain/react-auth'
import ForgotPasswordLink from '@morningtrain/react-auth/ForgotPasswordLink'
import * as Fields from 'support/fields'
import { Fieldset } from 'layouts'
import JoinErrorsHook from 'support/hooks/JoinErrorsHook'

export default class LoginForm extends React.Component {
  static get defaultProps () {
    return {
      beforeFooter: null
    }
  }

  render () {
    return (
      <Model namespace='auth' resourceName='login' submitoperationName='login' operationName='login' submittable>
        <Reaction />
        <JoinErrorsHook fieldName='login' errorName={['username', 'email']} />

        <div className='form-content login'>
          <Fieldset cols={2}>
            <Fields.Input name='login' label='Brugernavn eller Email' required autoFocus />
            <Fields.Input name='password' label='Adgangskode' type='password' required />

          </Fieldset>
        </div>

        <div className='modal-footer login'>
          <div className='modal-footer-left'>
            <Fields.Checkbox name='remember' label='Husk mig' className='remember-me' boxed />
            <ForgotPasswordLink />
          </div>
          <div className='modal-footer-right'>
            <input type='submit' value='Log ind' />
          </div>
        </div>
      </Model>
    )
  }
}
