import React from 'react'
import { Model } from '@morningtrain/react-resources'
import * as Filters from 'support/filters'
import { AvatarEditor } from 'services/avatar'
import RefreshUserReaction from 'widgets/auth/RefreshUserReaction'
import * as Auth from '@morningtrain/react-auth'

export default class UserAvatarEditor extends React.Component {
  render () {
    return (
      <Auth.Check>
        <Model resourceName='user_avatar' submittable>
          <Filters.Env envKey='user.user_avatar_id' constraint='user_avatar' />
          <RefreshUserReaction />

          <div className='form-content avatar-form'>
            <div className='avatar-editor'>
              <AvatarEditor name='items' />
            </div>
          </div>

          <div className='modal-footer'>
            <input type='submit' value='Gem' />
          </div>
        </Model>
      </Auth.Check>
    )
  }
}
