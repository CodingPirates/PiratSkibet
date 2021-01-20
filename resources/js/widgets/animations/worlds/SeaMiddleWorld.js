import React from 'react'
import World from 'widgets/animations/worlds/World'
import Director from 'widgets/animations/Director'

import BlueFishMid from 'widgets/animations/partials/BlueFishMid'
import Shark from 'widgets/animations/partials/Shark'
import Bubble from 'widgets/animations/partials/Bubble'
import AnimationGroup from 'widgets/animations/partials/AnimationGroup'

export default class SeaMiddleWorld extends World {
  static get defaultProps () {
    return {
      ...super.defaultProps,
      classNames: 'underwater-world underwater-world--middle',
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
          <AnimationGroup childNumber={5} scaleFactor={0.15} scaleFactorInterval={[120, 200]} durationFactor={120} top='15%' right='-15%' direction='left' randomizeInitial>
            <BlueFishMid />
          </AnimationGroup>

          <AnimationGroup childNumber={4} scaleFactor={0.15} scaleFactorInterval={[120, 200]} durationFactor={130} top='20%' left='-15%' direction='right' randomizeInitial>
            <BlueFishMid />
          </AnimationGroup>

          <AnimationGroup childNumber={6} scaleFactor={0.12} scaleFactorInterval={[100, 150]} durationFactor={180} bottom='10%' left='-12%' direction='right' randomizeInitial shadow>
            <BlueFishMid />
          </AnimationGroup>

          <AnimationGroup childNumber={5} scaleFactor={0.12} scaleFactorInterval={[100, 150]} durationFactor={180} bottom='10%' left='-12%' direction='right' randomizeInitial shadow>
            <BlueFishMid />
          </AnimationGroup>

          <Shark scaleFactor={0.18} durationFactor={150} direction='left' right='-20%' top='40%' zIndex={6} randomizeInitial />
          <Shark scaleFactor={0.18} durationFactor={160} direction='right' left='-20%' top='20%' zIndex={6} randomizeInitial />
          <Shark scaleFactor={0.11} durationFactor={200} direction='left' right='-20%' bottom='10%' zIndex={3} randomizeInitial shadow />
          <Shark scaleFactor={0.11} durationFactor={200} direction='right' left='-20%' bottom='20%' zIndex={3} randomizeInitial shadow />
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

          <AnimationGroup childNumber={1} scaleFactor={0.04} scaleFactorInterval={[250, 350]} durationFactor={20} top='70%' left='60%' direction='up'>
            <Bubble />
          </AnimationGroup>
        </Director>
      </>
    )
  }
}
