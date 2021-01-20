import React from 'react'
import Animation from 'widgets/animations/Animation'

export default class IslandSign extends Animation {
  static get defaultProps () {
    return {
      ...super.defaultProps,
      rotate: 0,
      signColor: '#f9d12b',
      image: null
    }
  }

  get transitionsProps () {
    return {}
  }

  get classNames () {
    return 'island-sign-'
  }

  get width () {
    return this.scaleWidth(100) + '%'
  }

  get styles () {
    return {
      ...super.styles
    }
  }

  get image () {
    return this.props.image ? <image width='159.662' height='69.645' transform='translate(42.176 6.135)' xlinkHref={this.props.image} /> : ''
  }

  renderContent () {
    return (
      <svg className='island-sign' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' width='243.846' height='131.452' viewBox='0 0 243.846 131.452' style={{ transform: `rotate(${this.props.rotate}deg)` }}>
        <g transform='translate(20.176 0)'>
          <path d='M19.005,131.388V8.374C19.005,3.749,17.242,0,12.616,0H6.39C1.764,0,0,3.749,0,8.374V131.388Z' fill='#bcbec0' />
          <path d='M8.634,0,0,.064c4.626,0,6.39,3.749,6.39,8.374V131.452l8.633-.064V8.374C15.024,3.749,13.26,0,8.634,0Z' transform='translate(3.981 0)' fill='#939598' />
          <path d='M0,0,19.005,5.082V0Z' transform='translate(0 99.085)' fill='#939598' />
        </g>
        <path d='M9.368,0H6.39C1.764,0,0,3.749,0,8.374V131.388H2.979V8.374C2.979,3.749,4.742,0,9.368,0Z' transform='translate(20.176 0)' fill='#d1d3d4' opacity='0.2' />
        <g transform='translate(204.665 0)'>
          <path d='M19,131.388V8.374C19,3.749,17.241,0,12.616,0H6.388C1.763,0,0,3.749,0,8.374V131.388Z' fill='#bcbec0' />
          <path d='M8.634,0,0,.064c4.626,0,6.389,3.749,6.389,8.374V131.452l8.633-.064V8.374C15.022,3.749,13.259,0,8.634,0Z' transform='translate(3.981 0)' fill='#939598' />
          <path d='M0,0,19,5.082V0Z' transform='translate(0 99.085)' fill='#939598' />
          <path d='M9.367,0H6.388C1.763,0,0,3.749,0,8.374V131.388H2.978V8.374C2.978,3.749,4.742,0,9.367,0Z' fill='#d1d3d4' opacity='0.2' />
        </g>
        <g transform='translate(0 15.927)'>
          <rect width='243.846' height='83.158' rx='6.356' fill={this.props.signColor} />
          {this.image}
          <path d='M100,0H25.527L0,83.157H100a7.942,7.942,0,0,0,7.942-7.942V7.942A7.943,7.943,0,0,0,100,0Z' transform='translate(135.905 0)' fill='#fff' opacity='0.1' />
          <path d='M235.394,67.581a7.259,7.259,0,0,1-7.374,7.138H7.373A7.259,7.259,0,0,1,0,67.581V7.136A7.257,7.257,0,0,1,7.373,0H228.021a7.257,7.257,0,0,1,7.374,7.136Z' transform='translate(4.225 4.22)' fill='none' stroke='#fff' strokeMiterlimit='10' strokeWidth='2' />
        </g>
      </svg>
    )
  }
}
