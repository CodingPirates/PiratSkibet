import Widget from 'widgets/Widget'
import ThreadOriginalMessage from 'widgets/forum/ThreadOriginalMessage'
import ThreadAcceptedAnswer from 'widgets/forum/ThreadAcceptedAnswer'
import ThreadMessages from 'widgets/forum/ThreadMessages'
import ThreadPoster from 'widgets/forum/ThreadPoster'

import ForumWorld from 'widgets/animations/worlds/ForumWorld'
import Section from 'layouts/Section'
import Breadcrumbs from 'widgets/navigation/Breadcrumbs'
import { Model } from '@morningtrain/react-resources'
import ThreadHeader from 'widgets/forum/ThreadHeader'
import * as Filters from 'support/filters'
import React from 'react'
import { CatchError } from '@morningtrain/react-errors'
import { Injected as Case } from '@morningtrain/react-fields/composites/Case'

export default class Thread extends Widget {
  constructor (props) {
    super(props)
  }

  renderPoster () {
    if (this.props.preview) return null

    return (
      <ThreadPoster threadId={this.props.id} />
    )
  }

  renderWorld () {
    if (this.props.hasWorld === false) return null

    return !this.props.preview ? <ForumWorld classNames='forum-world' /> : null
  }

  renderWidget () {
    return (
      <>
        {this.renderWorld()}
        <Section className={this.props.wrapperClass}>
          <div className='thread'>
            <Model resourceName='forum.thread'>
              <CatchError code={404} errorContent={<p>Forum tråd findes ikke</p>}>
                <Filters.Static constraint='thread' value={this.props.id} />
                <Filters.Echo channel={'forum.thread.' + this.props.id} event='updated' />
                <ThreadHeader />
                <Case name='is_embedded' when={false}>
                  <Breadcrumbs resourceName='forum.topics' constraints={{ thread_id: this.props.id }} />
                </Case>
                <ThreadOriginalMessage />
                <ThreadAcceptedAnswer />
                <ThreadMessages threadId={this.props.id} />
                {this.renderPoster()}
              </CatchError>
            </Model>
          </div>
        </Section>
      </>
    )
  }
}

Thread.defaultProps = {
  preview: false
}
