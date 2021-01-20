import React from 'react'
import * as Modals from 'support/modals'
import * as Auth from '@morningtrain/react-auth'

export default class ForgotPassword extends React.Component {
  openModal () {
    return this.modal.open()
  }

  renderModal () {
    return (
      <Modals.Modal ref={ref => this.modal = ref} label='Glemt Adgangskode'>
        <Auth.ForgotPassword />
      </Modals.Modal>
    )
  }

  render () {
    return (
      <>
        <Auth.Check negate>
          <button onClick={this.openModal.bind(this)} type='button' className='forgot-password-link'>Glemt adgangskode</button>
          {this.renderModal()}
        </Auth.Check>
      </>
    )
  }
}
