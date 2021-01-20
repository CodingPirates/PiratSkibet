import React from 'react'
import { Modal } from 'support/modals'
import { Model } from '@morningtrain/react-resources'
import * as Filters from 'support/filters'
import * as Fields from 'support/fields'
import { Fieldset } from 'layouts'

export default class EditMessageModal extends React.Component {
  renderBody () {
    return (
      <Model resourceName='forum.message' submittable>
        <Filters.Static constraint='message' value={this.props.messageId} />
        <Fieldset cols={1}>
          <Fields.Comment name='content' label='' />
          <input type='submit' value='Gem besked' />
        </Fieldset>
      </Model>
    )
  }

  render () {
    return (
      <Modal label='Opdater besked_' {...this.props}>
        <div className='form-content edit-post'>
          {this.renderBody()}
        </div>
      </Modal>
    )
  }
}
