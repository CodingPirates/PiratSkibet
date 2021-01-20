import React from 'react'
import World from 'widgets/animations/worlds/World'
import Director from 'widgets/animations/Director'

import ClownFish from 'widgets/animations/partials/ClownFish'
import BlueFish from 'widgets/animations/partials/BlueFish'
import Bubble from 'widgets/animations/partials/Bubble'
import AnimationGroup from 'widgets/animations/partials/AnimationGroup'

export default class SeaSurfaceWorld extends World {
  static get defaultProps () {
    return {
      ...super.defaultProps,
      classNames: 'underwater-world underwater-world--surface',
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
          {/* BlueFish */}
          <AnimationGroup childNumber={5} scaleFactor={0.15} scaleFactorInterval={[120, 200]} durationFactor={120} top='15%' right='-15%' direction='left' randomizeInitial>
            <BlueFish />
          </AnimationGroup>

          <AnimationGroup childNumber={4} scaleFactor={0.15} scaleFactorInterval={[120, 200]} durationFactor={130} top='20%' left='-15%' direction='right' randomizeInitial>
            <BlueFish />
          </AnimationGroup>

          <AnimationGroup childNumber={6} scaleFactor={0.12} scaleFactorInterval={[100, 150]} durationFactor={180} bottom='10%' left='-12%' direction='right' randomizeInitial shadow>
            <BlueFish />
          </AnimationGroup>

          <AnimationGroup childNumber={5} scaleFactor={0.12} scaleFactorInterval={[100, 150]} durationFactor={180} bottom='10%' left='-12%' direction='right' randomizeInitial shadow>
            <BlueFish />
          </AnimationGroup>

          {/* ClownFish */}
          <AnimationGroup childNumber={6} scaleFactor={0.15} scaleFactorInterval={[100, 180]} durationFactor={140} top='40%' right='-15%' direction='left' randomizeInitial>
            <ClownFish />
          </AnimationGroup>

          <AnimationGroup childNumber={5} scaleFactor={0.15} scaleFactorInterval={[100, 180]} durationFactor={160} top='35%' left='-15%' direction='right' randomizeInitial>
            <ClownFish />
          </AnimationGroup>

          <AnimationGroup childNumber={4} scaleFactor={0.12} scaleFactorInterval={[100, 150]} durationFactor={200} bottom='30%' left='-12%' direction='right' randomizeInitial shadow>
            <ClownFish />
          </AnimationGroup>

          <AnimationGroup childNumber={5} scaleFactor={0.12} scaleFactorInterval={[100, 150]} durationFactor={220} bottom='15%' right='-12%' direction='left' randomizeInitial shadow>
            <ClownFish />
          </AnimationGroup>
        </Director>

        <Director limit={this.directorLimit}>
          {/* Three bubbles */}
          <AnimationGroup childNumber={3} scaleFactor={0.03} scaleFactorInterval={[250, 350]} durationFactor={10} top='85%' left='15%' direction='up'>
            <Bubble />
          </AnimationGroup>

          <AnimationGroup childNumber={3} scaleFactor={0.025} scaleFactorInterval={[250, 350]} durationFactor={11} top='35%' left='45%' direction='up'>
            <Bubble />
          </AnimationGroup>

          <AnimationGroup childNumber={3} scaleFactor={0.03} scaleFactorInterval={[250, 350]} durationFactor={10} top='15%' left='65%' direction='up'>
            <Bubble />
          </AnimationGroup>

          <AnimationGroup childNumber={3} scaleFactor={0.025} scaleFactorInterval={[250, 350]} durationFactor={11} top='60%' left='85%' direction='up'>
            <Bubble />
          </AnimationGroup>

          {/* Two bubbles */}
          <AnimationGroup childNumber={2} scaleFactor={0.03} scaleFactorInterval={[250, 350]} durationFactor={8} top='15%' left='30%' direction='up'>
            <Bubble />
          </AnimationGroup>

          <AnimationGroup childNumber={2} scaleFactor={0.025} scaleFactorInterval={[250, 350]} durationFactor={7} top='30%' left='70%' direction='up'>
            <Bubble />
          </AnimationGroup>

          <AnimationGroup childNumber={2} scaleFactor={0.03} scaleFactorInterval={[250, 350]} durationFactor={8} top='60%' left='10%' direction='up'>
            <Bubble />
          </AnimationGroup>

          <AnimationGroup childNumber={2} scaleFactor={0.025} scaleFactorInterval={[250, 350]} durationFactor={7} top='80%' left='80%' direction='up'>
            <Bubble />
          </AnimationGroup>

          {/* One bubble */}
          <AnimationGroup childNumber={1} scaleFactor={0.03} scaleFactorInterval={[250, 350]} durationFactor={6} top='70%' left='60%' direction='up'>
            <Bubble />
          </AnimationGroup>

          <AnimationGroup childNumber={1} scaleFactor={0.04} scaleFactorInterval={[250, 350]} durationFactor={7} top='50%' left='20%' direction='up'>
            <Bubble />
          </AnimationGroup>

          <AnimationGroup childNumber={1} scaleFactor={0.03} scaleFactorInterval={[250, 350]} durationFactor={6} top='20%' left='10%' direction='up'>
            <Bubble />
          </AnimationGroup>

          <AnimationGroup childNumber={1} scaleFactor={0.04} scaleFactorInterval={[250, 350]} durationFactor={7} top='70%' left='60%' direction='up'>
            <Bubble />
          </AnimationGroup>
        </Director>

      </>
    )
  }
}
