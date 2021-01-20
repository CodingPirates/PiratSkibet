import React from 'react'
import CaseStatusBanner from 'pages/backend/moderation/cases/CaseStatusBanner'
import * as Displays from 'support/displays'
import Link from 'widgets/navigation/Link'
import Preview from 'pages/backend/moderation/moderateable/Preview'
import Section from 'layouts/Section'

export default class Abstract extends React.Component {
  constructor (props) {
    super(props)

    if (this.constructor === Abstract) {
      throw new TypeError('Abstract Moderateable class cannot be instantiated directly.')
    }
  }

  get moderateable () {
    return this.props.model.get('moderateable')
  }

  /// ///////////////////////
  /// Abstracts
  /// ///////////////////////

  get previewLabel () {
    return 'Forhåndsvisning'
  }

  get linkProps () {
    return null
  }

  renderContent () {
    return null
  }

  renderPreview () {
    return null
  }

  renderModerationActions () {
    return null
  }

  renderLink () {
    const { linkProps } = this

    return linkProps ? <Link {...linkProps} /> : null
  }

  /// ///////////////////////
  /// Render
  /// ///////////////////////

  render () {
    return (
      <>
        <CaseStatusBanner>
          {this.renderModerationActions()}
        </CaseStatusBanner>

        <Section
          boxed header={(
            <>
              <h3>Moderation af <Displays.Enum name='moderateable_type' enum='models' /></h3>
              <div className='moderation-case--case-actions'>
                {this.renderLink()}
                <Preview label={this.previewLabel}>
                  {this.renderPreview()}
                </Preview>
              </div>
            </>
                )}
        >
          {this.renderContent()}
        </Section>

      </>
    )
  }
}
