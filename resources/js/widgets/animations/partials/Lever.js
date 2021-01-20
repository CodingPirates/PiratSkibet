import React from 'react'
import Animation from 'widgets/animations/Animation'

export default class Lever extends Animation {
  static get defaultProps () {
    return {
      ...super.defaultProps
    }
  }

  get transitionsProps () {
    return {}
  }

  get classNames () {
    return 'lever-'
  }

  get width () {
    return this.scaleWidth(100) + '%'
  }

  get styles () {
    return {
      ...super.styles
    }
  }

  renderContent () {
    return (
      <svg className='lever' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 40 118'>
        <g>
          <rect x='16.9' y='22.3' className='st0' width='6.3' height='85.1' />
          <g>
            <path className='st1' d='M20,39.4c10.9,0,19.7-8.8,19.7-19.7C39.7,8.8,30.9,0,20,0C9.1,0,0.3,8.8,0.3,19.7C0.3,30.6,9.1,39.4,20,39.4' />
            <path className='st2' d='M20,0v39.4c10.9,0,19.7-8.8,19.7-19.7C39.7,8.8,30.9,0,20,0z' />
          </g>
        </g>
        <g>
          <rect x='6' y='96.5' className='st3' width='14' height='21.5' />
          <rect x='20' y='96.5' className='st4' width='14' height='21.5' />
        </g>
      </svg>
    )
  }
}
