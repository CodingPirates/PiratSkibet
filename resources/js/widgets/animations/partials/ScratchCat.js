import React from 'react'
import { router } from '@morningtrain/helpers'
import Animation from 'widgets/animations/Animation'

export default class ScratchCat extends Animation {
  static get defaultProps () {
    return {
      ...super.defaultProps
    }
  }

  get transitionsProps () {
    return {}
  }

  get classNames () {
    return 'scratch-cat-'
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
      <img className='scratch-cat' src={router.url('img/scratch_cat.png')} alt='scratch cat' />
    )
  }
}
