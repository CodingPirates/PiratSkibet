import React from "react";
import Widget from "widgets/Widget";
import {inject} from "@morningtrain/react-decorators";
import {router} from "@morningtrain/helpers";
import {Model, Trigger} from "@morningtrain/react-resources";
import ResourceLoop from "widgets/courses/ResourceLoop";
import * as Filters from "support/filters";
import Section from "layouts/Section";
import CourseLevelWorld from "widgets/animations/worlds/CourseLevelWorld";
import {Heading} from "support/displays";
import Breadcrumbs from "widgets/navigation/Breadcrumbs";

@inject(['model', 'router'])
class StepResources extends Widget {

    constructor(props) {
        super(props);
    }

    handleComplete() {
        this.props.router.navigate('app.courses.course', {category: router.parameter('category'), course: router.parameter('course'), course_slug: router.parameter('course_slug')});
    }

    renderWidget() {
        return (
            <Model resourceName={'courses.course_resource'} operation={'read'}>
                <Filters.Static constraint={'curStep'} value={router.parameter('step')}/>
                <Section className="single-course-wrap">
                    <CourseLevelWorld />
                </Section>
                <Section className="single-course-wrap">
                    <div className="single-course-wrap__title course-steps__title">
                        <Heading name={'meta.title'} />
                    </div>
                    <Breadcrumbs resourceName={'courses.courses'} constraints={{step_id: router.parameter('step')}} />
                    <ResourceLoop />
                </Section>
                <div className="section-wrap complete-step">
                    <Trigger className={'button button--pink'}
                            label={'Afslut opgave'}
                            resourceName={'courses.course_resource'}
                            operationName={'make_progress'}
                            onSuccess={this.handleComplete.bind(this)} />
                </div>
            </Model>
        );
    }

}

export default StepResources;
