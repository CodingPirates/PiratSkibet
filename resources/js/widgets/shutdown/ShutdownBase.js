import Widget from '../Widget'
import moment from 'moment'
import { Env } from '@morningtrain/helpers'
import Echo from 'services/broadcasting/Echo'
import debounce from 'lodash/debounce'

export default class ShutdownBase extends Widget {
  static get defaultProps () {
    return {
      demountDelay: 0,
      mountDelay: 0
    }
  }

  constructor (props) {
    super(props)

    this.state = this.buildState()

    Echo.channel('system.shutdown')
      .listen('.started', debounce((data) => {
        Env.set('shutdown', data)
        setTimeout(() => {
          this.refreshState()
        }, this.props.mountDelay)
      }, 100, { trailing: true }))
      .listen('.ended', debounce((data) => {
        Env.set('shutdown', data)
        setTimeout(() => {
          this.refreshState()
        }, this.props.demountDelay)
      }, 100, { trailing: true }))
  }

  buildState () {
    return {
      isShuttingDown: this.isWithinWarningDelay,
      isDown: this.isActive
    }
  }

  refreshState () {
    this.setState(this.buildState())
  }

  get warningDeplay () {
    return parseInt(Env.get('shutdown.warning_delay', 30))
  }

  get isActive () {
    return Env.get('shutdown.is_active', false)
  }

  get startsAt () {
    return moment(Env.get('shutdown.starts_at'))
  }

  get minutesUntilShutdown () {
    return this.startsAt.diff(moment.utc(), 'minute')
  }

  get isWithinWarningDelay () {
    if (this.isActive) {
      return false
    }

    return this.warningDeplay >= this.minutesUntilShutdown
  }

  get isShuttingDown () {
    return this.state.isShuttingDown
  }

  get isDown () {
    return this.state.isDown
  }

  renderWidget () {
    return null
  }
}
