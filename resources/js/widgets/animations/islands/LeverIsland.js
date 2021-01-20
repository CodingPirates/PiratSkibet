import React from 'react'
import Animation from 'widgets/animations/Animation'
import Island from 'widgets/animations/partials/Island'
import Lever from 'widgets/animations/partials/Lever'

export default class LeverIsland extends Animation {
  static get defaultProps () {
    return {
      ...super.defaultProps
    }
  }

  get transitionsProps () {
    return {}
  }

  get classNames () {
    return 'lever-island-'
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
      <div className='lever-island'>
        <Lever scaleFactor={0.35} zIndex='1' />
        <Island islandType='pink' shadow left='0' top='0' zIndex='2' />
      </div>
    )
  }
}
