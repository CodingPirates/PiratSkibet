import React from 'react'
import Widget from 'widgets/Widget'
import { Collection, Iterator } from '@morningtrain/react-resources'
import * as Filters from 'support/filters'
import ThreadEntry from 'widgets/forum/ThreadEntry'
import Section from 'layouts/Section'
import WhenOperationConstraint from 'support/conditionals/WhenOperationConstraint'
import WhenCollection from 'support/conditionals/WhenCollection'

export default class Search extends Widget {
  renderWidget () {
    return (
      <Collection resourceName='forum.thread' operationContext='search_threads'>
        <Filters.Static constraint='$order' value={{ created_at: 'DESC' }} />
        <Filters.Static constraint='$per_page' value={5} />
        <div className='forum-topics'>
          <Section>
            <h2 className='forum-title'>Søg_</h2>
            <div className='forum-filters'>
              <Filters.Search placeholder='Søg efter chat...' />
            </div>

            <WhenOperationConstraint name='search'>
              <div className='custom-table'>
                <div className='custom-table__titlebar'>
                  <div className='custom-table__title'>Chats_</div>
                  <div className='custom-table__subtitles'>
                    <div className='custom-table__title custom-table__title--subtitle'>Beskeder</div>
                    <div className='custom-table__title custom-table__title--subtitle align-text-right'>Aktivitet</div>
                  </div>
                </div>
                <div className='custom-table__list'>
                  <WhenCollection empty={false}>
                    <Iterator>
                      <ThreadEntry />
                    </Iterator>
                  </WhenCollection>

                  <WhenCollection empty>
                    <div className='custom-table-row forum-topic'>
                      <div className='custom-table-row__fallback'>
                            <span>Ingen resultater</span>
                          </div>
                    </div>
                  </WhenCollection>
                </div>
              </div>
              <Filters.Pagination />
            </WhenOperationConstraint>
          </Section>
        </div>
      </Collection>
    )
  }
}
