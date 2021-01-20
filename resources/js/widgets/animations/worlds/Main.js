import React from 'react'
import World from 'widgets/animations/worlds/World'
import Director from 'widgets/animations/Director'
import GlitchFilter from 'widgets/animations/partials/GlitchFilter'

import Cloud from 'widgets/animations/partials/Cloud'
import Sky from 'widgets/animations/partials/Sky'
import Water from 'widgets/animations/partials/Water'
import WaterDrops from 'widgets/animations/partials/WaterDrops'
import YellowTriangle from 'widgets/animations/partials/YellowTriangle'
import PinkTriangle from 'widgets/animations/partials/PinkTriangle'
import Television from 'widgets/animations/partials/Television'
import Wires from 'widgets/animations/partials/Wires'
import Rocket from 'widgets/animations/partials/Rocket'
import SeagullFlying from 'widgets/animations/partials/SeagullFlying'
import SeagullSwimming from 'widgets/animations/partials/SeagullSwimming'

import Island from 'widgets/animations/partials/Island'
import MainIsland from 'widgets/animations/islands/MainIsland'
import SkeletonIsland from 'widgets/animations/islands/SkeletonIsland'
import YellowIsland from 'widgets/animations/islands/YellowIsland'
import LeverIsland from 'widgets/animations/islands/LeverIsland'

import WhenUp from 'widgets/shutdown/WhenUp'
import WhenDown from 'widgets/shutdown/WhenDown'

import Stars from 'widgets/animations/partials/Stars'

export default class Main extends World {
  get name () {
    return 'main'
  }

  renderWorld () {
    return (
      <>
        {/* SVG filter for glitch-effect */}
        <GlitchFilter />

        {/* Sky */}
        <Sky />

        {/* Stars */}
        <WhenDown mountDelay={10000} demountDelay={15000}>
          <Stars starMinSize={2} starMaxSize={6} />
        </WhenDown>

        {/* Blue background island */}
        <Island islandType='blue' scaleFactor={0.44} left='26%' top='22%' zIndex='1' />
        <Island islandType='blue' scaleFactor={0.1} left='5%' top='56%' zIndex='1' />
        <Island islandType='blue' scaleFactor={0.04} scaleX={0.8} left='15%' top='59%' zIndex='1' />
        <Island islandType='blue' scaleFactor={0.1} scaleX={0.75} right='3%' top='56%' zIndex='1' />
        <Island islandType='blue' scaleFactor={0.03} right='13%' top='59%' zIndex='1' />

        {/* <WhenDown demountDelay={3000} >
                    <Island scaleFactor={2} left="26%" top="22%" zIndex="1" />
                </WhenDown> */}

        {/* Wires */}
        <Wires scaleFactor={0.11} rotate={-7} left='28%' top='44%' zIndex='2' />
        <Wires scaleFactor={0.11} rotate={50} right='25%' top='48%' zIndex='2' />

        {/* Islands */}
        <YellowIsland scaleFactor={0.16} left='20%' top='54%' zIndex='3' />
        <MainIsland scaleFactor={0.25} left='31%' top='21%' zIndex='4' />
        <SkeletonIsland scaleFactor={0.15} right='29%' top='41%' zIndex='4' />
        <LeverIsland scaleFactor={0.06} right='21%' top='47%' zIndex='4' />
        <Rocket scaleFactor={0.12} right='38%' top='24%' zIndex='3' />

        {/* Clouds */}
        <Director limit={2}>
          <Cloud scaleFactor={0.2} durationFactor={250} left='-20%' top='44%' zIndex='1' glitch={false} randomizeInitial />
          <Cloud scaleFactor={0.4} durationFactor={90} left='-4%' top='26%' zIndex='3' glitch={false} randomizeInitial />
          <Cloud scaleFactor={0.45} durationFactor={100} left='-8%' top='18%' zIndex='3' glitch={false} randomizeInitial />
          <Cloud scaleFactor={0.5} durationFactor={120} left='-15%' top='16%' zIndex='3' glitch={false} randomizeInitial />
          <Cloud scaleFactor={0.55} durationFactor={85} left='-4%' top='20%' zIndex='3' glitch={false} randomizeInitial />
        </Director>

        <Director limit={1}>

          {/* Flying Seagulls */}
          <SeagullFlying scaleFactor={0.04} durationFactor={40} right='-5%' top='15%' zIndex='7' direction='left' glitch={false} randomizeInitial />
          <SeagullFlying scaleFactor={0.035} durationFactor={30} right='-5%' top='20%' zIndex='7' direction='left' glitch={false} randomizeInitial />
          <SeagullFlying scaleFactor={0.04} durationFactor={37} right='-5%' top='25%' zIndex='7' direction='left' glitch={false} randomizeInitial />
          <SeagullFlying scaleFactor={0.035} durationFactor={30} left='-5%' top='20%' zIndex='7' direction='right' glitch={false} randomizeInitial />
          <SeagullFlying scaleFactor={0.04} durationFactor={40} right='-5%' top='15%' zIndex='7' direction='left' glitch={false} randomizeInitial />

          {/* Swimming Seagulls */}
          <SeagullSwimming scaleFactor={0.035} durationFactor={60} right='-3.5%' bottom='20%' zIndex='7' direction='left' glitch={false} randomizeInitial />
          <SeagullSwimming scaleFactor={0.022} durationFactor={70} right='-3.5%' bottom='35%' zIndex='6' direction='left' glitch={false} randomizeInitial />
          <SeagullSwimming scaleFactor={0.027} durationFactor={65} left='-3.5%' bottom='30%' zIndex='6' direction='right' glitch={false} randomizeInitial />
          <SeagullSwimming scaleFactor={0.022} durationFactor={70} left='-3.5%' bottom='35%' zIndex='6' direction='right' glitch={false} randomizeInitial />

        </Director>

        {/* Front */}
        <YellowTriangle scaleFactor={0.35} bottom='-10px' right='2%' zIndex='8' />
        <PinkTriangle scaleFactor={0.38} bottom='8%' left='2%' zIndex='8' glitch={false} />
        <Television scaleFactor={0.2} bottom='20%' left='44%' zIndex='6' glitch={false} />

        {/* Water */}
        <Water zIndex='5' />
        <WaterDrops zIndex='4' />

      </>
    )
  }
}
