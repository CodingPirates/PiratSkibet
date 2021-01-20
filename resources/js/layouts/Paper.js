import React from 'react'
import { timingSafeEqual } from 'crypto'

export default class Paper extends React.Component {
  static get defaultProps () {
    return {
      size: 'default',
      template: 'default',
      top: true,
      right: true,
      bottom: true,
      left: true
    }
  }

  get disabledHorizontal () {
    let classNames = ''

    this.props.top ? '' : classNames += ' paper__edges--no-top'
    this.props.bottom ? '' : classNames += ' paper__edges--no-bottom'

    return classNames
  }

  get disabledVertical () {
    let classNames = ''

    this.props.left ? '' : classNames += ' paper__edges--no-left'
    this.props.right ? '' : classNames += ' paper__edges--no-right'

    return classNames
  }

  render () {
    return (
      <div className={'paper paper--' + this.props.size + ' paper--template-' + this.props.template}>
        <div className={'paper__edges paper__edges--horizontal' + this.disabledHorizontal} />
        <div className={'paper__edges paper__edges--vertical' + this.disabledVertical} />

        <div className='paper__content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
