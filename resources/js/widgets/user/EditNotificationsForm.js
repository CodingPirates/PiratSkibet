import React from 'react'
import { Model } from '@morningtrain/react-resources'
import * as Filters from 'support/filters'
import * as Fields from 'support/fields'
import RefreshUserReaction from 'widgets/auth/RefreshUserReaction'
import { Env, Enum } from '@morningtrain/helpers'
import * as Auth from '@morningtrain/react-auth'

export default class EditNotificationsForm extends React.Component {
  constructor (props) {
    super(props)

    this.labels = new Enum('notification_type')
    this.editable = Env.get('notification_settings')
  }

  label (value) {
    return this.labels.label(value)
  }

  renderFields () {
    return this.editable.map(field => (
      <Fields.Checkbox key={field} name={'notification_settings.' + field} label={this.label(field)} />
    ))
  }

  render () {
    return (
      <Auth.Check>
        <Model resourceName='user' submittable submitoperationName='edit_notifications'>
          <Filters.Env envKey='user.id' constraint='user' />
          <RefreshUserReaction />

          <div className='form-content form-content__tabs'>
            {this.renderFields()}
          </div>

          <div className='modal-footer'>
            <input type='submit' value='Gem' />
          </div>

        </Model>
      </Auth.Check>
    )
  }
}
