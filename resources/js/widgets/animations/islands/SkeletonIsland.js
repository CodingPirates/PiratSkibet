import React from 'react'
import Animation from 'widgets/animations/Animation'
import Island from 'widgets/animations/partials/Island'
import SkeletonHead from 'widgets/animations/partials/SkeletonHead'
import Link from 'widgets/navigation/Link'
import { Collection } from '@morningtrain/react-resources'
import TimedIterator from 'helpers/timedIterator/TimedIterator'
import * as Displays from 'support/displays'

export default class SkeletonIsland extends Animation {
  static get defaultProps () {
    return {
      ...super.defaultProps
    }
  }

  get transitionsProps () {
    return {}
  }

  get classNames () {
    return 'skeleton-island-'
  }

  get width () {
    return this.scaleWidth(100) + '%'
  }

  get styles () {
    return {
      ...super.styles
    }
  }

  renderContent () {
    return (
      <div className='skeleton-island'>
        <SkeletonHead left='0' top='4px' zIndex='2' />
        <Island islandType='black' left='0' top='0' zIndex='1'>
          <p className='chat-heading'>Nyt i Piratsnak:</p>
          <Collection resourceName='forum.thread' operationName='newest'>
            <TimedIterator duration={1} interval={5000}>
              <Link className='chat-title' route='app.forum.thread' parameters={{ thread: 'model:id' }}>
                <Displays.Text name='subject' />
              </Link>
            </TimedIterator>
          </Collection>
        </Island>
      </div>
    )
  }
}
