import React from 'react'
import Page from '@morningtrain/react-app/Page'
import CourseLoop from 'widgets/courses/CourseLoop'

export default
class Courses extends React.Component {
  render () {
    return (
      <Page>
        <CourseLoop />
      </Page>
    )
  }
}
