import React from 'react'
import Widget from 'widgets/Widget'

export default class Tooltip extends Widget {
  constructor (props) {
    super(props)

    this.state = {
      display: false
    }
  }

  static get defaultProps () {
    return {
      text: '',
      direction: 'top'
    }
  }

  get classList () {
    const classes = {
      tooltip: true,
      'tooltip--active': this.state.display
    }

    return Object
      .entries(classes)
      .filter(entry => entry[1])
      .map(entry => entry[0])
      .join(' ')
  }

  renderWidget () {
    return (
      <>
        <span onMouseEnter={() => this.setState({ display: true })} onMouseLeave={() => this.setState({ display: false })} className={this.classList + ` tooltip--${this.props.direction}`}>
          <span className='tooltip__text' data-tooltip={this.props.text} />
          {this.props.children}
        </span>
      </>
    )
  }
}
