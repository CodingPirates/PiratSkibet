import React from 'react'
import Animation from 'widgets/animations/Animation'

export default class Water extends Animation {
  static get defaultProps () {
    return {
      ...super.defaultProps
    }
  }

  get classNames () {
    return 'water-line-'
  }

  renderContent () {
    return (
      <svg xmlns='http://www.w3.org/2000/svg' width='1921.177' height='29.573' viewBox='0 0 1921.177 29.573'>
        <path d='M1990,677l186.2-5.443L2480.859,680l443.505-9.443,226,5.443,367.974-4.443,392.838-4.469v19.833L3568.448,680,3102.24,695.042,2837.656,685l-217.51,3.922-158.406,7.74-134.4-7.74-167.266,4.12-170.073-2Z' transform='translate(-1990 -667.088)' />
      </svg>
    )
  }
}
