import React from 'react'
import ShutdownBase from 'widgets/shutdown/ShutdownBase'
import Countdown from 'react-countdown-now'

export default class ShutdownWarning extends ShutdownBase {
  constructor (props) {
    super(props)

    this.renderCountdown.bind(this)
  }

  renderCountdown ({ hours, minutes, seconds, completed }) {
    if (completed) {
      // Render a completed state
      return (
        <div>
          <span>Siden lukker ned nu!</span>
        </div>
      )
    } else {
      // Render a countdown
      return (
        <div>
          <span>Siden lukker ned om&nbsp;</span>
          {(hours)
            ? (
              <span>
                {hours} timer&nbsp;
              </span>
              ) : null}
          {(minutes)
            ? (
              <span>
                {minutes} minutter&nbsp;
              </span>
              ) : null}
          {(seconds)
            ? (
              <span>
                {seconds} sekunder&nbsp;
              </span>
              ) : null}
        </div>
      )
    }
  }

  renderWidget () {
    if (!this.isShuttingDown) {
      return null
    }

    return (
      <div className='shutdown-warning-banner'>
        <Countdown
          date={this.startsAt.toDate()}
          renderer={this.renderCountdown}
        />
      </div>
    )
  }
}
