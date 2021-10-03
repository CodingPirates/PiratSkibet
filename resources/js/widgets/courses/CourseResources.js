import { Iterator } from '@morningtrain/react-resources'
import React from 'react'
import * as Displays from 'support/displays'
import { inject } from '@morningtrain/react-decorators'

@inject(['model'])
export default class CourseResources extends React.Component {
    render () {
        return (
            <div className={'course-resource-links-wrapper'}>
                <div className={'section-wrap'}>
                    <div className={'buttons-wrap'}>
                        <Iterator collection={this.props.model.get('resource_links')}>
                            <Displays.Link name={'url'} className={'button button--pink small'}>
                                <Displays.Text name={'text'}/>
                            </Displays.Link>
                        </Iterator>
                    </div>
                </div>
            </div>
        )
    }
}
