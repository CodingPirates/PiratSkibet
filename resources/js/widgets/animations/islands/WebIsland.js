import React from 'react'
import { router } from '@morningtrain/helpers'
import Animation from 'widgets/animations/Animation'
import IslandAbove from 'widgets/animations/partials/IslandAbove'
import IslandWater from 'widgets/animations/partials/IslandWater'
import Glare from 'widgets/animations/partials/Glare'
import IslandSign from 'widgets/animations/partials/IslandSign'
import Link from 'widgets/navigation/Link'

export default class WebIsland extends Animation {
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
      <Link route='app.courses.courses' parameters={{ category: 'html-css' }} className='course-island'>
        <IslandWater />

        <div className='island-body'>
          <IslandAbove islandType={this.props.islandType} zIndex='1' />
          <Glare scaleFactor={0.2} opacity={0.3} top='14%' left='23%' zIndex='2' />
          <IslandSign scaleFactor={0.26} top='-15.5%' left='37%' zIndex='5' rotate={0} image={router.url('img/logos/html-css.svg')} signColor='#0091d2' />
        </div>
      </Link>
    )
  }
}
