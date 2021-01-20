import Widget from "widgets/Widget";
import Paper from "layouts/Paper";
import Link from "widgets/navigation/Link";
import IslandSign from "widgets/animations/partials/IslandSign";
import {inject} from '@morningtrain/react-decorators';
import * as Displays from 'support/displays';
import * as Auth from "@morningtrain/react-auth";
import ProgressBar from "widgets/courses/ProgressBar";

@inject(['model'])
export default class CourseCategoryCard extends Widget {
    baseClass = 'course-category-card';

    static get defaultProps() {
        return {
            ...super.defaultProps
        };
    }

    getModel(key) {
        const {model} = this.props;

        return model && model.get(key);
    }

    get logo() {
        return this.getModel('logo_url') || '';
    }

    get signColor() {
        return this.getModel('color') || '';
    }

    get routeParams() {
        return {
            category: this.getModel('slug') || '',
        };
    }

    get completedCourseCount() {
        return this.props.model.get('completed_courses_count');
    }

    get courseCount() {
        return this.props.model.get('courses_count');
    }

    get completedPercentage() {
        if (this.courseCount === 0) return 0;

        return Math.round((100 / this.courseCount) * this.completedCourseCount);
    }

    renderWidget() {
        return (
            <div className={this.baseClass}>

                <IslandSign top={'0'} left={'40px'} zIndex={'1'} rotate={-1} image={this.logo} signColor={this.signColor} />

                <Paper bottom={false} size={'medium'}>

                    <div className={this.baseClass + '__content'}>
                        <div className={this.baseClass + '__text-wrap'}>
                            <Displays.Heading name={'title'} level={2} className={this.baseClass + '__title'}/>
                            <Displays.Html name={'description'} className={this.baseClass + '__text'}/>

                            <div className={this.baseClass + '__buttons'}>
                                <Link route={'app.courses.courses'}
                                      parameters={this.routeParams}
                                      className={'button button--pink'}>Start</Link>
                            </div>
                        </div>
                        <div className={this.baseClass + '__thumbnail'}>
                            <Displays.Image name={'thumbnail_url'}/>
                        </div>
                    </div>

                </Paper>

                <Auth.Check>
                    <ProgressBar progress={this.completedPercentage}/>
                </Auth.Check>

            </div>
        );
    }

}
