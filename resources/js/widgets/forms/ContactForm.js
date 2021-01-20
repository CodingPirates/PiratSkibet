import React from 'react'
import Widget from 'widgets/Widget'
import { Form, Operation } from '@morningtrain/react-resources'
import * as Fields from 'support/fields'
import { Fieldset } from 'layouts'
import RecaptchaInfo from 'services/recaptcha/RecaptchaInfo'
import RecaptchaEvent from 'services/recaptcha/RecaptchaEvent'

export default class ContactForm extends Widget {
  static get defaultProps () {
    return {
      type: null,
      displayName: true,
      displayEmail: true,
      displayPhone: true,
      displaySubject: true,
      displayMessage: true,
      nameLabel: 'Navn',
      emailLabel: 'Email',
      phoneLabel: 'Telefon',
      subjectLabel: 'Emne',
      messageLabel: 'Besked',
      submitLabel: 'Send'
    }
  }

  renderWidget () {
    return (
      <Operation resourceName='contact' operationName='submit'>
        <Form submitTo='submit' resetOnSuccess>
          <Fieldset cols={2}>

            {(this.props.type === null) ? (
              <Fields.Select name='type' enum='contact_submission_type' />
            ) : (
              <Fields.Hidden name='type' value={this.props.type} />
            )}

            {(this.props.displayName !== true) ? null : (
              <Fields.Input name='name' label={this.props.nameLabel} />
            )}

            {(this.props.displayEmail !== true) ? null : (
              <Fields.Input name='email' label={this.props.emailLabel} required />
            )}

            {(this.props.displayPhone !== true) ? null : (
              <Fields.Input name='phone' label={this.props.phoneLabel} />
            )}

            {(this.props.displaySubject !== true) ? null : (
              <Fields.Input name='subject' label={this.props.subjectLabel} required />
            )}

            {(this.props.displayMessage !== true) ? null : (
              <Fields.TextArea name='message' label={this.props.messageLabel} required />
            )}

            <div className='recaptcha-info'>
              <RecaptchaInfo />
            </div>

            <RecaptchaEvent actionName='contact_form' />

            <div className='form-submit-wrap'>
              <input type='submit' value={this.props.submitLabel} />
            </div>
          </Fieldset>
        </Form>
      </Operation>
    )
  }
}
