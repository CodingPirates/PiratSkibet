import React from 'react'
import * as Fields from 'support/fields'

export default class ActionHandler extends React.Component {
  render () {
    const { actionName } = this.props
    if (!actionName) return null

    return (
      <Fields.Case when={actionName}>
        <Fields.Input name='note' label='Kommentar' required />

        <input type='submit' value='Udfør' />
      </Fields.Case>
    )
  }
}
