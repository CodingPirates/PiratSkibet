import React from 'react'

export default class CoverScrollTransform extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      lastKnownScrollY: 0,
      scrollDistance: null
    }

    this.onScroll = this.onScroll.bind(this)
  }

  componentDidMount () {
    window.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onScroll)
  }

  static get defaultProps () {
    return {
      yFactor: null,
      scaleFactor: null,
      transformOrigin: 'center',
      zIndex: 1
    }
  }

  onScroll () {
    this.setState({ lastKnownScrollY: window.pageYOffset })
    this.requestTick()
  }

  requestTick () {
    if (!this.ticking) {
      requestAnimationFrame(this.update.bind(this))
    }

    this.ticking = true
  }

  update () {
    const currentScrollY = this.state.lastKnownScrollY
    this.ticking = false

    if (this.state.lastKnownScrollY < 800) {
      this.setState({ scrollDistance: currentScrollY })
    }
  }

  get translateY () {
    return this.state.scrollDistance / this.props.yFactor
  }

  get scale () {
    return 1 - (this.state.scrollDistance / (800 * this.props.scaleFactor))
  }

  get styles () {
    const style = {}

    if (this.props.yFactor && this.props.scaleFactor) {
      style.transform = `translateY(${this.translateY}px) scale(${this.scale})`
    } else if (this.props.yFactor) {
      style.transform = `translateY(${this.translateY}px)`
    } else if (this.props.scaleFactor) {
      style.transform = `scale(${this.scale})`
    }

    style.zIndex = this.props.zIndex
    style.transformOrigin = this.props.transformOrigin

    return style
  }

  render () {
    return (
      <div className='cover-scroll' style={this.styles}>
        {this.props.children}
      </div>
    )
  }
}
