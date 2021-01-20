import React from 'react'
import Animation from 'widgets/animations/Animation'

export default class Island extends Animation {
  static get defaultProps () {
    return {
      ...super.defaultProps,
      background: '#000',
      shadow: null,
      scaleX: 1,
      islandType: 'blue'
    }
  }

  get transitionsProps () {
    return {}
  }

  get classNames () {
    return 'island-'
  }

  get width () {
    return this.scaleWidth(100) + '%'
  }

  get styles () {
    const styles = {
      ...super.styles,
      paddingBottom: this.width
    }

    if (this.props.scaleX) {
      styles.transform = `scaleX(${this.props.scaleX})`
    }

    return styles
  }

  get islandType () {
    return this.props.shadow !== null ? 'island--shadow island--' + this.props.islandType : 'island--' + this.props.islandType
  }

  renderContent () {
    return (
      <div className={'glitchable island__element ' + this.islandType}>
        {this.props.children}
      </div>
    )
  }
}
