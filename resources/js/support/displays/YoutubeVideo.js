import React from 'react'
import { inject } from '@morningtrain/react-decorators'
import Display from '@morningtrain/react-displays/Display'

@inject(['model'])
export default class YoutubeVideo extends Display {

  constructor () {
    super()

    this.state = {
      loaded: false,
    }
  }

  renderIframe () {
    return (
      <div className="youtube-player">
        <iframe
          src={`https://www.youtube.com/embed/${this.value}?autoplay=1&rel=0`}
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
