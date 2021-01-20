import Widget from 'widgets/Widget'
import { Collection, Iterator } from '@morningtrain/react-resources'
import * as Filters from 'support/filters'
import React from 'react'
import WhenCollection from 'support/conditionals/WhenCollection'
import Section from 'layouts/Section'
import TopicEntry from 'widgets/forum/TopicEntry'

export default class Topics extends Widget {
  constructor (props) {
    super(props)
  }

  renderParentFilter () {
    if (!this.props.parentId) {
      return null
    }

    return (
      <Filters.Static constraint='parent_id' value={this.props.parentId} />
    )
  }

  renderTitle () {
    if (this.props.title) {
      if (typeof this.props.title !== 'string') {
        return this.props.title
      }

      return (
        <h2>{this.props.title}</h2>
      )
    }

    return null
  }

  renderTopics () {
    if (!this.props.parentId) {
      return null
    }

    return (
      <Iterator>
        <TopicEntry />
      </Iterator>
    )
  }

  renderWidget () {
    return (
      <Collection resourceName='forum.topics'>
        {this.renderParentFilter()}
        <WhenCollection empty={false}>
          <div className='forum-topics'>
            <Section>
              {this.renderTitle()}
              <div className='custom-table'>
                <div className='custom-table__titlebar'>
                  <div className='custom-table__title'>Emner_</div>
                  <div className='custom-table__subtitles'>
                    <div className='custom-table__title custom-table__title--subtitle'>Chats</div>
                    <div className='custom-table__title custom-table__title--subtitle'>Aktivitet</div>
                  </div>
                </div>
                <div className='custom-table__list'>
                  {this.renderTopics()}
                </div>
              </div>
            </Section>
          </div>
        </WhenCollection>
      </Collection>
    )
  }
}
