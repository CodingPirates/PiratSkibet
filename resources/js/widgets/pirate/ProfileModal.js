import { Model } from '@morningtrain/react-resources'
import { CatchError } from '@morningtrain/react-errors'
import * as Filters from 'support/filters'
import { Modal } from 'support/modals'
import { Avatar, Text, Html } from 'support/displays'
import WhenModel from 'support/conditionals/WhenModel'
import React from 'react'
import Section from 'layouts/Section'
import Link from 'widgets/navigation/Link'

// import AvatarPreview from "services/avatar/AvatarPreview";
import AvatarEditorWorld from 'widgets/animations/worlds/AvatarEditorWorld'
import IslandHalf from 'widgets/animations/partials/IslandHalf'

export default class ProfileModal extends Modal {
  constructor (props) {
    super(props)
  }

  renderLabel () {
    return 'Profil for ' + this.props.username
  }

  renderBody () {
    this.setLabel(this.renderLabel())

    return (
      <Model resourceName='user' operationName='pirate'>
        <Filters.Static constraint='username' value={this.props.username} />

        <CatchError code={404} errorContent={<p>User not found</p>}>
          <div className='profile-modal__username'>
            <Text name='username' />
          </div>
        </CatchError>

        <WhenModel>

          <div className='profile-modal'>
            <div className='profile-modal__world-wrap'>
              <AvatarEditorWorld classNames='avatar-editor-world' />
              <div className='profile-modal__content'>
                <IslandHalf scaleFactor={0.3} right='10%' bottom='18%' background='#1F9DCE' zIndex={4} />
                <Avatar zIndex={5} />
                <div className='profile-modal__text'>
                  <Link route='app.pirate.pirate' parameters={{ username: 'model:username' }} className='button button--pink'>Se profil</Link>

                  <Section>
                    <Html name='description' />
                  </Section>
                </div>
              </div>
            </div>
          </div>

        </WhenModel>

      </Model>
    )
  }
}
