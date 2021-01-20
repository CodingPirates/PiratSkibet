import React from 'react'
import PropTypes from 'prop-types'

export default class Embed extends React.Component {
  static get propTypes () {
    return {
      allowfullscreen: PropTypes.bool
    }
  }

  static get defaultProps () {
    return {
      width: '100%',
      height: 480,
      allowfullscreen: true,
      channel: null,
      video: null,
      collection: null,
      autoplay: false,
      chat: false
    }
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    console.log('embed', this.element)
  }

  componentDidMount () {
    const options = {
      allowfullscreen: this.props.allowFullScreen,
      width: this.props.width,
      height: this.props.height,
      autoplay: this.props.autoplay
    }

    if (this.props.channel) {
      options.channel = this.props.channel
    }

    if (this.props.collection) {
      options.collection = this.props.collection
    }

    if (this.props.video) {
      options.video = this.props.video
    }

    this.embed = new Twitch.Player(this.element, options)
  }

  renderChat () {
    if (!this.props.chat) {
      return null
    }

    const source = 'https://www.twitch.tv/embed/' + this.props.channel + '/chat'

    return (
      <iframe
        frameBorder='0'
        scrolling='no'
        id='chat_embed'
        src={source}
        height='500'
        width='350'
      />
    )
  }

  render () {
    return (
      <div className='twitch-embed-container'>
        <div ref={ref => this.element = ref} className='twitch-player' />
        {this.renderChat()}
      </div>
    )
  }
}
