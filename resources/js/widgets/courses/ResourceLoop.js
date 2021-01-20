import Widget from 'widgets/Widget'
import { Collection, Iterator } from '@morningtrain/react-resources'
import React from 'react'
import ResourceEntry from 'widgets/courses/ResourceEntry'
import { router } from '@morningtrain/helpers'
import * as Filters from 'support/filters'

export default class ResourceLoop extends Widget {
  constructor (props) {
    super(props)
  }

  renderWidget () {
    return (
      <div className='courses single-course'>
        <Collection resourceName='courses.course_resource'>
          <Filters.Static constraint='step' value={router.parameter('step')} />
          <Iterator>
            <ResourceEntry />
          </Iterator>
        </Collection>
      </div>
    )
  }
}
