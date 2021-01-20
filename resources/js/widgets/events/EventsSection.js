import React from 'react'
import Widget from 'widgets/Widget'
import Section from 'layouts/Section'
import { Collection, Iterator } from '@morningtrain/react-resources'
import Event from 'widgets/events/Event'
import * as Filters from 'support/filters'
import * as Auth from '@morningtrain/react-auth'
import WhenCollection from 'support/conditionals/WhenCollection'
import SimplePagination from 'layouts/SimplePagination'

export default class EventsSection extends Widget {
  renderWidget () {
    return (
      <Collection resourceName='event'>
        <Filters.Static constraint='expired' value={0} />
        <Filters.Static constraint='$per_page' value={4} />
        <WhenCollection empty={false}>
          <div className='events-section'>
            <Section>
              <div className='title-bar'>
                <h2>Events_</h2>
                <Filters.Pagination layout={SimplePagination} />
                <a target='_blank' href='https://codingpirates.dk/events/'>Se alle events</a>
              </div>
              <div className='events-section__wrap'>
                <div className='events-section__grid'>
                  <Iterator>
                    <Event type='small' />
                  </Iterator>
                </div>
              </div>
            </Section>
          </div>
        </WhenCollection>
      </Collection>
    )
  }
}
