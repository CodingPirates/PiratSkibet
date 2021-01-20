import React from 'react'
import Widget from 'widgets/Widget'

export default class World extends Widget {
  static get defaultProps () {
    return {
      classNames: 'animation-world'
    }
  }

  get name () {
    return 'default'
  }

  get classNames () {
    return [
      this.props.classNames,
      this.name + '-world'
    ].join(' ')
  }

  renderWorld () {
    return null
  }

  renderWidget () {
    return (
      <div className={this.classNames}>
        {this.renderWorld()}
      </div>
    )
  }
}
