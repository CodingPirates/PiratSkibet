import React from 'react'
import Widget from 'widgets/Widget'
import NavigationScrollHandler from 'helpers/NavigationScrollHandler'

export default class ScrollIndicator extends Widget {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.state = { scrolled: true }

    this.navigationScroll = new NavigationScrollHandler({
      scrollDistance: this.props.scrollDistance,
      onEnter: () => this.setState({ scrolled: true }),
      onExit: () => this.setState({ scrolled: false })
    })

    this.heightTimeout
  }

  static get defaultProps () {
    return {
      scrollDistance: 150,
      timeout: 1500
    }
  }

  componentDidMount () {
    this.navigationScroll.init()
    this.checkHeight()
  }

  componentWillUnmount () {
    this.navigationScroll.destroy()
    clearTimeout(this.heightTimeout)
  }

  get pageHasScroll () {
    return document.body.offsetHeight - this.props.scrollDistance > window.innerHeight
  }

  checkHeight () {
    this.heightTimeout = setTimeout(() => {
      if (this.pageHasScroll) {
        this.setState({ scrolled: false })
      } else {
        this.navigationScroll.destroy()
      }
    }, this.props.timeout)
  }

  handleClick () {
    window.scroll({
      top: window.innerHeight / 1.5,
      behavior: 'smooth'
    })

    this.setState({ scrolled: true })
  }

  get classNames () {
    return this.state.scrolled ? 'scroll-indicator scroll-indicator--hidden' : 'scroll-indicator'
  }

  renderWidget () {
    return (
      <div className={this.classNames} onClick={this.handleClick}>
        <svg className='scroll-arrows' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 192.701 192.701' xmlSpace='preserve'>
          <path className='scroll-arrows__first' d='M87.755,104.322c4.559,4.511,12.608,4.535,17.191,0l84.2-82.997c4.74-4.704,4.74-12.319,0-17.011c-4.74-4.704-12.439-4.704-17.179,0L96.345,78.842L20.734,4.314c-4.74-4.704-12.439-4.704-17.179,0c-4.74,4.704-4.74,12.319,0,17.011L87.755,104.322z' />
          <path className='scroll-arrows__second' d='M171.955,88.526l-75.61,74.528l-75.61-74.54c-4.74-4.704-12.439-4.704-17.179,0c-4.74,4.704-4.74,12.319,0,17.011l84.2,82.997c4.559,4.511,12.608,4.535,17.191,0l84.2-83.009c4.74-4.692,4.74-12.319,0-17.011C184.394,83.823,176.695,83.823,171.955,88.526z' />
        </svg>
      </div>
    )
  }
}
