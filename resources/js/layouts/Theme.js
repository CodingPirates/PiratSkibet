import React from 'react'

export default class Theme extends React.Component {
  static get defaultProps () {
    return {
      name: 'default',
      className: ''
    }
  }

  get themes () {
    // If you update this, please update App\Support\Enums\Theme.php accordingly
    return {
      default: 'bg--blue text--black',
      'yellow-pink': 'bg--yellow text--pink',
      'yellow-black': 'bg--yellow text--black',
      'blue-yellow': 'bg--blue text--yellow',
      'blue-black': 'bg--blue text--black',
      'pink-yellow': 'bg--pink text--yellow',
      'pink-black': 'bg--pink text--black',
      'grey-blue': 'bg--grey text--blue',
      'grey-pink': 'bg--grey text--pink',
      'grey-black': 'bg--grey text--black'
    }
  }

  get classNames () {
    const classNames = []

    if (this.props.className) {
      classNames.push(this.props.className)
    }

    classNames.push(this.themes[this.props.name])

    return classNames.join(' ')
  }

  renderChildren () {
    if (React.Children.count(this.props.children) === 0) {
      return null
    }

    return React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, { className: [child.props.className, this.classNames].join(' ') })
    })
  }

  render () {
    return (
      <>
        {this.renderChildren()}
      </>
    )
  }
}
