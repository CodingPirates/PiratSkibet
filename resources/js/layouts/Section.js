const Element = require('./Element')

export default class Section extends Element {
  static get defaultProps () {
    return {
      header: null
    }
  }

  get defaultClassNames () {
    const classNames = ['section-wrap']

    if (this.props.boxed === true) {
      classNames.push('boxed')
    }

    return classNames.join(' ')
  }

  renderHeader () {
    if (!this.props.header) {
      return null
    }

    return (
      <div className='section-header'>
        {this.props.header}
      </div>
    )
  }

  render () {
    const { children, id } = this.props

    return (
      <div id={id} className={this.classNames}>
        {this.renderHeader()}
        <div className='section-content'>
          {children}
        </div>
      </div>
    )
  }
}
