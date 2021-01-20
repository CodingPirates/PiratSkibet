import React from 'react'
import Widget from 'widgets/Widget'

export default class Youtube extends Widget {
  constructor (props) {
    super(props)
  }

  get link () {
    if (this.props.link.includes('watch?v=')) {
      return this.props.link.split('watch?v=')[1]
    }

    return this.props.link
  }

  get options () {
    const { options } = this.props
    const opt = {
      enablejsapi: 1,
      ...options
    }

    return Object.keys(opt).map(key => {
      return `${key}=${opt[key]}`
    }).join('&')
  }

  get src () {
    return `https://www.youtube.com/embed/${this.link}?${this.options}`
  }

  renderWidget () {
    return (
      <iframe
        width='560' height='315'
        src={this.src}
        frameBorder='0'
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      />
    )
  }
}

Youtube.defaultProps = {
  options: {}
}
