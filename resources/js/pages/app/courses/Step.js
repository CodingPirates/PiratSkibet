import React from 'react'
import Page from '@morningtrain/react-app/Page'
import StepResources from 'widgets/courses/StepResources'

export default
class Step extends React.Component {
  render () {
    return (
      <Page>
        <StepResources />
      </Page>
    )
  }
}
