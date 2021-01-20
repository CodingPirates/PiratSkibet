import React from 'react'
import { Env } from '@morningtrain/helpers'
import Avatar from './Avatar'
import AvatarFetcher from './AvatarFetcher'

export default class UserAvatar extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      svg: this.defaultSVG
    }

    if (props.user_id && !this.props.svg) {
      AvatarFetcher
        .fetch(props.user_id)
        .then(avatarSVG => {
          this.setState({ svg: avatarSVG })
        })
    }
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (prevProps.svg !== this.props.svg) {
      this.setState({ svg: this.defaultSVG })
    }
  }

  get defaultSVG () {
    if (!this.props.user_id && !this.props.svg) {
      return Env.get('user.avatar') || (this.props.svg || '')
    }

    return this.props.svg || ''
  }

  render () {
    return <Avatar svg={this.state.svg} />
  }
}
