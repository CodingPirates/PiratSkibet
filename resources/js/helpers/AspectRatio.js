import Widget from 'widgets/Widget'

export default
class AspectRatio extends Widget {
  constructor (props) {
    super(props)
  }

  static get defaultProps () {
    return {
      ratio: '16:9',
      maxWidth: '100%'
    }
  }

  get ratio () {
    switch (this.props.ratio) {
      case '16:9':
        return '56.25%'
      case '16:10':
        return '62.5%'
      case '3:2':
        return '66.66%'
      case '4:3':
        return '75%'
      case '1:1':
        return '100%'
      default:
        return '56.25%'
    }
  }

  renderWidget () {
    return (
      <div className='aspect-ratio' style={{ maxWidth: this.props.maxWidth }}>
        <div className='aspect-ratio__inside' style={{ paddingBottom: this.ratio }}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
