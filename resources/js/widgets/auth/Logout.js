import React from 'react'
import * as Auth from '@morningtrain/react-auth'

export default class Logout extends React.Component {
  render () {
    return (
      <Auth.Check>
        <Auth.Logout className={this.props.className} />
      </Auth.Check>
    )
  }
}
