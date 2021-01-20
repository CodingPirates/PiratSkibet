import React from "react";
import Widget from "widgets/Widget";
import {inject} from "@morningtrain/react-decorators";
import {Heading, Html} from "support/displays";
import Breadcrumbs from "widgets/navigation/Breadcrumbs";

export default
@inject(['model'])
class CourseInformation extends Widget {

    renderWidget() {

        if(!this.props.model.get('id')) {
            return null;
        }

        return (
            <React.Fragment>
                <div className="course-steps__intro">

                    <div className="course-steps__title">
                        <Heading name={'title'} />
                    </div>

                    <Breadcrumbs resourceName={'courses.courses'} constraints={{course_id: this.props.model.get('id')}} />

                    <Html className={"course-steps__description"} name={'description'} />
                </div>
            </React.Fragment>
        );
    }

}
