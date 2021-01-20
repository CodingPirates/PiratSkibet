import React from 'react'
import Widget from 'widgets/Widget'
import * as Modals from 'support/modals'
import * as Auth from '@morningtrain/react-auth'
import LandlubberChecklist from 'widgets/landlubber/LandlubberChecklist'
import UpgradeNotification from 'widgets/landlubber/UpgradeNotification'
import Section from 'layouts/Section'

export default class LandlubberBanner extends Widget {
  constructor (props) {
    super(props)

    this.modal = React.createRef()
    this.openModal = this.openModal.bind(this)
  }

  openModal () {
    const { current } = this.modal

    if (current) current.open()
  }

  renderWidget () {
    return (
      <Auth.Check>
        <UpgradeNotification />
        <Auth.Can permission='upgrade_to_pirate'>
          <div className='nav-banner nav-banner--landlubber' onClick={this.openModal}>
            <Section>
              Du mangler stadig nogle trin, før du kan blive en Pirat! <span className='nav-banner__cta'>Vis tjekliste</span>
            </Section>
          </div>
          <Modals.Modal ref={this.modal} label='Landkrabbe tjekliste'>
            <LandlubberChecklist />
          </Modals.Modal>
        </Auth.Can>
      </Auth.Check>
    )
  }
}
