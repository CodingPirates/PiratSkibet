import Widget from 'widgets/Widget'

export default class ProgressBar extends Widget {
  constructor (props) {
    super(props)

    this.courseNode = React.createRef()
    this.updatePercentageWidth = this.updatePercentageWidth.bind(this)

    this.state = {
      progressBarWidth: 0
    }
  }

  static get defaultProps () {
    return {
      ...super.defaultProps,
      progress: 0,
      type: 'default'
    }
  }

  componentDidMount () {
    this.updatePercentageWidth()
    window.addEventListener('resize', this.updatePercentageWidth, false)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updatePercentageWidth, false)
  }

  updatePercentageWidth () {
    const progressBar = this.courseNode.current
    const progressBarWidth = progressBar.offsetWidth

    this.setState({ progressBarWidth: progressBarWidth })
  }

  get progressBarType () {
    return 'mtt-progressbar__wrap mtt-progressbar__wrap--' + this.props.type
  }

  get progressBarWidth () {
    const progressBarWidth = {
      width: this.state.progressBarWidth + 'px'
    }

    return progressBarWidth
  }

  renderWidget () {
    return (
      <div className={this.progressBarType}>
        <div className='mtt-progressbar' ref={this.courseNode}>
          <div className='mtt-progressbar__progress' style={{ width: this.props.progress + '%' }}>
            <div className='mtt-progressbar__percentage mtt-progressbar__percentage--inverted' style={this.progressBarWidth}>{this.props.progress}%</div>
          </div>
          <div className='mtt-progressbar__percentage'>{this.props.progress}%</div>
        </div>
      </div>
    )
  }
}
