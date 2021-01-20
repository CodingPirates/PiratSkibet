import React from 'react'

export default class ViewToggle extends React.Component {
  constructor (props) {
    super(props)

    this.changeView = this.changeView.bind(this)
  }

  get view () {
    return this.props.view
  }

  get isActive () {
    return this.view === this.props.active
  }

  get className () {
    return this.isActive
      ? 'view-toggle view-toggle--active'
      : 'view-toggle'
  }

  get gridIcon () {
    return (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 27'>
        <rect width='7' height='7' />
        <rect x='10' width='7' height='7' />
        <rect x='20' width='7' height='7' />
        <rect y='10' width='7' height='7' />
        <rect x='10' y='10' width='7' height='7' />
        <rect x='20' y='10' width='7' height='7' />
        <rect y='20' width='7' height='7' />
        <rect x='10' y='20' width='7' height='7' />
        <rect x='20' y='20' width='7' height='7' />
      </svg>
    )
  }

  get listIcon () {
    return (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 27'>
        <rect width='7' height='7' />
        <rect x='10' y='2' width='17' height='3' />
        <rect y='10' width='7' height='7' />
        <rect x='10' y='12' width='17' height='3' />
        <rect y='20' width='7' height='7' />
        <rect x='10' y='22' width='17' height='3' />
      </svg>
    )
  }

  get viewIcon () {
    switch (this.view) {
      case 'gallery':
        return this.gridIcon
      case 'list':
        return this.listIcon
      default:
        return this.view
    }
  }

  changeView () {
    const { onChange } = this.props

    if (typeof onChange === 'function') onChange(this.view)
  }

  render () {
    return (
      <div className={this.className} onClick={this.changeView}>{this.viewIcon}</div>
    )
  }
}
