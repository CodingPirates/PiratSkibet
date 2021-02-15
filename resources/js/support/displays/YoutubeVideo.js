import React from 'react'
import {inject} from "@morningtrain/react-decorators";
import Display from "@morningtrain/react-displays/Display";

@inject(['model'])
export default class YoutubeVideo extends Display {

  render () {
    return (
      <iframe
        width='560' height='315'
        src={this.value}
        frameBorder='0'
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      />
    )
  }
}
