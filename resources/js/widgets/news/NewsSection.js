import React from 'react'
import Widget from 'widgets/Widget'
import TitleBar from 'widgets/news/TitleBar'
import NewsLoop from 'widgets/news/NewsLoop'
import Section from 'layouts/Section'

export default class NewsSection extends Widget {
  renderWidget () {
    return (
      <div className='news-section'>
        <Section>
          <TitleBar title='Piratnyt_' linkText='Se flere nyheder fra Coding Pirates' link='https://codingpirates.dk/nyheder/' external />
          <NewsLoop />
        </Section>
      </div>
    )
  }
}
