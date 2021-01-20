import Widget from 'widgets/Widget'
import { router } from '@morningtrain/helpers'
import { Section } from 'layouts'
import CourseLevelWorld from 'widgets/animations/worlds/CourseLevelWorld'
import WorldWithScrollableContent from 'layouts/WorldWithScrollableContent'
import CourseCategoryCard from 'widgets/courses/CourseCategoryCard'
import { Collection, Iterator } from '@morningtrain/react-resources'
import VideoBot from 'widgets/video-bot/VideoBot'

export default class CoursesWorld extends Widget {
  static get defaultProps () {
    return {
      ...super.defaultProps
    }
  }

  render () {
    return (
      <div className='course-categories'>
        <Section>
          <VideoBot position='absolute' alignRight alignTop style={{ transform: 'translateY(-108%)' }} />
          <WorldWithScrollableContent world={<CourseLevelWorld level='0' crowdedness={0.5} />} dark={false} overlay={false}>
            <Collection resourceName='courses.category'>
              <Iterator>
                <CourseCategoryCard />
              </Iterator>
            </Collection>
          </WorldWithScrollableContent>
        </Section>
      </div>
    )
  }
}
