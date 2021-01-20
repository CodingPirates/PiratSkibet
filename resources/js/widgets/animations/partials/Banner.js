import React from 'react'
import Animation from 'widgets/animations/Animation'
import MorphingText from 'widgets/animations/partials/MorphingText'
import * as Filters from 'support/filters'
import { Collection } from '@morningtrain/react-resources'

export default class Banner extends Animation {
  static get defaultProps () {
    return {
      ...super.defaultProps
    }
  }

  get transitionsProps () {
    return {}
  }

  get classNames () {
    return 'animated-banner-'
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
      <div className='banner-wrap'>
        <svg className='animated-banner' version='1.1' id='Lag_1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 233.5 52'>
          <g>
            <g className='st0'>
              <g>
                <rect x='9' y='13.4' className='st1' width='224.5' height='38.4' />
              </g>
            </g>
          </g>
          <rect x='4.2' y='4.7' className='st1' width='221.5' height='38.4' />
          <path className='st2' d='M230.2,47H0.3V0h230V47z M8.8,38.5h213V8.5H8.8V38.5z' />
        </svg>
        <Collection resourceName='news' operationContext='ticker'>
          <Filters.Static constraint='$per_page' value={3} />
          <Filters.Static constraint='$order' value={{ publish_at: 'desc' }} />
          <MorphingText duration={1} interval={10000} />
        </Collection>
      </div>
    )
  }
}
