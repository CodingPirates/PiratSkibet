import React from 'react'
import PropTypes from 'prop-types'
import { inject } from '@morningtrain/react-decorators'
import Display from '@morningtrain/react-displays/Display'

@inject(['model'])
export default class YoutubeVideo extends Display {

  constructor (props) {
    super(props)

    this.state = {
      // When embedding a youtube channel livestream link
      // We don't have the specific video id
      // And therefore can't preload the image
      loaded: props.is_channel,
    }
  }

  get src() {
    if (this.props.is_channel) {
      return `https://www.youtube.com/embed/live_stream?channel=${this.value}`;
    }

    return `https://www.youtube.com/embed/${this.value}?autoplay=1&rel=0`;
  }

  renderIframe () {
    return (
      <div className="youtube-player">
        <iframe
          src={this.src}
          frameBorder='0'
          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
      </div>
    )
  }

  renderPreview () {
    return (
      <div className="youtube-player"
           onClick={() => this.setState({ loaded: true })}>
        {/* ytimg.com is YouTubes own thumbnail CDN */}
        <img src={`//i.ytimg.com/vi/${this.value}/hqdefault.jpg`}
             alt={'video thumbnail'}/>
        <div className={'play'}/>
      </div>
    )
  }

  render () {
    return this.state.loaded ? this.renderIframe() : this.renderPreview()
  }
}

YoutubeVideo.defaultProps = {
  is_channel: false,
}

YoutubeVideo.propTypes = {
  is_channel: PropTypes.bool,
}
