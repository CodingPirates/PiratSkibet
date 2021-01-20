import React from 'react'
import Page from '@morningtrain/react-app/Page'
import StepLoop from 'widgets/courses/StepLoop'

export default
class Course extends React.Component {
  render () {
    return (
      <Page>
        <StepLoop />
      </Page>
    )
  }
}
