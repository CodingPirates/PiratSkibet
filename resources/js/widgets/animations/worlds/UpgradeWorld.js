import React from 'react'
import World from 'widgets/animations/worlds/World'
import Director from 'widgets/animations/Director'

import Cloud from 'widgets/animations/partials/Cloud'
import Sky from 'widgets/animations/partials/Sky'
import Water from 'widgets/animations/partials/Water'
import Island from 'widgets/animations/partials/Island'
import IslandHalf from 'widgets/animations/partials/IslandHalf'
import UserAvatar from 'services/avatar/CurrentUserAvatar'

export default class UpgradeWorld extends World {
  static get defaultProps () {
    return {
      ...super.defaultProps,
      classNames: 'animation-world upgrade-world'
    }
  }

  renderWorld () {
    return (
      <>
        <Sky />

        <Island classNames='tester' scaleFactor={0.34} left='7%' background='#00AEEF' zIndex='2' />
        <Island scaleFactor={0.14} right='8%' top='63%' background='#00AEEF' scaleX={0.8} zIndex='2' />
        <Island scaleFactor={0.10} right='3%' top='64%' background='#01A2DE' zIndex='1' />

        <Director limit={2}>
          <Cloud scaleFactor={1} durationFactor={150} left='-20%' top='7%' zIndex='6' glitch={false} randomizeInitial />
          <Cloud scaleFactor={0.3} durationFactor={100} left='-4%' top='25%' zIndex='8' glitch={false} randomizeInitial />
          <Cloud scaleFactor={0.5} durationFactor={90} left='-8%' top='35%' zIndex='8' glitch={false} randomizeInitial />
          <Cloud scaleFactor={0.8} durationFactor={95} left='-15%' top='20%' zIndex='5' glitch={false} randomizeInitial />
          <Cloud scaleFactor={0.3} durationFactor={70} left='-4%' top='45%' zIndex='8' glitch={false} randomizeInitial />
        </Director>

        <Water bottom='0' zIndex='3' />

        <div className='upgrade-wrapper'>
          <IslandHalf scaleFactor={0.6} zIndex='1' background='#1F9DCE' />
          <UserAvatar embed />
        </div>
      </>
    )
  }
}
