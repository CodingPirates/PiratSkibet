import React from 'react'
import * as Fields from 'support/fields'

export default class Text extends React.Component {
  render () {
    return (
      <Fields.Case when='text'>
        <Fields.Input name='meta.title' label='Titel' />
        <Fields.Editor name='meta.text' label='Tekst' />
      </Fields.Case>
    )
  }
}
