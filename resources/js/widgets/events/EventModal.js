import Widget from 'widgets/Widget'
import * as Modals from 'support/modals'
import * as Filters from 'support/filters'
import { Model } from '@morningtrain/react-resources'
import EventDetails from 'widgets/events/EventDetails'

export default class EventModal extends Widget {
  constructor (props) {
    super(props)

    this.modal = React.createRef()
  }

  open () {
    return this.modal.current.open()
  }

  render () {
    return (
      <Modals.Modal ref={this.modal}>
        <Model resourceName='event'>
          <Filters.Static constraint='event' value={this.props.eventId} />
          {/* TODO - "read" call after close? */}
          <EventDetails />
        </Model>
      </Modals.Modal>
    )
  }
}
