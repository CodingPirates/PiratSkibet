import React from 'react'
import World from 'widgets/animations/worlds/World'
import Director from 'widgets/animations/Director'

import AnglerFish from 'widgets/animations/partials/AnglerFish'
import DeepSeaFish from 'widgets/animations/partials/DeepSeaFish'
import Bubble from 'widgets/animations/partials/Bubble'
import AnimationGroup from 'widgets/animations/partials/AnimationGroup'

export default class SeaDeepWorld extends World {
  static get defaultProps () {
    return {
      ...super.defaultProps,
      classNames: 'underwater-world underwater-world--deep',
      directorLimit: 3,
      crowdedness: 1
    }
  }

  get directorLimit () {
    return this.props.crowdedness * this.props.directorLimit
  }

  renderWorld () {
    return (
      <>
        <Director limit={this.directorLimit}>
          <AnglerFish scaleFactor={0.08} durationFactor={150} direction='left' right='-20%' bottom='15%' zIndex={6} randomizeInitial />
          <AnglerFish scaleFactor={0.08} durationFactor={150} direction='right' left='-20%' bottom='27%' zIndex={6} randomizeInitial />
          <AnglerFish scaleFactor={0.04} durationFactor={200} direction='left' right='-20%' bottom='40%' zIndex={3} randomizeInitial shadow />
          <AnglerFish scaleFactor={0.04} durationFactor={200} direction='right' left='-20%' bottom='5%' zIndex={3} randomizeInitial shadow />

          <DeepSeaFish scaleFactor={0.12} durationFactor={130} direction='left' right='-20%' top='15%' zIndex={6} randomizeInitial />
          <DeepSeaFish scaleFactor={0.12} durationFactor={140} direction='right' left='-20%' top='27%' zIndex={6} randomizeInitial />
          <DeepSeaFish scaleFactor={0.08} durationFactor={190} direction='left' right='-20%' top='20%' zIndex={3} randomizeInitial shadow />
          <DeepSeaFish scaleFactor={0.08} durationFactor={180} direction='right' left='-20%' top='45%' zIndex={3} randomizeInitial shadow />
        </Director>

        <Director limit={this.directorLimit}>
          {/* Three bubbles */}
          <AnimationGroup childNumber={3} scaleFactor={0.03} scaleFactorInterval={[250, 350]} durationFactor={20} top='85%' left='15%' direction='up'>
            <Bubble />
          </AnimationGroup>

          <AnimationGroup childNumber={3} scaleFactor={0.025} scaleFactorInterval={[250, 350]} durationFactor={20} top='35%' left='45%' direction='up'>
            <Bubble />
          </AnimationGroup>

          <AnimationGroup childNumber={3} scaleFactor={0.03} scaleFactorInterval={[250, 350]} durationFactor={20} top='15%' left='65%' direction='up'>
            <Bubble />
          </AnimationGroup>

          <AnimationGroup childNumber={3} scaleFactor={0.025} scaleFactorInterval={[250, 350]} durationFactor={20} top='60%' left='85%' direction='up'>
            <Bubble />
          </AnimationGroup>

          {/* Two bubbles */}
          <AnimationGroup childNumber={2} scaleFactor={0.03} scaleFactorInterval={[250, 350]} durationFactor={20} top='15%' left='30%' direction='up'>
            <Bubble />
          </AnimationGroup>

          <AnimationGroup childNumber={2} scaleFactor={0.025} scaleFactorInterval={[250, 350]} durationFactor={20} top='30%' left='70%' direction='up'>
            <Bubble />
          </AnimationGroup>

          <AnimationGroup childNumber={2} scaleFactor={0.03} scaleFactorInterval={[250, 350]} durationFactor={20} top='60%' left='10%' direction='up'>
            <Bubble />
          </AnimationGroup>

          <AnimationGroup childNumber={2} scaleFactor={0.025} scaleFactorInterval={[250, 350]} durationFactor={20} top='80%' left='80%' direction='up'>
            <Bubble />
          </AnimationGroup>

          {/* One bubble */}
          <AnimationGroup childNumber={1} scaleFactor={0.03} scaleFactorInterval={[250, 350]} durationFactor={20} top='70%' left='60%' direction='up'>
            <Bubble />
          </AnimationGroup>

          <AnimationGroup childNumber={1} scaleFactor={0.04} scaleFactorInterval={[250, 350]} durationFactor={20} top='50%' left='20%' direction='up'>
            <Bubble />
          </AnimationGroup>

          <AnimationGroup childNumber={1} scaleFactor={0.03} scaleFactorInterval={[250, 350]} durationFactor={20} top='20%' left='10%' direction='up'>
            <Bubble />
          </AnimationGroup>

          <AnimationGroup childNumber={1} scaleFactor={0.04} scaleFactorInterval={[250, 350]} durationFactor={20} top='10%' left='90%' direction='up'>
            <Bubble />
          </AnimationGroup>
        </Director>
      </>
    )
  }
}
