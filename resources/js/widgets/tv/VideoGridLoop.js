import React from 'react'
import { Iterator } from '@morningtrain/react-resources'
import * as Displays from "support/displays";

export default class VideoGridLoop extends React.Component {

  render () {
    return (
      <Iterator>
        <div className={'youtube-video'}>
          <Displays.YoutubeVideo name={'embed_id'}/>
        </div>
      </Iterator>
    )
  }
}
