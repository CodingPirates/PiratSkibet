import React from 'react'
import Animation from 'widgets/animations/Animation'
import shortid from 'shortid'
import Link from 'widgets/navigation/Link'
import { Env } from '@morningtrain/helpers'

export default class Television extends Animation {
  constructor (props) {
    super(props)
    this.screenId = shortid.generate()
  }

  static get defaultProps () {
    return {
      ...super.defaultProps
    }
  }

  get transitionsProps () {
    return {}
  }

  get classNames () {
    return 'television-'
  }

  get width () {
    return this.scaleWidth(100) + '%'
  }

  get styles () {
    return {
      ...super.styles
    }
  }

  get channel () {
    const channels = Env.get('content.twitch.channels', [])

    if (channels.length > 0) {
      return channels[0]
    }

    return {}
  }

  get isLive () {
    return this.channel.is_live === true
  }

  renderContent () {
    return (
      <Link route='app.tv.index'>
        <svg className={'television ' + (this.isLive ? 'live' : '')} version='1.1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 353 121'>
          <defs>
            <filter id={'blurScreen--' + this.screenId} x='-50%' y='-50%' width='200%' height='200%'>
              <feGaussianBlur stdDeviation='6' />
            </filter>
          </defs>

          <polygon className='television__water television__water--tr' points='123.7,76.2 220.7,111.2 342.6,65.1 199.2,38.1 ' />
          <polygon className='television__water' points='321.5,66.4 195.6,44.1 133.6,76.2 222.8,105.4 ' />

          <g className='television__body'>
            <polygon className='st2' points='140.4,76.2 152.7,50.3 147.6,44.6 154.3,28.4 220.7,98.8' />
            <polygon className='st3' points='154.3,28.3 241.3,10.1 302.4,67.6 220.7,98.8' />
            <polygon className='st4' points='233.9,11.7 161.2,30.4 204.2,81.4 154.3,28.3' />

            <polygon className='st5' points='240,22.1 186.2,36.7 222.1,78.5 277.4,57' />
            <polygon className='st5--light' points='240,22.1 186.2,36.7 222.1,78.5 277.4,57' filter={`url(#blurScreen--${this.screenId})`} />

            <path className='st2' d='M189.1,40.4l44.8-13.6c0,0,4.8-2,8.3,1.4c3.6,3.3,32.1,29.8,32.1,29.8l3.1-1.2l-37.5-34.8l-53.7,14.7L189.1,40.4z' />
            <path className='st6' d='M278.8,70.7l-8.3-7.2l9.4-3.9l8.3,7.2L278.8,70.7z' />
            <path className='st6' d='M267.3,75.6l-8.3-7.2l9.4-3.9l8.3,7.2L267.3,75.6z' />
            <polygon className='st7' points='273.6,62.3 279.4,67.3 285.8,64.6 280,59.6' />
            <polygon className='st7' points='262.1,67.2 267.9,72.2 274.3,69.6 268.5,64.6' />
            <g>
              <path className='st8' d='M237.8,40c4.2,0.4,7.7-1,8-3.2c0.2-2.2-3-4.3-7.1-4.7c-4.2-0.4-7.7,1-8,3.2C230.4,37.5,233.6,39.6,237.8,40' />
              <path className='st9' d='M228.6,59.2c6.5,1.9,12.8,0.2,13.9-3.8c1.1-4-3.3-8.7-9.8-10.6s-12.8-0.2-13.9,3.8C217.6,52.6,222,57.4,228.6,59.2' />
            </g>
            <polygon className='st10' points='152.3,50.3 187.8,88.1 147.6,59.6' />
          </g>

          <path className='st2 television__wire' d='M113.3,89.6c-0.3-0.2-33.6-19-59.6-19c-25.6,0-41.2,18.5-41.4,18.6l-2.4-2c0.7-0.8,16.7-19.8,43.8-19.8c26.8,0,59.7,18.6,61.1,19.4L113.3,89.6z' />
          <polygon className='television__water' points='310.8,64.6 220.8,98.8 136,75 133.6,76.2 222.8,105.5 321.5,66.4 ' />
        </svg>
      </Link>
    )
  }
}
