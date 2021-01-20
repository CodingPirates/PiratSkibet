import React from 'react'
import Widget from 'widgets/Widget'
import * as Modals from 'support/modals'
import * as Filters from 'support/filters'
import { router } from '@morningtrain/helpers'
import Fireworks from 'helpers/Fireworks'
import UpgradeWorld from 'widgets/animations/worlds/UpgradeWorld'

export default class UpgradeNotification extends Widget {
  constructor (props) {
    super(props)

    this.modal = React.createRef()

    this.fanfareSound = new Audio(router.url('sounds/fanfare.mp3'))
    this.fireworks = new Fireworks({
      amount: 8,
      ticks: 180,
      particleCount: 30,
      delay: 600
    })
  }

  openModal () {
    setTimeout(() => this.celebration(), 500)
    return this.modal.current.open()
  }

  celebration () {
    this.fanfareSound.play()
    this.fireworks.init()
  }

  renderWidget () {
    return (
      <>
        <Filters.Echo
          onRefresh={this.openModal.bind(this)}
          channel='App.Models.User.User'
          isPrivate
          event='user.upgradedToPirate'
        />

        <Modals.Modal ref={this.modal} label='Du er blevet pirat!'>
          <div className='upgrade-modal'>
            <UpgradeWorld />
          </div>
        </Modals.Modal>
      </>
    )
  }
}
