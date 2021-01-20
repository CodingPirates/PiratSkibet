import React from 'react'
import { Text } from 'support/displays'

export default class LikesTag extends React.Component {
  render () {
    return (
      <div className='project__tag'>
        <div className='reaction like'>
          <div className='reaction__count'><Text name='likes_count' /></div>
        </div>
      </div>
    )
  }
}
