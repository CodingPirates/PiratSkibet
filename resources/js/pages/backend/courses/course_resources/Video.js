import React from 'react'
import * as Fields from 'support/fields'

export default class Video extends React.Component {
  render () {
    return (
      <Fields.Case when='video'>
        <Fields.Input name='meta.title' label='Titel' />
        <Fields.Input name='meta.link' label='Link' />
      </Fields.Case>
    )
  }
}
