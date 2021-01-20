import React from 'react'
import Widget from 'widgets/Widget'
import { CSSTransition } from 'react-transition-group'
import shortid from 'shortid'
import { Env } from '@morningtrain/helpers'

export default class Animation extends Widget {
  constructor (props) {
    super(props)

    this.state = {
      uuid: shortid.generate()
    }

    if (this.director) {
      this.director.registerAnimation(this.state.uuid, this)
    }
  }

  static get defaultProps () {
    return {
      scaleFactor: 1,
      durationFactor: 1,
      left: null,
      right: null,
      top: null,
      bottom: null,
      zIndex: null,
      glitch: false,
      randomizeInitial: false,
      direction: null
    }
  }

  get director () {
    return this.props.director
  }

  get timeout () {
    return 100
  }

  get timeouts () {
    return {
      appear: this.timeout,
      enter: this.timeout,
      exit: this.duration
    }
  }

  get triggerEnterAndExit () {
    if (this.props.display === true) {
      return true
    }

    if (this.director) {
      return this.director.shouldSpawn(this.state.uuid)
    }

    return true
  }

  get classNames () {
    return 'test'
  }

  get transitionsProps () {
    return {}
  }

  get width () {
    return '100%'
  }

  get initialRight () {
    if (this.props.randomizeInitial) {
      return (Math.floor(Math.random() * (120 - 20)) - 20) + '%'
    }

    return this.props.left
  }

  get initialLeft () {
    if (this.props.randomizeInitial) {
      return (Math.floor(Math.random() * (120 - 20)) - 20) + '%'
    }

    return this.props.left
  }

  get styles () {
    const styles = {
      width: this.width
    }

    if (this.props.left) {
      styles.left = this.props.left

      if (this.director && this.director.isInitialSpawn()) {
        styles.left = this.initialLeft
      }
    }

    if (this.props.right) {
      styles.right = this.props.right

      if (this.director && this.director.isInitialSpawn()) {
        styles.right = this.initialRight
      }
    }

    if (this.props.top) {
      styles.top = this.props.top
    }

    if (this.props.bottom) {
      styles.bottom = this.props.bottom
    }

    if (this.props.zIndex) {
      styles.zIndex = this.props.zIndex
    }

    styles.backfaceVisibility = 'hidden'
    styles.perspective = 1000
    // styles.transform = 'translate3d(0,0,0)';
    // styles.willChange = 'transform, opacity';

    return styles
  }

  get wrapperClassNames () {
    const classNames = []

    classNames.push(this.classNames + '-wrapper')

    if (this.props.glitch === true) {
      classNames.push('glitch')
    }

    if (this.props.direction !== null) {
      classNames.push(this.classNames + '-' + this.props.direction)
    }

    return classNames.join(' ')
  }

  get baseDuration () {
    return 5
  }

  get duration () {
    return this.scaleDuration(this.baseDuration)
  }

  get isSpawnable () {
    if (this.props.spawnDuring) {
      const currentTimeOfDay = Env.get('shutdown.is_active', false) ? 'day' : 'night'
      return currentTimeOfDay === this.props.spawnDuring
    }

    return true
  }

  scaleWidth (width) {
    return width * this.props.scaleFactor
  }

  scaleDuration (duration) {
    return duration * this.props.durationFactor
  }

  handleOnEnter () {
    // console.log('enter');
  }

  handleOnExit () {
    // console.log('exit');
  }

  renderContent () {
    return null
  }

  renderWidget () {
    // https://github.com/reactjs/react-transition-group
    // https://reactcommunity.org/react-transition-group/
    return (
      <CSSTransition
        in={this.triggerEnterAndExit}
        timeout={this.timeouts}
        mountOnEnter
        unmountOnExit
        classNames={this.classNames}
        onEnter={this.handleOnEnter.bind(this)}
        onExit={this.handleOnExit.bind(this)}
        appear
        enter
        exit
        {...this.transitionsProps}
      >
        <div className={this.wrapperClassNames} style={this.styles}>
          {this.renderContent()}
        </div>
      </CSSTransition>
    )
  }
}
