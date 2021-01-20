import Widget from 'widgets/Widget'

export default class TVMonitor extends Widget {
  constructor (props) {
    super(props)
  }

  static get defaultProps () {
    return {
      maxWidth: '100%',
      center: false
    }
  }

  get renderMonitor () {
    return (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 750' className='monitor-svg'>
        <g className='monitor-svg__foot'>
          <rect className='cls-1' x='315' y='720' width='370' height='30' />
          <rect className='cls-2' x='425' y='660' width='150' height='60' />
        </g>
        <rect className='cls-3' width='1000' height='660' />
        <polygon className='cls-4' points='1000 0 20 17 0 501.64 0 0 1000 0' />
        <rect className='monitor-svg__screen' x='100' y='105' width='800' height='450' />
        <path className='monitor-svg__border cls-5' d='M897,108V552H103V108H897m3-3H100V555H900V105Z' />
        <polygon className='monitor-svg__screen-glare cls-6' points='900 105 179 185 100 555 100 105 900 105' />
        <g className='monitor-svg__buttons'>
          <rect className='cls-7' x='716' y='582' width='80' height='51' />
          <rect className='cls-8' x='726' y='590.36' width='60' height='34.28' />
          <rect className='cls-7' x='820' y='582' width='80' height='51' />
          <rect className='cls-8' x='830' y='590.36' width='60' height='34.28' />
        </g>
      </svg>
    )
  }

  get componentStyles () {
    const styles = {
      maxWidth: this.props.maxWidth
    }

    if (this.props.center) {
      styles.margin = '0 auto'
    }

    return styles
  }

  renderWidget () {
    return (
      <div className='tv-monitor' style={this.componentStyles}>
        {this.renderMonitor}
        <div className='iframe-wrapper'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

// var youtube_command = window.JSON.stringify( { event: 'command', func: 'pauseVideo' } );
// $0.contentWindow.postMessage( youtube_command, 'https://www.youtube.com' );
