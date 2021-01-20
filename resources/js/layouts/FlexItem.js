const Element = require('./Element')

export default class FlexItem extends Element {
  get defaultClassNames () {
    const classNames = ['flex-item']

    if (this.props.grow === true) {
      classNames.push('grow')
    }

    if (this.props.shrink === true) {
      classNames.push('shrink')
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
