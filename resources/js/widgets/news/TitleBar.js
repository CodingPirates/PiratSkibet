import React from 'react'
import Widget from 'widgets/Widget'

export default class TitleBar extends Widget {
  static get defaultProps () {
    return {
      title: '',
      linkText: null,
      link: '#',
      external: false
    }
  }

  get title () {
    return <h2>{this.props.title}</h2>
  }

  get link () {
    return this.props.linkText !== null ? <a target={(this.props.external ? '_blank' : '_self')} href={this.props.link}>{this.props.linkText}</a> : ''
  }

  renderWidget () {
    return (
      <div className='title-bar'>
        {this.title}
        {this.link}
      </div>
    )
  }
}
