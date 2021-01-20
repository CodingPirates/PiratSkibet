import Widget from "widgets/Widget";
import {inject} from "@morningtrain/react-decorators";
import React from "react";
import CourseLevelWorld from "widgets/animations/worlds/CourseLevelWorld";
import Link from "widgets/navigation/Link";
import Section from "layouts/Section";
import Paper from "layouts/Paper";
import {Html} from "support/displays";
import Submarine from "widgets/animations/partials/Submarine";
import * as Auth from "@morningtrain/react-auth";
import {FlexSplitter} from "layouts";

@inject(['model', 'collection'])
export default class Course extends Widget {

    constructor(props) {
        super(props);
    }

    get level() {
        return this.props.model.get('level');
    }

    get slug() {
        return this.props.model.get('slug');
    }

    get title() {
        return this.props.model.get('title');
    }

    get label() {
        return this.completed ? 'Prøv igen' : 'Start';
    }

    get completed() {
        return this.props.model.get('is_completed');
    }

    get description() {
        return this.props.model.get('description');
    }

    get routeParameters() {
        return {'category': this.props.category, 'course': this.props.model.get('id'), 'course_slug': this.slug};
    }

    get isFirstIncomplete() {
        const {collection} = this.props;

        if (this.completed || collection.length === 0) {
            return false;
        }

        for (let i = 0; i < collection.length; i++) {
            let item = collection[i];
            if (item.is_completed === false) {
                return item.id === this.props.model.get('id');
            }
        }

    }

    renderWidget() {
        return (
            <div className={`course-wrap course-wrap--${this.level}${this.isFirstIncomplete ? ' course-wrap--active' : ''}`}>
                <CourseLevelWorld crowdedness={0.5}/>

                <Auth.Check>
                    {(this.isFirstIncomplete) ? (<Submarine maxWidth={'350px'} zIndex={5} />) : null}
                </Auth.Check>

                <Section>
                    <div className="course">
                        <Paper size={'small'}>
                            <div className={"course__content"}>
                                <div className={"course__title"}>
                                    <h2>{this.title}</h2>
                                    <Link route={'app.courses.course'} parameters={this.routeParameters} className={"button button--pink small"}>{this.label}</Link>
                                </div>
                                <Html className={"course__description"} name={'description'}/>
                            </div>
                        </Paper>
                    </div>
                </Section>
            </div>
        );
    }

}
