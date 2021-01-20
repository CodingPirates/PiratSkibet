import React from 'react'
import Page from '@morningtrain/react-app/Page'
import { router } from '@morningtrain/helpers'
import { Redirect } from '@morningtrain/react-resources'
import ForumWorld from 'widgets/animations/worlds/ForumWorld'
import { Fieldset } from 'layouts'
import * as Auth from '@morningtrain/react-auth'
import ResetPasswordForm from 'widgets/auth/ResetPasswordForm'

export default class PasswordReset extends React.Component {
  render () {
    return (
      <Page>
        <ForumWorld classNames='forum-world' />
        <Auth.Check negate>
          <div className='reset-password'>
            <Fieldset cols={1}>
              <ResetPasswordForm token={router.parameter('token')} />
            </Fieldset>
          </div>
        </Auth.Check>
        <Auth.Check>
          <Redirect route='app.home.index' />
          <div className='reset-password--logged-in'>
            <div className='reset-password--logged-in__content'>
              <div className='reset-password--logged-in__title'>
                Du er allerede logget ind
              </div>
              <div>
                <a href={router.url('')} className='button button--yellow'>
                  Forside
                </a>
              </div>
            </div>
          </div>
        </Auth.Check>
      </Page>
    )
  }
}
