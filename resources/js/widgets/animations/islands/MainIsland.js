import React from 'react'
import Animation from 'widgets/animations/Animation'
import Island from 'widgets/animations/partials/Island'
import Flag from 'widgets/animations/partials/Flag'
import Glare from 'widgets/animations/partials/Glare'
import Window from 'widgets/animations/partials/Window'
import Banner from 'widgets/animations/partials/Banner'

export default class MainIsland extends Animation {
  static get defaultProps () {
    return {
      ...super.defaultProps
    }
  }

  get transitionsProps () {
    return {}
  }

  get classNames () {
    return 'main-island-'
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
      <div className='main-island'>
        <Flag scaleFactor={0.44} left='16%' top='0' zIndex='2' glitch={false} />
        <Island islandType='pink' shadow left='0' top='0' zIndex='1' />
        <Glare scaleFactor={0.21} opacity={0.35} top='34%' left='12%' zIndex='3' />
        <Window scaleFactor={0.125} top='35%' left='35.5%' zIndex='3' />
        <Window scaleFactor={0.125} top='35%' right='35.5%' zIndex='3' />
        <Banner scaleFactor={0.6} top='45%' left='20%' zIndex='3' />
      </div>
    )
  }
}
