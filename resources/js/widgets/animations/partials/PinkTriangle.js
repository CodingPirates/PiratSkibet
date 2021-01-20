import React from 'react'
import Animation from 'widgets/animations/Animation'
import shortid from 'shortid'
import { Collection, Iterator } from '@morningtrain/react-resources'
import Link from 'widgets/navigation/Link'
import * as Displays from 'support/displays'
import TimedIterator from 'helpers/timedIterator/TimedIterator'

export default class PinkTriangle extends Animation {
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
    return 'pink-triangle-'
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
      <>
        <div className='project-surface__wrapper'>
          <div className='project-surface'>
            <Collection resourceName='projects.project' operationName='newest' operationContext='pink_triangle'>
              <TimedIterator duration={1} interval={4000}>
                <Link route='app.projects.project' parameters={{ project: 'model:id' }}>
                  <Displays.Image name='thumbnail_url' />
                </Link>
              </TimedIterator>
            </Collection>
          </div>
        </div>
        <svg className='pink-triangle' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 650 194'>
          <defs>
            <filter id={'blurWindow--' + this.windowId} x='-50%' y='-50%' width='200%' height='200%'>
              <feGaussianBlur id={'blur--' + this.windowId} stdDeviation='5' />
            </filter>
          </defs>

          <polygon className='pink-triangle__water pink-triangle__water--tr' points='360.7,68 640.2,129.3 444.2,184.4 10,164.8 225.2,92 	' />
          <polygon className='pink-triangle__water pink-triangle__water--prim' points='374.1,78.7 597.1,129.5 441.1,171.9 61.1,158 199.8,115.6 	' />
          <g className='pink-triangle__body'>
            <g>
              <polygon className='st2' points='240.4,25.9 383.7,10.4 565.6,128.4 441.4,164.1' />
              <polygon className='st3' points='98.8,152.1 240.4,25.9 441.4,164.1' />
              <polygon className='st1' points='240.4,25.9 441.4,164.1 260.4,30.9 376.8,11.2' />
            </g>
            <g>
              <path className='st4' d='M252,140.1c17.5,0.3,32-13.7,32.3-31.2c0.3-17.5-13.7-32-31.2-32.3c-17.5-0.3-32,13.7-32.3,31.2C220.5,125.3,234.4,139.8,252,140.1' />
              <g className='glitchable'>
                <path className='st5' d='M252.2,130.6c15.6,0.3,28.4-12.1,28.7-27.7c0.3-15.6-12.1-28.4-27.7-28.7c-15.6-0.3-28.4,12.1-28.7,27.7C224.1,117.5,236.6,130.4,252.2,130.6' />
                <path
                  className='st6' d='M252.7,132.2c-0.2,0-0.4,0-0.5,0c-8-0.1-15.4-3.4-20.9-9.1c-5.5-5.7-8.5-13.3-8.4-21.2s3.4-15.4,9.1-20.9
                                    c5.7-5.5,13.2-8.5,21.2-8.4c8,0.1,15.4,3.4,20.9,9.1s8.5,13.3,8.4,21.2c-0.1,8-3.4,15.4-9.1,20.9
                                    C267.7,129.3,260.4,132.2,252.7,132.2z M252.6,75.8c-6.9,0-13.5,2.6-18.5,7.5c-5.1,4.9-8,11.6-8.1,18.7c-0.1,7.1,2.5,13.9,7.5,19
                                    c4.9,5.1,11.6,8,18.7,8.1l0,0c7.1,0.1,13.9-2.5,19-7.5c5.1-4.9,8-11.6,8.1-18.7c0.1-7.1-2.5-13.9-7.5-19s-11.6-8-18.7-8.1
                                    C253,75.8,252.8,75.8,252.6,75.8z'
                />
                <path className='st7 st7--light' d='M252.5,117.6c8.8,0.2,16-6.8,16.2-15.6s-6.8-16-15.6-16.2c-8.8-0.2-16,6.8-16.2,15.6C236.8,110.2,243.8,117.4,252.5,117.6' filter={`url(#blurWindow--${this.windowId})`} />
                <path className='st7' d='M252.5,117.6c8.8,0.2,16-6.8,16.2-15.6s-6.8-16-15.6-16.2c-8.8-0.2-16,6.8-16.2,15.6C236.8,110.2,243.8,117.4,252.5,117.6' />
                <path className='window-glare' d='M252.4,106.9c3,0.1,5.5-2.3,5.6-5.4c0.1-3-2.4-5.5-5.4-5.6c-3-0.1-5.5,2.3-5.6,5.4C247,104.4,249.4,106.9,252.4,106.9' />
              </g>
            </g>
          </g>
          <polygon className='pink-triangle__water' points='574,124 566,129 441,164 99,152 85,151 61,158 441,172 597,129' />
        </svg>
      </>
    )
  }
}
