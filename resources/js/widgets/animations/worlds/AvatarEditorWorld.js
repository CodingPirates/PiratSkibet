import React from 'react'
import World from 'widgets/animations/worlds/World'
import Director from 'widgets/animations/Director'

import Cloud from 'widgets/animations/partials/Cloud'
import Sky from 'widgets/animations/partials/Sky'
import Water from 'widgets/animations/partials/Water'
import Island from 'widgets/animations/partials/Island'

export default class AvatarEditorWorld extends World {
  renderWorld () {
    return (
      <>
        <Sky />

        <Island scaleFactor={0.34} left='26%' top='52%' background='#00AEEF' zIndex='2' />
        <Island scaleFactor={0.14} right='8%' top='61%' background='#00AEEF' scaleX={0.8} zIndex='2' />
        <Island scaleFactor={0.10} right='3%' top='62%' background='#01A2DE' zIndex='1' />

        <Director limit={2}>
          <Cloud scaleFactor={1} durationFactor={150} left='-20%' top='10%' zIndex='3' glitch={false} randomizeInitial />
          <Cloud scaleFactor={0.3} durationFactor={100} left='-4%' top='30%' zIndex='4' glitch={false} randomizeInitial />
          <Cloud scaleFactor={0.5} durationFactor={90} left='-8%' top='40%' zIndex='4' glitch={false} randomizeInitial />
          <Cloud scaleFactor={0.8} durationFactor={95} left='-15%' top='25%' zIndex='2' glitch={false} randomizeInitial />
          <Cloud scaleFactor={0.3} durationFactor={70} left='-4%' top='50%' zIndex='4' glitch={false} randomizeInitial />
        </Director>

        <Water bottom='0' zIndex='3' />
      </>
    )
  }
}
