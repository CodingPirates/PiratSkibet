import React from 'react'
import Animation from 'widgets/animations/Animation'

export default class IslandHalf extends Animation {
  static get defaultProps () {
    return {
      ...super.defaultProps,
      background: '#00AEEF'
    }
  }

  get transitionsProps () {
    return {}
  }

  get classNames () {
    return 'island-half-'
  }

  get width () {
    return this.scaleWidth(100) + '%'
  }

  get islandStyles () {
    const styles = {
      fill: this.props.background
    }

    return styles
  }

  renderContent () {
    return (
      <svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 413 126' style={this.islandStyles}>
        <path className='st0' d='M413,126C412.6,56.4,320.3,0,206.5,0S0.5,56.4,0,126H413z' />
      </svg>
    )
  }
}
