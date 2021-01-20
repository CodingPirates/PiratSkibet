import React from 'react'
import Animation from 'widgets/animations/Animation'

export default class Sky extends Animation {
  static get defaultProps () {
    return {
      ...super.defaultProps
    }
  }

  get transitionsProps () {
    return {}
  }

  get classNames () {
    return 'sky-'
  }

  get styles () {
    return {
      ...super.styles
    }
  }

  renderContent () {
    return (<></>)
  }
}
