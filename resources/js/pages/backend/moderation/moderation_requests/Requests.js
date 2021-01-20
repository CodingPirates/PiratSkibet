import React from 'react'
import Widget from 'widgets/Widget'
import Section from 'layouts/Section'
import Index from 'pages/backend/moderation/moderation_requests/Index'

export default class Requests extends Widget {
  renderWidget () {
    return (
      <>
        <Section boxed={false} header={<h5>Indrapporteringer</h5>}>
          <Index />
        </Section>
      </>
    )
  }
}
