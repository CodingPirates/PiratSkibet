import Widget from 'widgets/Widget'
import Section from 'layouts/Section'
import { Collection, GroupBy } from '@morningtrain/react-resources'
import ParentTopics from 'widgets/forum/ParentTopics'
import WhenCollection from 'support/conditionals/WhenCollection'

export default class TopicsOverview extends Widget {
  renderWidget () {
    return (
      <Collection resourceName='forum.topics'>
        <WhenCollection empty={false}>
          <div className='forum-topics'>
            <Section>
              <h2 className='forum-title'>Alle chats_</h2>
            </Section>
            <GroupBy by='parent_id'>
              <ParentTopics />
            </GroupBy>
          </div>
        </WhenCollection>
      </Collection>
    )
  }
}
