import React from 'react'
import Animation from 'widgets/animations/Animation'

export default class PinkCircuit extends Animation {
  static get defaultProps () {
    return {
      ...super.defaultProps
    }
  }

  get transitionsProps () {
    return {}
  }

  get classNames () {
    return 'pink-circuit-'
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
      <svg className='pink-circuit' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 110 54'>
        <g>
          <rect x='48.7' y='16.4' className='st0' width='12.5' height='38.5' />
          <rect x='21.8' y='8.3' className='st0' width='38.5' height='12.5' />
          <rect x='56.8' y='8.3' className='st0' width='38.5' height='12.5' />
          <path className='st1' d='M14.7,24.6c5.5,0,9.9-4.4,9.9-9.9s-4.4-9.9-9.9-9.9c-5.5,0-9.9,4.4-9.9,9.9S9.2,24.6,14.7,24.6' />
          <path
            className='st0' d='M14.7,28.6c-7.7,0-14-6.3-14-14c0-7.7,6.3-14,14-14s14,6.3,14,14C28.7,22.4,22.4,28.6,14.7,28.6z M14.7,8.8
                        c-3.2,0-5.9,2.6-5.9,5.9c0,3.2,2.6,5.9,5.9,5.9c3.2,0,5.9-2.6,5.9-5.9C20.6,11.4,18,8.8,14.7,8.8z'
          />
          <path className='st1' d='M95.3,24.6c5.5,0,9.9-4.4,9.9-9.9s-4.4-9.9-9.9-9.9c-5.5,0-9.9,4.4-9.9,9.9S89.8,24.6,95.3,24.6' />
          <path
            className='st0' d='M95.3,28.6c-7.7,0-14-6.3-14-14c0-7.7,6.3-14,14-14s14,6.3,14,14C109.3,22.4,103,28.6,95.3,28.6z M95.3,8.8
                        c-3.2,0-5.9,2.6-5.9,5.9c0,3.2,2.6,5.9,5.9,5.9c3.2,0,5.9-2.6,5.9-5.9C101.1,11.4,98.5,8.8,95.3,8.8z'
          />
          <path className='st1' d='M55,24.6c5.5,0,9.9-4.4,9.9-9.9S60.5,4.7,55,4.7c-5.5,0-9.9,4.4-9.9,9.9S49.5,24.6,55,24.6' />
          <path
            className='st0' d='M55,28.6c-7.7,0-14-6.3-14-14c0-7.7,6.3-14,14-14c7.7,0,14,6.3,14,14C69,22.4,62.7,28.6,55,28.6z M55,8.8
                        c-3.2,0-5.9,2.6-5.9,5.9c0,3.2,2.6,5.9,5.9,5.9c3.2,0,5.9-2.6,5.9-5.9C60.9,11.4,58.2,8.8,55,8.8z'
          />
        </g>
      </svg>
    )
  }
}
