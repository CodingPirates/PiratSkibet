import React from 'react'
import * as Errors from '@morningtrain/react-errors'

export default class Widget extends React.Component {
  renderWidget () {
    return null
  }

  render () {
    return (
      <Errors.Boundary>
        {this.renderWidget()}
      </Errors.Boundary>
    )
  }
}
