import React from 'react'
import Widget from 'widgets/Widget'
import * as Modals from 'support/modals'
import * as Tabs from '@morningtrain/react-tabs'
import EditUserForm from 'widgets/user/EditUserForm'
import EditNotificationsForm from 'widgets/user/EditNotificationsForm'
import UserAvatarEditor from 'widgets/user/UserAvatarEditor'

export default class UserSettingsModal extends Widget {
  constructor (props) {
    super(props)

    this.modal = React.createRef()
  }

  open () {
    return this.modal.current.open()
  }

  render () {
    return (
      <Modals.Modal ref={this.modal} label='Brugerindstillinger'>
        <Tabs.Tabs defaultActive={this.props.defaultTab}>
          <div className='edit-avatar-tabs'>
            <Tabs.TabSwitcher />
          </div>
          <Tabs.Tab slug='avatar' label='Rediger Avatar'>
            <div className='avatar-logged-in'>
              <UserAvatarEditor />
            </div>
          </Tabs.Tab>

          <Tabs.Tab slug='user' label='Rediger Profil'>
            <EditUserForm />
          </Tabs.Tab>

          <Tabs.Tab slug='notifications' label='Notifikationsindstillinger'>
            <EditNotificationsForm />
          </Tabs.Tab>

        </Tabs.Tabs>
      </Modals.Modal>
    )
  }
}

UserSettingsModal.defaultProps = {
  defaultTab: ''
}
