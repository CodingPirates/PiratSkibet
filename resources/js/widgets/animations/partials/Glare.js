import React from 'react'
import Widget from '../../Widget'

export default class Glare extends Widget {
  static get defaultProps () {
    return {
      scaleFactor: 1,
      left: null,
      right: null,
      top: null,
      bottom: null,
      rotate: null,
      zIndex: null,
      opacity: null
    }
  }

  get width () {
    return this.scaleWidth(100) + '%'
  }

  get styles () {
    const styles = {
      width: this.width
    }

    if (this.props.left) {
      styles.left = this.props.left
    }

    if (this.props.right) {
      styles.right = this.props.right
    }

    if (this.props.top) {
      styles.top = this.props.top
    }

    if (this.props.bottom) {
      styles.bottom = this.props.bottom
    }

    if (this.props.zIndex) {
      styles.zIndex = this.props.zIndex
    }

    if (this.props.rotate) {
      styles.transform = `rotate(${this.props.rotate}deg)`
    }

    if (this.props.opacity) {
      styles.opacity = this.props.opacity
    }

    return styles
  }

  scaleWidth (width) {
    return width * this.props.scaleFactor
  }

  renderWidget () {
    return (
      <svg className='glare' style={this.styles} version='1.1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 92 71'>
        <path d='M3.6,71.4c-0.6,0-1.3-0.2-1.8-0.6c-1.4-1-1.7-3-0.7-4.4C35.3,18.2,85.6,1.1,87.7,0.4c1.6-0.5,3.4,0.3,4,2
                c0.5,1.6-0.3,3.4-2,4C89.2,6.5,39.2,23.6,6.1,70.1C5.5,71,4.5,71.4,3.6,71.4z'
        />
      </svg>
    )
  }
}
