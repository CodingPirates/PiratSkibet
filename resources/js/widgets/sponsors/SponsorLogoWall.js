import React from 'react'
import Widget from 'widgets/Widget'

export default class SponsorLogoWall extends Widget {
  get logos () {
    return (
      React.Children.map(this.props.children, child => (
        <li className='organization-logo__item'>
          {React.cloneElement(child, { child })}
        </li>
      )
      )
    )
  }

  renderWidget () {
    const CHILDREN_COUNT = this.props.children.length ? this.props.children.length : 1

    return (
      <div className={'organization-logo-row organization-logo-row--' + CHILDREN_COUNT}>
        <div className='section-wrap'>
          <ul className='organization-logo-row__grid'>
            {this.logos}
          </ul>
        </div>
      </div>
    )
  }
}
