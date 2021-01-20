import React from 'react'
import Widget from 'widgets/Widget'
import NewsBox from 'widgets/news/NewsBox'
import { Collection, Iterator } from '@morningtrain/react-resources'

export default class NewsLoop extends Widget {
  renderWidget () {
    return (
      <div className='news-section__wrap'>
        <Collection resourceName='news'>
          <div className='news-section__grid'>
            <Iterator only={0}>
              <NewsBox />
            </Iterator>
          </div>
          <div className='news-section__grid'>
            <Iterator except={0}>
              <NewsBox type='small' />
            </Iterator>
          </div>
        </Collection>

      </div>
    )
  }
}
