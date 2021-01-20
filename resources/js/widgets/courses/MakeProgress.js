import React from 'react'
import * as Auth from '@morningtrain/react-auth'
import * as Fields from 'support/fields'
import * as Actions from 'support/actions/backend'

export default class MakeProgress extends React.Component {
  render () {
    return (
      <Auth.Can permission='api.courses.courses.make_progress' operation={null}>
        <Fields.Case name='is_completed' when={false}>
          <Actions.Trigger
            label='Afslut forløb'
            targetOperationName='read'
            operationName='make_progress'
            resourceName='courses.courses'
            className='button button--yellow'
          />
        </Fields.Case>
      </Auth.Can>
    )
  }
}
