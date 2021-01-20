import React from 'react'
import Widget from 'widgets/Widget'
import { Image } from '@morningtrain/react-displays'

export default class SponsorLogo extends Widget {
  get linkLogo () {
    return (
      <div className='organization-logo organization-logo--link'>
        <a href={this.props.href} className='organization-logo__link' target='_blank'>
          <img src={this.props.src} alt={this.props.alt} className='organization-logo__image' />
        </a>
      </div>
    )
  }

  get logo () {
    return (
      <div className='organization-logo organization-logo--image'>
        <img src={this.props.src} alt={this.props.alt} className='organization-logo__image' />
      </div>
    )
  }

  renderWidget () {
    if (!this.props.src) {
      return false
    }

    return this.props.href ? this.linkLogo : this.logo
  }
}
