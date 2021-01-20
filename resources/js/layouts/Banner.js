const Element = require('./Element')

export default class Banner extends Element {
  static get defaultProps () {
    return {
      color: null,
      spaced: false
    }
  }

  get defaultClassNames () {
    const classNames = ['banner']

    if (this.props.color) {
      classNames.push(this.props.color)
    }

    if (this.props.spaced) {
      classNames.push('spaced')
    }

    return classNames.join(' ')
  }

  render () {
    return (
      <div className={this.classNames}>
        {this.props.children}
      </div>
    )
  }
}
