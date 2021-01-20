import React from 'react'
import RegisterForm from 'support/auth/RegisterForm'
import * as Modals from 'support/modals'
import * as Auth from '@morningtrain/react-auth'

export default class Register extends React.Component {
  openModal () {
    return this.modal.open()
  }

  renderModal () {
    return (
      <Modals.Modal ref={ref => this.modal = ref} label='Opret Pixel Pirat'>
        <RegisterForm />
      </Modals.Modal>
    )
  }

  render () {
    const { label, className } = this.props

    return (
      <Auth.Check negate>
        <button
          className={className}
          onClick={this.openModal.bind(this)}
        >{label}
        </button>
        {this.renderModal()}
      </Auth.Check>
    )
  }
}

Register.defaultProps = {
  label: 'Tilmeld',
  classNames: null
}
