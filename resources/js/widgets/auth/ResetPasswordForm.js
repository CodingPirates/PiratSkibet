import React from 'react'
import { Model } from '@morningtrain/react-resources'
import { Reaction } from '@morningtrain/react-auth'
import * as Fields from 'support/fields'
import PropTypes from 'prop-types'
import { Fieldset } from 'layouts'

export default class ResetPasswordForm extends React.Component {
  static get propTypes () {
    return {
      token: PropTypes.string.isRequired
    }
  }

  static get defaultProps () {
    return {
      token: ''
    }
  }

  render () {
    return (
      <Model namespace='auth' resourceName='password' submitoperationName='reset_password' operationName='reset_password' submittable>
        <Reaction />

        <div className='modal-header'>
          Nulstil adgangskode
        </div>

        <div className='form-content'>
          <Fieldset>
            <Fields.Hidden name='token' value={this.props.token} required />
            <Fields.Input name='email' type='email' label='Email' required />
            <Fields.Input name='password' label='Angiv adgangskode' type='password' required />
            <Fields.Input name='password_confirmation' label='Gentag adgangskode' type='password' required />
          </Fieldset>
        </div>

        <div className='modal-footer'>
          <input type='submit' />
        </div>
      </Model>
    )
  }
}
