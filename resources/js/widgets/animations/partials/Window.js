import React from 'react'
import Animation from 'widgets/animations/Animation'
import shortid from 'shortid'

export default class Window extends Animation {
  constructor (props) {
    super(props)
    this.windowId = shortid.generate()
  }

  static get defaultProps () {
    return {
      ...super.defaultProps
    }
  }

  get transitionsProps () {
    return {}
  }

  get classNames () {
    return 'window-'
  }

  get width () {
    return this.scaleWidth(100) + '%'
  }

  get styles () {
    return {
      ...super.styles
    }
  }

  renderContent () {
    return (
      <svg className='window' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 50 50'>
        <defs>
          <filter id={'blurWindow--' + this.windowId} x='-50%' y='-50%' width='200%' height='200%'>
            <feGaussianBlur stdDeviation='4' />
          </filter>
        </defs>
        <path className='window__light' d='M40,10h-9.9v10.1H40V10z M20,10H10v10.1h9.9L20,10L20,10z M30,20H20V30H30V20z M40,30h-9.9v10H40V30z M20,30H10v10h9.9L20,30L20,30z' filter={`url(#blurWindow--${this.windowId})`} />
        <path className='window__fill' d='M40,10h-9.9v10.1H40V10z M20,10H10v10.1h9.9L20,10L20,10z M30,20H20V30H30V20z M40,30h-9.9v10H40V30z M20,30H10v10h9.9L20,30L20,30z' />
      </svg>
    )
  }
}
