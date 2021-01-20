const Element = require('../Element')
const PropTypes = require('prop-types')
class Fieldset extends Element {
  static get propTypes () {
    return {
      head: PropTypes.any,
      afterHead: PropTypes.any,
      foot: PropTypes.any,
      label: PropTypes.string,
      flex: PropTypes.bool
    }
  }

  static get defaultProps () {
    return { innerClassName: '', cols: 1 }
  }

  get defaultClassNames () {
    return [
      'fieldset',
      'form-element',
      'simple',
      'form-field',
      'full-width'
    ]
  }

  get innerClassNames () {
    return [
      this.columnsClass,
      'form-wrap',
      'fieldset-inner-content',
      (this.props.flex ? ' flex' : ''),
      this.props.innerClassName
    ].join(' ')
  }

  renderHeader () {
    if (!this.props.label) {
      return null
    }

    return (
      <div className='fieldset-inner-header form-header'>
        <h2>{this.props.label}</h2>
        {this.props.head}
      </div>
    )
  }

  render () {
    return (
      <div className={this.classNames}>
        <div className='fieldset-inner'>
          {this.renderHeader()}
          {this.props.afterHead}
          <div className={this.innerClassNames}>
            {this.props.children}
          </div>
        </div>
        {this.props.foot}
      </div>
    )
  }
}

module.exports = Fieldset
