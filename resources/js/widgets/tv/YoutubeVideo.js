import React from 'react'
import PropTypes from 'prop-types'
import Widget from 'widgets/Widget'

export default class YoutubeVideo extends Widget {

  constructor (props) {
    super(props)

    this.state = {
      // When embedding a youtube channel livestream link
      // We don't have the specific video id
      // And therefore can't preload the image
      loaded: props.isChannel,
    }
  }

  get src () {
    if (this.props.isChannel) {
      return `https://www.youtube.com/embed/live_stream?channel=${this.props.videoId}`
    }

    return `https://www.youtube.com/embed/${this.props.videoId}?autoplay=1&rel=0`
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
        <img src={`//i.ytimg.com/vi/${this.props.videoId}/hqdefault.jpg`}
             alt={'video thumbnail'}/>
        <div className={'play'}/>
      </div>
    )
  }

  renderWidget () {
    return this.state.loaded ? this.renderIframe() : this.renderPreview()
  }
}

YoutubeVideo.defaultProps = {
  isChannel: false,
  videoId:   null,
}

YoutubeVideo.propTypes = {
  videoId:   PropTypes.string.isRequired,
  isChannel: PropTypes.bool,
}
