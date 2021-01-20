import React from 'react'
import Widget from 'widgets/Widget'
import Section from 'layouts/Section'
import Index from 'pages/backend/moderation/actions/Index'

export default class Actions extends Widget {
  renderWidget () {
    return (
      <>
        <Section boxed={false} header={<h5>Ændringslog for sagen</h5>}>
          <Index />
        </Section>
      </>
    )
  }
}
