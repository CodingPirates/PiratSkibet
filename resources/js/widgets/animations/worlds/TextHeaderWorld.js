import React from 'react'
import World from 'widgets/animations/worlds/World'
import Director from 'widgets/animations/Director'

import Cloud from 'widgets/animations/partials/Cloud'
import Sky from 'widgets/animations/partials/Sky'
import SeagullFlying from 'widgets/animations/partials/SeagullFlying'
import Water from 'widgets/animations/partials/Water'
import WaterLine from 'widgets/animations/partials/WaterLine'
import Section from 'layouts/Section'
import IslandHalf from 'widgets/animations/partials/IslandHalf'

export default class TextHeaderWorld extends World {
  static get defaultProps () {
    return {
      ...super.defaultProps,
      classNames: 'animation-world text-header-world',
      directorLimit: 3,
      crowdedness: 1
    }
  }

  renderWorld () {
    return (
      <>
        <Sky />

        <IslandHalf scaleFactor={0.14} right='8%' bottom='100px' background={false} scaleX={0.8} zIndex='2' />
        <IslandHalf scaleFactor={0.10} right='3%' bottom='100px' background={false} zIndex='1' />

        <Director limit={2}>
          <Cloud scaleFactor={0.7} durationFactor={150} left='-20%' top='10%' zIndex='3' glitch={false} randomizeInitial />
          <Cloud scaleFactor={0.4} durationFactor={100} left='-4%' top='30%' zIndex='4' glitch={false} randomizeInitial />
          <Cloud scaleFactor={0.5} durationFactor={90} left='-8%' top='15%' zIndex='4' glitch={false} randomizeInitial />
          <Cloud scaleFactor={0.6} durationFactor={95} left='-15%' top='25%' zIndex='2' glitch={false} randomizeInitial />
          <Cloud scaleFactor={0.3} durationFactor={70} left='-4%' top='28%' zIndex='4' glitch={false} randomizeInitial />
        </Director>

        <Director limit={1}>
          <SeagullFlying scaleFactor={0.04} durationFactor={40} right='-5%' top='15%' zIndex='7' direction='left' glitch={false} randomizeInitial />
          <SeagullFlying scaleFactor={0.035} durationFactor={30} right='-5%' top='20%' zIndex='7' direction='left' glitch={false} randomizeInitial />
          <SeagullFlying scaleFactor={0.04} durationFactor={37} right='-5%' top='28%' zIndex='7' direction='left' glitch={false} randomizeInitial />
          <SeagullFlying scaleFactor={0.035} durationFactor={30} left='-5%' top='25%' zIndex='7' direction='right' glitch={false} randomizeInitial />
          <SeagullFlying scaleFactor={0.04} durationFactor={40} right='-5%' top='30%' zIndex='7' direction='left' glitch={false} randomizeInitial />
        </Director>

        <Water bottom='0' zIndex='3' />

        <Section className='text-header-section'>
          <h1 className='text-header-section__title'>{this.props.text}</h1>
          {this.props.children}
        </Section>

        <WaterLine left='0' bottom='-24px' zIndex='5' />

      </>
    )
  }
}
