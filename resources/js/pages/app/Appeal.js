import React from 'react'
import Page from '@morningtrain/react-app/Page'
import { Section, FlexSplitter, FlexItem, Fieldset } from 'layouts'
import { Form, Operation } from '@morningtrain/react-resources'
import * as Fields from 'support/fields'

import CourseLevelWorld from 'widgets/animations/worlds/CourseLevelWorld'
import WorldWithScrollableContent from 'layouts/WorldWithScrollableContent'
import { router } from '@morningtrain/helpers'

export default class Appeal extends React.Component {
  render () {
    return (
      <Page>
        <WorldWithScrollableContent world={<CourseLevelWorld level={2} crowdedness={0.2} />} dark>
          <Section>
            <h1>Appeal your moderation case</h1>
            <FlexSplitter cols={2}>
              <FlexItem>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu tellus placerat, posuere diam ut, dapibus metus. Aenean id risus erat.
                  Mauris convallis maximus arcu id convallis. Aliquam efficitur justo vitae dapibus porta. Mauris eget lectus ut lorem fringilla congue.
                  Nullam ex nibh, rhoncus ac rhoncus quis, fermentum sit amet nibh. In lobortis eros laoreet efficitur hendrerit.
                  Suspendisse vitae justo non tellus sagittis euismod.
                </p>
                <p>
                  Nunc eleifend, dolor sit amet pulvinar lobortis, lacus quam vulputate est, ac placerat sem eros eget lorem.
                  Aenean dignissim iaculis dapibus. Praesent dapibus libero ut orci vulputate, sed porttitor sem porttitor.
                  Ut placerat eget dui sed rutrum. Vestibulum in massa consequat, molestie urna quis, faucibus urna. Mauris eu congue erat. Nunc sit amet varius nisi.
                  Quisque malesuada sapien sit amet laoreet ultricies. Aliquam ut justo ut nulla luctus rutrum in non felis.
                </p>
              </FlexItem>
              <FlexItem>
                <Operation resourceName='moderation.appeal' operationName='submit'>
                  <Form submitTo='submit' resetOnSuccess>
                    <Fieldset>
                      <Fields.Hidden name='moderation_case_id' value={router.parameter('moderation_case')} />
                      <Fields.Hidden name='identifier' value={router.parameter('identifier')} />

                      <Fields.Input name='name' label='Navn' />
                      <Fields.Input name='email' label='Email' required />
                      <Fields.Input name='phone' label='Telefon' />
                      <Fields.TextArea name='message' label='Besked' required />

                      <input type='submit' value='Appeal' />
                    </Fieldset>
                  </Form>
                </Operation>
              </FlexItem>
            </FlexSplitter>
          </Section>
        </WorldWithScrollableContent>
      </Page>
    )
  }
}
