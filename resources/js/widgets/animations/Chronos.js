import React from 'react'
import { Provider } from 'mobx-react'
import Echo from 'services/broadcasting/Echo'
import debounce from 'lodash/debounce'
import { Env } from '@morningtrain/helpers'

export default class Chronos extends React.Component {
  constructor (props) {
    super(props)

    Echo.channel('system.shutdown')
      .listen('.started', debounce((data) => {
        Env.set('shutdown', data)
        this.refreshTime()
      }, 100, { trailing: true }))
      .listen('.ended', debounce((data) => {
        Env.set('shutdown', data)
        this.refreshTime()
      }, 100, { trailing: true }))

    this.state = this.buildStateObject()
  }

  buildStateObject (data = null) {
    const shutdownIsActive = (data === null)
      ? Env.get('shutdown.is_active', false)
      : data.is_active

    return {
      timeOfDay: shutdownIsActive
        ? 'night'
        : 'day'
    }
  }

  refreshTime (data = null) {
    this.setState(this.buildStateObject(data))
  }

  render () {
    return (
      <div className={'time-of-day ' + this.state.timeOfDay}>
        <>
          {this.props.children}
        </>
      </div>
    )
  }
}
