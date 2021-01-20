import React from 'react'
import * as Auth from '@morningtrain/react-auth'
import Link from 'widgets/navigation/Link'
import LoginForm from 'widgets/auth/LoginForm'

export default class BackendLogin extends React.Component {
  render () {
    return (
      <Auth.Check negate>
        <div className='backend-login-widget'>
          <div className='backend-login-widget__inner'>
            <div className='backend-login-widget__header'>
              <Link route='app.home.index'>Tilbage til Piratskibet</Link>
            </div>
            <div className='backend-login-widget__form'>
              <LoginForm />
            </div>
          </div>
        </div>
      </Auth.Check>
    )
  }
}

BackendLogin.defaultProps = {
  label: 'Log ind',
  classNames: null
}
