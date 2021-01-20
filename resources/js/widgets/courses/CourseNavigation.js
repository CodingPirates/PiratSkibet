import React from 'react';
import PropTypes from 'prop-types';
import {inject} from "@morningtrain/react-decorators";
import Link from "widgets/navigation/Link";
import MakeProgress from 'widgets/courses/MakeProgress';

@inject(['model'])
export default class CourseNavigation extends React.Component {

    getModelAtr(key) {
        const {model} = this.props;

        if (!model || typeof model.get !== 'function') return null;

        return model.get(key);
    }

    get prevCourse() {
        const prev = this.getModelAtr('prev_course')

        if (!prev) return null

        return <Link {...prev}
                     label={`Tilbage til ${prev.title}`}
                     className={'button button--pink button--arrow-left'}/>
    }

    get nextCourse() {
        const next = this.getModelAtr('next_course')

        if (!next) return null

        return <Link {...next}
                     label={`Videre til ${next.title}`}
                     className={'button button--pink button--arrow-right'}/>
    }

    get backToTop() {
        if (!this.props.backToTop) return null

        return <Link label={'Tilbage til overfladen'}
                     route={'app.courses.overview'}
                     className={'button button--yellow button--cross'}/>
    }

    get makeProgress() {
        return <MakeProgress/>
    }

    render() {
        return (
            <div className="course-steps__buttons">
                {this.makeProgress}{this.prevCourse}{this.nextCourse}{this.backToTop}
            </div>
        );
    }
}

CourseNavigation.propTypes = {
    backToTop: PropTypes.bool.isRequired,
    model:     PropTypes.object,
};

CourseNavigation.defaultProps = {
    backToTop: false,
};
