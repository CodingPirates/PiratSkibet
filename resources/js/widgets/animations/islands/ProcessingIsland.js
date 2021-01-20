import React from 'react'
import { router } from '@morningtrain/helpers'
import Animation from 'widgets/animations/Animation'
import IslandAbove from 'widgets/animations/partials/IslandAbove'
import IslandWater from 'widgets/animations/partials/IslandWater'
import Glare from 'widgets/animations/partials/Glare'
import IslandSign from 'widgets/animations/partials/IslandSign'
import Link from 'widgets/navigation/Link'

export default class ProcessingIsland extends Animation {
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
      <Link route='app.courses.courses' parameters={{ category: 'processing-py' }} className='course-island'>
        <IslandWater />

        <div className='island-body'>
          <IslandAbove islandType={this.props.islandType} zIndex='1' />
          <Glare scaleFactor={0.2} opacity={0.3} top='14%' left='23%' zIndex='2' />
          <IslandSign scaleFactor={0.28} top='-17%' left='35%' zIndex='3' rotate={-2} image={router.url('img/logos/processing.png')} signColor='#00929D' />
        </div>
      </Link>
    )
  }
}
