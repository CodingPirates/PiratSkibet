import Widget from 'widgets/Widget'
import { Collection, Iterator, Model } from '@morningtrain/react-resources'
import React from 'react'
import Course from 'widgets/courses/Course'
import { router } from '@morningtrain/helpers'
import * as Filters from 'support/filters'
import WaterLine from 'widgets/animations/partials/WaterLine'
import CourseCoverWorld from 'widgets/animations/worlds/CourseCoverWorld'
import SeaFloorWorld from 'widgets/animations/worlds/SeaFloorWorld'
import CourseResources from './CourseResources'

export default class CourseLoop extends Widget {
  constructor (props) {
    super(props)
  }

  get categorySlug () {
    return router.parameter('category')
  }

  renderWidget () {
    return (
      <div className='courses'>

          <Model resourceName="courses.category">
              <div className="courses-cover-world-wrap">
                  <Filters.Static constraint="slug" value={this.categorySlug}/>
                  <CourseCoverWorld/>
                  <WaterLine left="0" bottom="0" zIndex="5"/>
              </div>
              <CourseResources/>
          </Model>

        <Collection resourceName='courses.courses'>
          <Filters.Static constraint='category_slug' value={this.categorySlug} />
          <Iterator>
            <Course category={this.categorySlug} />
          </Iterator>
        </Collection>

        <div className='sea-floor-wrap'>
          <SeaFloorWorld />
        </div>
      </div>
    )
  }
}
