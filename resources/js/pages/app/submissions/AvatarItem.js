import React from 'react'
import Page from '@morningtrain/react-app/Page'
import { Section, Fieldset } from 'layouts'
import { Model } from '@morningtrain/react-resources'
import * as Fields from 'support/fields'

import CourseLevelWorld from 'widgets/animations/worlds/CourseLevelWorld'
import WorldWithScrollableContent from 'layouts/WorldWithScrollableContent'

export default class AvatarItem extends React.Component {
  render () {
    return (
      <Page>
        <WorldWithScrollableContent world={<CourseLevelWorld level={2} crowdedness={0.2} />} dark>
          <Section>
            <h1>Byg dit egen avatar element!</h1>
            <Model submittable resourceName='submissions.avatar_item'>
              <Fieldset>
                <Fields.AvatarItem />
                <input type='submit' />
              </Fieldset>
            </Model>
          </Section>
        </WorldWithScrollableContent>
      </Page>
    )
  }
}
