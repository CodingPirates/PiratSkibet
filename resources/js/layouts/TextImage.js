import React from 'react'

export default class TextImage extends React.Component {
  static get defaultProps () {
    return {
      direction: 'default',
      img: null,
      alt: '',
      fit: true
    }
  }

  get image () {
    if (this.props.img) {
      return <img src={this.props.img} alt={this.props.alt} />
    }

    return false
  }

  get imageElement () {
    if (this.props.fit) {
      return (
        <div className='object-fit'>
          {this.image}
        </div>
      )
    }

    return this.image
  }

  render () {
    return (
      <div className={`text-image text-image--${this.props.direction}`}>
        <div className='text-image__content'>
          {this.props.children}
        </div>
        <div className={'text-image__image ' + (this.props.fit ? 'text-image__image--fill' : 'text-image__image--nofill')}>
          {this.imageElement}
        </div>
      </div>
    )
  }
}
