const Element = require('./Element')

export default class FlexSplitter extends Element {
  get defaultClassNames () {
    const classNames = ['flex-items-splitter']

    if (this.props.cols) {
      classNames.push('cols-' + this.props.cols)
    }

    if (this.props.verticalCenter) {
      classNames.push('vertical-center')
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
