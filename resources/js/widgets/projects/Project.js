import React from 'react'
import Widget from 'widgets/Widget'
import Link from 'widgets/navigation/Link'
import * as Displays from 'support/displays'
import WhenModel from 'support/conditionals/WhenModel'
import { Image } from '@morningtrain/react-displays'
import { inject } from '@morningtrain/react-decorators'
import AllProjectTags from 'widgets/projects/reactions/AllProjectTags'

export default class Project extends Widget {
  get likesCount () {
    return this.model.get('likes_count')
  }

  get galleryLayout () {
    return (
      <>
        <div className='project__details'>
          <AllProjectTags />
        </div>
        <div className='project__image-wrap'>
          <div className='object-fit'>
            <Image name='thumbnail_url' />
          </div>
        </div>
        <div className='project__title'>
          <Displays.Text name='title' />
        </div>
      </>
    )
  }

  get listLayout () {
    return (
      <>
        <div className='project__image-wrap'>
          <div className='object-fit'>
            <Image name='thumbnail_url' />
          </div>
        </div>
        <div className='project__title'>
          <Displays.Text name='title' />
          <div className='project__details'>
            <AllProjectTags />
          </div>
        </div>
      </>
    )
  }

  renderWidget () {
    return (
      <WhenModel>
        <Link className='project' route='app.projects.project' parameters={{ project: 'model:id' }}>
          {this.props.type === 'gallery' ? this.galleryLayout : this.listLayout}
        </Link>
      </WhenModel>
    )
  }
}
