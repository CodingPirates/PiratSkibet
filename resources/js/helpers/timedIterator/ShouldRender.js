import React from 'react'

export default class ShouldRender extends React.Component {
  get isCurrent () {
    const { data_index, current } = this.props

    return data_index === current
  }

  get isNext () {
    if (this.isCurrent) return false

    const { data_index, current, max } = this.props

    if (current === max) return data_index === 0

    return (current + 1) === data_index
  }

  get isPrevious () {
    if (this.isCurrent) return false

    const { data_index, current, max } = this.props

    if (current === 0) return data_index === max

    return (current - 1) === data_index
  }

  get classNames () {
    const BASE_CLASS = 'timed-container'

    return [
      BASE_CLASS,
      this.isNext ? `${BASE_CLASS}__next` : null,
      this.isCurrent ? `${BASE_CLASS}__current` : null,
      this.isPrevious ? `${BASE_CLASS}__previous` : null
    ].filter(e => e).join(' ')
  }

  render () {
    if (!this.isCurrent && !this.isNext && !this.isPrevious) return null

    return (
      <>
        {React.Children.toArray(this.props.children).map(child => {
          return React.cloneElement(child, {
            ...child.props,
            className: [child.props.className, this.classNames].filter(e => e).join(' ')
          })
        })}
      </>
    )
  }
}
