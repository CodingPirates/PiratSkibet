import React from 'react'
import Animation from 'widgets/animations/Animation'

export default class Water extends Animation {
  static get defaultProps () {
    return {
      ...super.defaultProps
    }
  }

  get transitionsProps () {
    return {}
  }

  get classNames () {
    return 'water-drops-'
  }

  get styles () {
    return {
      ...super.styles
    }
  }

  renderContent () {
    return (
      <svg className='water-drops' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 106 138'>
        <g>
          <path
            className='st0' d='M27.7,137.9c-10.4,0-18.8-8.4-18.8-18.8V40.9c0-10.4,8.4-18.8,18.8-18.8s18.8,8.4,18.8,18.8v78.3
                        C46.5,129.5,38.1,137.9,27.7,137.9z'
          />
          <path
            className='st0' d='M86.7,124.7c-10.4,0-18.8-8.4-18.8-18.8V27.7c0-10.4,8.4-18.8,18.8-18.8s18.8,8.4,18.8,18.8v78.3
                        C105.5,116.3,97.1,124.7,86.7,124.7z'
          />
          <path
            className='st1' d='M18.9,129.4c-10.4,0-18.8-8.4-18.8-18.8V32.4c0-10.4,8.4-18.8,18.8-18.8S37.7,22,37.7,32.4v78.3
                        C37.7,121,29.3,129.4,18.9,129.4z'
          />
          <path
            className='st1' d='M77.9,116.2c-10.4,0-18.8-8.4-18.8-18.8V19.1c0-10.4,8.4-18.8,18.8-18.8s18.8,8.4,18.8,18.8v78.3
                        C96.7,107.8,88.3,116.2,77.9,116.2z'
          />
          <path
            className='st2' d='M13.3,116.2c3.1,0,5.6-2.5,5.6-5.6c0-3.1-2.5-5.6-5.6-5.6c-3.1,0-5.6,2.5-5.6,5.6
                        C7.7,113.7,10.2,116.2,13.3,116.2'
          />
          <path
            className='st2' d='M75.1,103.2c3.1,0,5.6-2.5,5.6-5.6c0-3.1-2.5-5.6-5.6-5.6c-3.1,0-5.6,2.5-5.6,5.6
                        C69.5,100.7,72,103.2,75.1,103.2'
          />
        </g>
      </svg>
    )
  }
}
