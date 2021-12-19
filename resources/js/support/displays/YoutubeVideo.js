import React from 'react'
import PropTypes from 'prop-types'
import { inject } from '@morningtrain/react-decorators'
import Display from '@morningtrain/react-displays/Display'
import { default as Widget } from 'widgets/tv/YoutubeVideo'

@inject(['model'])
export default class YoutubeVideo extends Display {
  render () {
    return <Widget videoId={this.value} isChannel={this.props.isChannel}/>
  }
}

YoutubeVideo.defaultProps = {
  ...Display.defaultProps,
  isChannel: false,
}

YoutubeVideo.propTypes = {
  isChannel: PropTypes.bool,
}
