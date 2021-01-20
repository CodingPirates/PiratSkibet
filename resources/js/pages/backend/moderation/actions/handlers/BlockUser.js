import React from 'react'
import * as Fields from 'support/fields'

export default class BlockUser extends React.Component {
  get actionName () {
    return 'App\\Support\\Services\\Moderation\\Actions\\BlockUser'
  }

  render () {
    return (
      <Fields.Case when={this.actionName}>
        <Fields.Input name='note' label='Kommentar' required />
        <Fields.Checkbox name='recursive' label='Fjern alt indhold' required />

        <input type='submit' value='Udfør' />
      </Fields.Case>
    )
  }
}
