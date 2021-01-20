import React from 'react'
import Animation from 'widgets/animations/Animation'
import Island from 'widgets/animations/partials/Island'
import Glare from 'widgets/animations/partials/Glare'
import PinkCircuit from 'widgets/animations/partials/PinkCircuit'

export default class YellowIsland extends Animation {
  static get defaultProps () {
    return {
      ...super.defaultProps
    }
  }

  get transitionsProps () {
    return {}
  }

  get classNames () {
    return 'yellow-island-'
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
      <div className='yellow-island'>
        <Island islandType='yellow' shadow left='0' top='0' scaleX={0.7} zIndex='1' />
        <Glare scaleFactor={0.21} rotate={-4} opacity={0.9} top='3%' left='24%' zIndex='3' />
        <PinkCircuit scaleFactor={0.3} top='12%' left='34.8%' zIndex='2' />
      </div>
    )
  }
}
