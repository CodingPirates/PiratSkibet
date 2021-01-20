import React from 'react'
import * as Errors from '@morningtrain/react-errors'
import BackendTopNavigation from 'widgets/navigation/BackendTopNavigation'
import BackendSideNavigation from 'widgets/navigation/BackendSideNavigation'
import * as Auth from '@morningtrain/react-auth'
import BackendLogin from 'widgets/auth/BackendLogin'

export default class Backend extends React.Component {
  render () {
    return (
      <>
        <Auth.Check negate>
          <BackendLogin />
        </Auth.Check>
        <Auth.Check>
          <div className='page-wrapper'>
            <div className='content admin-dashboard'>
              <BackendTopNavigation />

              <div className='admin-dashboard__wrap'>
                <BackendSideNavigation />

                <Errors.Boundary>
                  <div className='admin-dashboard__content'>
                    {this.props.children}
                  </div>
                </Errors.Boundary>
              </div>
            </div>
          </div>
        </Auth.Check>
      </>
    )
  }
}
