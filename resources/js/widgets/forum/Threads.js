import Widget from 'widgets/Widget'
import { Collection, Iterator } from '@morningtrain/react-resources'
import * as Filters from 'support/filters'
import React from 'react'
import ThreadEntry from 'widgets/forum/ThreadEntry'
import Section from 'layouts/Section'
import AfterExecute from 'support/conditionals/AfterExecute'

export default class Threads extends Widget {
  renderFilters () {
    const { topicId } = this.props

    if (!topicId) return null

    return <Filters.Static constraint='topic_id' value={topicId} />
  }

  renderTitle () {
    const { title } = this.props

    if (!title) return null

    if (typeof title !== 'string') {
      return title
    }

    return <h2 className='forum-title'>{title}</h2>
  }

  renderSearch () {
    if (!this.props.showSearch) return null

    return (
      <div className='forum-filters'>
        <Filters.Search placeholder='Søg efter chat...' />
      </div>
    )
  }

  renderPagination () {
    if (!this.props.showPagination) return null

    return <Filters.Pagination />
  }

  renderWidget () {
    const { children, topicId, collectionProps } = this.props

    return (
      <Collection {...{ resourceName: 'forum.thread', ...collectionProps }}>
        {this.renderFilters()}
        {children}
        <AfterExecute>
          <div className='forum-topics'>
            <Section>
              {this.renderTitle()}
              {this.renderSearch()}
              <div className='custom-table'>
                <div className='custom-table__titlebar'>
                  <div className='custom-table__title'>Chats_</div>
                  <div className='custom-table__subtitles'>
                    <div className='custom-table__title custom-table__title--subtitle'>Beskeder</div>
                    <div className='custom-table__title custom-table__title--subtitle align-text-right'>Aktivitet</div>
                  </div>
                </div>
                <div className={'custom-table__list' + (topicId ? ' custom-table__list--showSticky' : '')}>
                  <Iterator>
                    <ThreadEntry />
                  </Iterator>
                </div>
              </div>
              {this.renderPagination()}
            </Section>
          </div>
        </AfterExecute>
      </Collection>
    )
  }
}

Threads.defaultProps = {
  collectionProps: {},
  showPagination: true,
  showSearch: true,
  title: null
}
