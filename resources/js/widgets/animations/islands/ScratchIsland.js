import React from 'react'
import { router } from '@morningtrain/helpers'
import Animation from 'widgets/animations/Animation'
import IslandAbove from 'widgets/animations/partials/IslandAbove'
import IslandWater from 'widgets/animations/partials/IslandWater'
import Glare from 'widgets/animations/partials/Glare'
import IslandSign from 'widgets/animations/partials/IslandSign'
import Window from 'widgets/animations/partials/Window'
import ScratchCat from 'widgets/animations/partials/ScratchCat'
import Link from 'widgets/navigation/Link'

export default class ScratchIsland extends Animation {
  static get defaultProps () {
    return {
      ...super.defaultProps,
      islandType: 'yellow'
    }
  }

  get transitionsProps () {
    return {}
  }

  get classNames () {
    return 'course-island-'
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
      <Link route='app.courses.courses' parameters={{ category: 'scratch' }} className='course-island'>
        <IslandWater />

        <div className='island-body'>
          <IslandAbove islandType={this.props.islandType} zIndex='1' />
          <Glare scaleFactor={0.2} opacity={0.3} top='14%' left='23%' zIndex='2' />
          <Window scaleFactor={0.095} top='40%' left='37%' zIndex='3' />
          <Window scaleFactor={0.095} top='40%' right='37%' zIndex='3' />
          <IslandSign scaleFactor={0.28} top='-17%' left='35.5%' zIndex='5' rotate={-2} image={router.url('img/logos/scratch.png')} />
          <ScratchCat scaleFactor={0.15} top='0' left='60%' zIndex='6' />
        </div>
      </Link>
    )
  }
}
