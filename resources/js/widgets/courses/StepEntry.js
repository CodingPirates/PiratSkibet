import Widget from "widgets/Widget";
import {inject} from "@morningtrain/react-decorators";
import {router} from "@morningtrain/helpers";
import Link from "widgets/navigation/Link";
import Paper from "layouts/Paper";
import {Html, Text} from "support/displays";

export default
@inject(['model'])
class StepEntry extends Widget {

    constructor(props) {
        super(props);
    }

    get id(){
        return this.props.model.get('id');
    }

    get status(){
        return this.props.model.get('status');
    }

    renderWidget() {
        return (
            <div className="course">
                <Paper>
                    <div className="course__content">
                        <div className="course__title">
                            <Text name={'meta.title'} />
                        </div>

                        <Html className={"course__description"} name={'meta.text'} />
                        {
                            (this.status === 'completed')?(
                                <React.Fragment>
                                    <div className="button button--disabled">Gennemført</div>
                                    <Link route={'app.courses.step'} className="button button--white button--static" parameters={{
                                        step: this.id,
                                        category: router.parameter('category'),
                                        course: router.parameter('course'),
                                        course_slug: router.parameter('course_slug'),
                                    }}>Start igen</Link>
                                </React.Fragment>
                            ):(
                                <Link route={'app.courses.step'} className="button button--pink" parameters={{
                                    step: this.id,
                                    category: router.parameter('category'),
                                    course: router.parameter('course'),
                                    course_slug: router.parameter('course_slug'),
                                }}>Start</Link>
                            )
                        }

                    </div>
                </Paper>
            </div>
        );
    }

}
