import React from 'react'
import LikesTag from 'widgets/projects/reactions/LikesTag'
import MessagesCountTag from 'widgets/projects/reactions/MessagesCountTag'
import EndorsementsCountTag from 'widgets/projects/reactions/EndorsementsCountTag'

export default class AllProjectTags extends React.Component {
  render () {
    return (
      <>
        <LikesTag />
        <MessagesCountTag />
        <EndorsementsCountTag />
      </>
    )
  }
}
