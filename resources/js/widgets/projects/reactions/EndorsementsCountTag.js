import React from 'react'
import { Text } from 'support/displays'
import Can from '@morningtrain/react-auth/Can'

export default class EndorsementsCountTag extends React.Component {
  render () {
    return (
      <Can permission='api.projects.project.endorse'>
        <div className='project__tag'>
          <div className='reaction endorse'>
            <div className='reaction__count'><Text name='endorsements_count' /></div>
          </div>
        </div>
      </Can>
    )
  }
}
