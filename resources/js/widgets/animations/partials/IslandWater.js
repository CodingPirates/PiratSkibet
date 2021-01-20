import React from 'react'
import Animation from 'widgets/animations/Animation'

export default class IslandWater extends Animation {
  static get defaultProps () {
    return {
      ...super.defaultProps
    }
  }

  get transitionsProps () {
    return {}
  }

  get classNames () {
    return 'island-water-'
  }

  get width () {
    return this.scaleWidth(100) + '%'
  }

  get styles () {
    const styles = {
      ...super.styles
    }

    return styles
  }

  renderContent () {
    return (
      <>
        <svg className='island-water-wrap' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 944 473.3'>
          <ellipse className='island-water animate transparent' cx='473.3' cy='338.4' rx='422' ry='103.9' />
          <ellipse className='island-water animate' cx='473.3' cy='331.4' rx='362.6' ry='89.3' />
        </svg>

        <svg className='island-water-wrap top' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 944 473.3'>
          <path
            className='island-water' d='M798.7,293.2c0,0,2.2,43-3.9,50.7c-6.1,7.7-25.1,28.8-107.4,41.5
                    C605.2,398,506,400.3,474.6,399.9c-31.4-0.4-164.1-5.8-207.7-14.2s-85.5-17.3-101.5-30.9c-16-13.6-15.8-19.2-15-61.6
                    c0,0-40.9,17.5-39.7,39.2c1.2,21.7,30.3,37.9,56.1,46.9S298.5,422.5,438,420c139.5-2.6,194.2-0.7,269.2-20s102.1-29,120.8-49
                    C846.7,330.9,830.1,307.2,798.7,293.2z'
          />
        </svg>
      </>
    )
  }
}
