import React from 'react'
import * as Fields from 'support/fields'

export default class SuspendUser extends React.Component {
  get actionName () {
    return 'App\\Support\\Services\\Moderation\\Actions\\SuspendUser'
  }

  render () {
    return (
      <Fields.Case when={this.actionName}>
        <Fields.Input name='note' label='Kommentar' required />
        <Fields.Date name='from' label='Fra' time />
        <Fields.Date name='to' label='Til' time />

        <input type='submit' value='Udfør' />
      </Fields.Case>
    )
  }
}
