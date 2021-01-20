import React from 'react'
import Widget from 'widgets/Widget'
import { Model } from '@morningtrain/react-resources'
import { CatchError } from '@morningtrain/react-errors'
import * as Filters from 'support/filters'
import * as Auth from '@morningtrain/react-auth'
import PirateProjects from 'widgets/pirate/PirateProjects'
import WhenModel from 'support/conditionals/WhenModel'
import Section from 'layouts/Section'
import { Html } from '@morningtrain/react-displays'
import PirateRewards from 'widgets/pirate/rewards/PirateRewards'
import ProfileWorld from 'widgets/animations/worlds/ProfileWorld'
import ProfileHeaderWorld from 'widgets/animations/worlds/ProfileHeaderWorld'
import Paper from 'layouts/Paper'
import { Injected as Case } from '@morningtrain/react-fields/composites/Case'

export default class Pirate extends Widget {
  renderWidget () {
    return (
      <>
        <Model resourceName='user' operationName='pirate'>
          <Filters.Static constraint='username' value={this.props.username} />

          <ProfileWorld />
          <div className='profile-page'>
            <CatchError code={404} errorContent={<p>User not found</p>}>
              <WhenModel>

                <ProfileHeaderWorld />

                <Case name='description' exists>
                  <Section className='profile-info-section'>
                    <Paper size='medium'>
                          <Html name='description' />
                        </Paper>
                  </Section>
                </Case>

                <Auth.Is modelKey='id' not>
                  <PirateProjects title='Showcase projekter' id='user_projects'>
                    <Filters.ModelParameter constraint='user' modelKey='id' />
                  </PirateProjects>
                </Auth.Is>

                <Auth.Is modelKey='id'>
                  <PirateProjects title='Showcase projekter' id='user_projects' renderEmpty>
                    <Filters.ModelParameter constraint='user' modelKey='id' />
                  </PirateProjects>
                  <PirateProjects title='Dine projekt invitationer' operationContext='invitations'>
                    <Filters.Static constraint='invitations' value />
                  </PirateProjects>
                </Auth.Is>

                <PirateRewards />

              </WhenModel>
            </CatchError>
          </div>
        </Model>
      </>
    )
  }
}
