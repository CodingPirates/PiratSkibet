const Element = require('./Element')
const PropTypes = require('prop-types')

class Block extends Element {
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
    return { innerClassName: '' }
  }

  get defaultClassNames () {
    return 'content-box'
  }

  render () {
    return (
      <div className={this.classNames}>
        <div className='content-box-inner'>
          <div className='content-box-inner-header'>
            <h2>{this.props.label}</h2>
            {this.props.head}
          </div>
          {this.props.afterHead}
          <div className={'content-box-inner-content' + (this.props.flex ? ' flex' : '') + ' ' + this.props.innerClassName}>
            {this.props.children}
          </div>
        </div>
        {this.props.foot}
      </div>
    )
  }
}

module.exports = Block
