const Element = require('./Element')

export default class WorldWithScrollableContent extends Element {
  get defaultClassNames () {
    const classNames = ['wrapper-for-world-with-scrollable-content']

    if (this.props.dark === true) {
      classNames.push('dark')
    }

    return classNames.join(' ')
  }

  addOverlay () {
    return this.props.overlay === undefined || this.props.overlay !== false
      ? <div className='world-overlay' />
      : ''
  }

  render () {
    return (
      <div className={this.classNames}>
        <div className='world-wrapper'>
          {this.props.world}
          {this.addOverlay()}
        </div>
        <div className='content-inside-world'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
