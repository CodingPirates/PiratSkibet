import React from 'react'
import { Text } from 'support/displays'

export default class MessagesCountTag extends React.Component {
  render () {
    return (
      <div className='project__tag'>
        <div className='reaction comment'>
          <div className='reaction__count'><Text name='thread_messages_count' /></div>
        </div>
      </div>
    )
  }
}
