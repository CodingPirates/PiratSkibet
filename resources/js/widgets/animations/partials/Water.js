import React from 'react'
import Animation from 'widgets/animations/Animation'

export default class Water extends Animation {
  static get defaultProps () {
    return {
      ...super.defaultProps,
      height: '33%',
      twoRows: false
    }
  }

  get transitionsProps () {
    return {}
  }

  get classNames () {
    return this.props.twoRows ? 'water--small water-' : 'water--default water-'
  }

  get styles () {
    const styles = {
      ...super.styles,
      height: this.props.height
    }

    return styles
  }

  renderContent () {
    return (
      <div className='water' />
    )
  }
}
