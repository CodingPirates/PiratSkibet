import React from 'react'
import { Modal } from 'support/modals'
import { Model } from '@morningtrain/react-resources'
import * as Filters from 'support/filters'
import ThreadMessage from 'widgets/forum/ThreadMessage'
import CloseModalOnSuccess from 'support/reactions/CloseModalOnSuccess'

export default class AcceptAnswerModal extends React.Component {
  renderBody () {
    return (
      <Model resourceName='forum.message' submitoperationName='accept' submittable>
        <CloseModalOnSuccess />
        <Filters.Static constraint='message' value={this.props.messageId} />
        <ThreadMessage embed />
        <input type='submit' value='Accepter svar' />
      </Model>
    )
  }

  render () {
    return (
      <Modal label='Vil du vælge denne besked som accepteret svar?' {...this.props}>
        <div className='form-content edit-post accepted-post'>
          {this.renderBody()}
        </div>
      </Modal>
    )
  }
}
