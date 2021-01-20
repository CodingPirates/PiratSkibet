import React from 'react'
import World from 'widgets/animations/worlds/World'
import Director from 'widgets/animations/Director'

import Cloud from 'widgets/animations/partials/Cloud'
import Sky from 'widgets/animations/partials/Sky'
import SeagullFlying from 'widgets/animations/partials/SeagullFlying'

export default class ForumWorld extends World {
  renderWorld () {
    return (
      <>
        <Sky />

        <Director limit={2}>
          <Cloud scaleFactor={1} durationFactor={160} left='-20%' top='15%' zIndex='3' glitch={false} randomizeInitial />
          <Cloud scaleFactor={0.7} durationFactor={120} left='-4%' top='70%' zIndex='4' glitch={false} randomizeInitial />
          <Cloud scaleFactor={0.3} durationFactor={80} left='-4%' top='30%' zIndex='4' glitch={false} randomizeInitial />
          <Cloud scaleFactor={0.5} durationFactor={90} left='-8%' top='40%' zIndex='4' glitch={false} randomizeInitial />
          <Cloud scaleFactor={0.8} durationFactor={130} left='-15%' top='50%' zIndex='2' glitch={false} randomizeInitial />
          <Cloud scaleFactor={0.3} durationFactor={70} left='-4%' top='60%' zIndex='4' glitch={false} randomizeInitial />
        </Director>

        <Director limit={1}>
          <SeagullFlying scaleFactor={0.04} durationFactor={40} right='-5%' top='15%' zIndex='7' direction='left' glitch={false} randomizeInitial />
          <SeagullFlying scaleFactor={0.035} durationFactor={30} right='-5%' top='20%' zIndex='7' direction='left' glitch={false} randomizeInitial />
          <SeagullFlying scaleFactor={0.04} durationFactor={37} right='-5%' top='50%' zIndex='7' direction='left' glitch={false} randomizeInitial />
          <SeagullFlying scaleFactor={0.035} durationFactor={30} left='-5%' top='35%' zIndex='7' direction='right' glitch={false} randomizeInitial />
          <SeagullFlying scaleFactor={0.04} durationFactor={40} right='-5%' top='70%' zIndex='7' direction='left' glitch={false} randomizeInitial />
        </Director>
      </>
    )
  }
}
