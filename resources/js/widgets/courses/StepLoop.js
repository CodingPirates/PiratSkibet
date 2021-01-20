import Widget from 'widgets/Widget'
import { Collection, Model, Iterator, ConfirmModal } from '@morningtrain/react-resources'
import React from 'react'
import CourseInformation from 'widgets/courses/CourseInformation'
import CourseLevelWorld from 'widgets/animations/worlds/CourseLevelWorld'
import * as Filters from 'support/filters'
import Section from 'layouts/Section'
import ResourceEntry from 'widgets/courses/ResourceEntry'
import CourseNavigation from 'widgets/courses/CourseNavigation'
import Operation from '@morningtrain/react-resources/src/Operation'

export default class StepLoop extends Widget {
  renderWidget () {
    return (
      <>
        <div className='course-steps'>

          <Model resourceName='courses.courses'>
            <Filters.RouteParameter constraint='course' />
            <CourseLevelWorld />

            <Section>
              <CourseInformation />
              <CourseNavigation />
            </Section>
          </Model>

          <Section>
            <div className='steps single-course'>
              <Collection resourceName='courses.course_resource'>
                <Filters.RouteParameter constraint='course_slug' />
                <Iterator>
                  <ResourceEntry />
                </Iterator>
              </Collection>
            </div>
          </Section>

          <Model resourceName='courses.courses'>
            <Filters.RouteParameter constraint='course' />

            <Section>
              <CourseNavigation backToTop />
            </Section>

            <Operation
              namespace='api'
              resourceName='courses.courses'
              operationName='make_progress'
            >
              <ConfirmModal
                label='Afslut forløb'
                confirm='Ja' cancel='Nej'
                confirmClassNames='button button--pink'
              >
                <div className='modal-content--padding modal-content--centered'>
                  <p>Har du set alle videoerne i forløbet?</p>
                </div>
              </ConfirmModal>
            </Operation>
          </Model>
        </div>
      </>
    )
  }
}
