import React from 'react'
import Animation from 'widgets/animations/Animation'
import shortid from 'shortid'

export default class Rocket extends Animation {
  constructor (props) {
    super(props)
    this.windowId = shortid.generate()
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
    return 'rocket-'
  }

  get width () {
    return this.scaleWidth(100) + '%'
  }

  get styles () {
    return {
      ...super.styles,
      height: '44%'
    }
  }

  renderContent () {
    return (
      <svg preserveAspectRatio='xMidYMid meet' className='rocket' version='1.1' id='Lag_1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 226 415'>
        <defs>
          <filter id={'blurWindow--' + this.windowId} x='-50%' y='-50%' width='200%' height='200%'>
            <feGaussianBlur stdDeviation='7' />
          </filter>
        </defs>

        <g>
          <rect x='-1.5' y='107' transform='matrix(0.2756 -0.9613 0.9613 0.2756 -98.8749 114.8147)' className='st0' width='56.5' height='32.1' />
          <rect x='182.3' y='94.7' transform='matrix(0.9613 -0.2756 0.2756 0.9613 -26.2235 59.4307)' className='st0' width='32.1' height='56.5' />
          <path className='st1' d='M225.9,293.6c0-162-50.6-293.3-113-293.3c-62.4,0-113,131.3-113,293.3S225.9,455.6,225.9,293.6' />

          <path className='st2' d='M226,293.3C226,131.3,175.4,0,113,0l1.8,414.79C170.69,413.93,226,373.44,226,293.3' />

          {/* <g>
                        <defs>
                            <path id="rocketPath" d="M-0.1,293.6c0,162,226.1,162,226.1,0c0-162-50.6-293.3-113-293.3C50.5,0.2-0.1,131.6-0.1,293.6"/>
                        </defs>
                        <clipPath id="rocketPath2">
                            <use xlinkHref="#rocketPath" />
                        </clipPath>
                        <rect x="114.1" y="-30.1" className="st2" width="188.2" height="451.7"/>
                    </g> */}

          <path className='st3' d='M112.2,143.8c24.3,0.4,44.3-18.9,44.7-43.2c0.4-24.3-18.9-44.3-43.2-44.7C89.5,55.5,69.4,74.8,69,99.1C68.6,123.4,87.9,143.4,112.2,143.8' />

          <g className='glitchable'>
            <path className='st0' d='M112.4,130.8c21.6,0.4,39.4-16.8,39.7-38.4c0.4-21.6-16.8-39.4-38.4-39.7C92.2,52.3,74.4,69.5,74.1,91C73.7,112.6,90.9,130.4,112.4,130.8' />
            <path
              className='st4' d='M113.1,132.9c-0.2,0-0.5,0-0.7,0c-11-0.2-21.3-4.7-28.9-12.6S71.7,102,71.9,91c0.2-11,4.7-21.3,12.6-28.9
                            s18.4-11.7,29.4-11.6c11,0.2,21.3,4.7,28.9,12.6s11.8,18.4,11.6,29.4c-0.2,11-4.7,21.3-12.6,28.9
                            C134,128.9,123.9,132.9,113.1,132.9z M113.1,54.8c-9.6,0-18.7,3.7-25.6,10.4c-7.1,6.8-11.1,16-11.3,25.9
                            c-0.2,9.9,3.5,19.2,10.4,26.3c6.8,7.1,16,11.1,25.9,11.3l0,0c9.8,0.1,19.2-3.5,26.3-10.4s11.1-16,11.3-25.9
                            c0.2-9.9-3.5-19.2-10.4-26.3s-16-11.1-25.9-11.3C113.5,54.8,113.3,54.8,113.1,54.8z'
            />

            <path className='st5' d='M113,112.7c12.1,0.2,22.1-9.5,22.4-21.6c0.2-12.1-9.5-22.1-21.6-22.4c-12.1-0.2-22.1,9.5-22.4,21.6C91.2,102.5,100.8,112.5,113,112.7' />
            <path className='st5--light' d='M113,112.7c12.1,0.2,22.1-9.5,22.4-21.6c0.2-12.1-9.5-22.1-21.6-22.4c-12.1-0.2-22.1,9.5-22.4,21.6C91.2,102.5,100.8,112.5,113,112.7' filter={`url(#blurWindow--${this.windowId})`} />

            <path className='window-glare' d='M112.8,93.3c4.2,0.1,7.7-3.2,7.7-7.4c0.1-4.2-3.3-7.6-7.5-7.7c-4.2-0.1-7.7,3.2-7.7,7.4C105.2,89.7,108.6,93.2,112.8,93.3' />
          </g>

          <g>
            <path className='st0' d='M63.4,216.1c3.3,0,6-2.7,6-6c0-3.3-2.7-6-6-6c-3.3,0-6,2.7-6,6C57.4,213.4,60.1,216.1,63.4,216.1' />
            <path className='st0' d='M89.1,216.1c3.3,0,6-2.7,6-6c0-3.3-2.7-6-6-6c-3.3,0-6,2.7-6,6C83,213.4,85.7,216.1,89.1,216.1' />
            <path className='st0' d='M114.7,216.1c3.3,0,6-2.7,6-6c0-3.3-2.7-6-6-6c-3.3,0-6,2.7-6,6C108.7,213.4,111.4,216.1,114.7,216.1' />
          </g>

          <path className='st6' d='M45.2,98.1c-0.3,0-0.6,0-0.9-0.1c-1.7-0.5-2.6-2.3-2.1-3.9C63,27.1,100,9.4,101.6,8.7c1.6-0.7,3.4,0,4.2,1.5s0,3.4-1.5,4.2c-0.4,0.2-36.1,17.5-56,81.5C47.8,97.2,46.5,98.1,45.2,98.1z' />
        </g>
      </svg>
    )
  }
}
