import React from 'react'
import Animation from 'widgets/animations/Animation'

export default class IslandAbove extends Animation {
  static get defaultProps () {
    return {
      ...super.defaultProps,
      scaleX: 1,
      islandType: 'yellow'
    }
  }

  get transitionsProps () {
    return {}
  }

  get classNames () {
    return 'island-above-'
  }

  get width () {
    return this.scaleWidth(100) + '%'
  }

  get styles () {
    const styles = {
      ...super.styles
    }

    if (this.props.scaleX) {
      styles.transform = `scaleX(${this.props.scaleX})`
    }

    return styles
  }

  get islandType () {
    return 'island-above--' + this.props.islandType
  }

  renderContent () {
    return (
      <svg className={this.islandType} version='1.1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 944 473.3'>
        <path
          className='island-above__fill' d='M476.6,399.9c-57.1,0-114.4-3.5-171.3-9.4c-27.5-2.9-55-6.7-81.9-13.2
                c-22-5.4-49.7-12.4-65.9-29.4c-8.3-8.7-6.8-24.5-6.9-36c-0.2-16.3,1.2-32.7,4.2-48.7c5.3-27.8,15.3-54.5,29.5-79
                c27.9-48.5,70.9-87.3,120-113.5C407.8,15.3,539,15,642.9,69.8c49.8,26.2,93.4,65.4,121.6,114.4c14.2,24.5,24.2,51.2,29.5,79
                c2.6,13.6,4,27.4,4.2,41.2c0.2,11.3,2,29.4-3.4,39.6c-6.9,12.9-25.6,20-38.3,24.8c-28.3,10.5-58.7,15.5-88.5,19.4
                C604.5,396.1,540.6,400.1,476.6,399.9z'
        />
        <path
          className='shadow' d='M794.1,263.1c-5.3-27.8-15.3-54.5-29.5-79C736.3,135.1,692.8,96,643,69.8c-51.6-27.2-110-40.8-168.4-40.8v371
                c0.7,0,1.3,0,2,0c64,0.1,127.9-3.8,191.4-11.9c29.8-3.9,60.2-8.9,88.5-19.4c12.8-4.8,31.4-11.9,38.3-24.8
                c5.4-10.2,3.6-28.2,3.4-39.6C798,290.5,796.6,276.7,794.1,263.1z'
        />
      </svg>
    )
  }
}
