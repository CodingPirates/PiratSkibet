import React from 'react'
import Page from '@morningtrain/react-app/Page'
import CoursesWorld from 'widgets/animations/worlds/CoursesWorld'

export default
class Overview extends React.Component {
  render () {
    return (
      <Page>
        <CoursesWorld classNames='course-world' />
      </Page>
    )
  }
}
