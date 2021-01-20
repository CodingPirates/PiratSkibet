import React from 'react'
import { Modal } from 'support/modals'
import { Collection, Iterator } from '@morningtrain/react-resources'
import * as Filters from 'support/filters'
import * as Fields from 'support/fields'
import { Html } from 'support/displays'

export default class ViewMessageChangedModal extends React.Component {
  renderBody () {
    return (
      <Collection resourceName='forum.message' operationName='changes'>
        <Filters.Static constraint='message_id' value={this.props.messageId} />
        <Iterator>
          <div className='forum-edited'>
            <Html name='content' className='tester' />
            <div className='forum-edited__date'>
              <Fields.Value name='created_at' />
            </div>
          </div>
        </Iterator>
      </Collection>
    )
  }

  render () {
    return (
      <Modal label='Ændringshistorik_' {...this.props}>
        <div className='form-content'>
          {this.renderBody()}
        </div>
      </Modal>
    )
  }
}
