import React from 'react'

export default class Avatar extends React.PureComponent {
  static get defaultProps () {
    return {
      embed: false
    }
  }

  get content () {
    return {
      __html: this.props.svg || ''
    }
  }

  render () {
    if (this.props.embed) {
      return (
        <g id='avatar' dangerouslySetInnerHTML={this.content} />
      )
    }

    return (<div className='avatar-wrapper' dangerouslySetInnerHTML={this.content} />)
  }
}
