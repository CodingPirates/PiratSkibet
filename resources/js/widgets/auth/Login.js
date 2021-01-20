import React from 'react'
import { Trigger } from '@morningtrain/react-modals'
import * as Auth from '@morningtrain/react-auth'

export default class Login extends React.Component {
  render () {
    const { label, className } = this.props

    return (
      <Auth.Check negate>
        <Trigger name='loginModal'>
          <button className={className}>{label}</button>
        </Trigger>
      </Auth.Check>
    )
  }
}

Login.defaultProps = {
  label: 'Log ind',
  classNames: null
}
