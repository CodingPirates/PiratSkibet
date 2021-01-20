import React from "react";
import Animation from "widgets/animations/Animation";
import debounce from "lodash/debounce";
import Collection from '@morningtrain/react-resources/src/Collection';
import TimedIterator from 'helpers/timedIterator/TimedIterator';
import Link from "widgets/navigation/Link";
import * as Displays from 'support/displays';

export default class YellowTriangle extends Animation {

    static get defaultProps() {
        return {
            ...super.defaultProps
        };
    }

    constructor(props) {
        super(props);

        this.resizeHandler = this.resizeHandler.bind(this);
        this.state = { overlayHeight: 0 }
    }

    componentDidMount() {
        this.waterDropsWrapper = document.querySelector('.water-drops--wrapper');

        this.resizeHandler();
        window.addEventListener('resize', this.resizeHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeHandler);
    }

    resizeHandler = debounce(() => {
        this.setState({ overlayHeight: this.overlayHeight });
    }, 100, { leading: true })

    get overlayHeight() {
        return this.waterDropsWrapper.offsetHeight;
    }

    get transitionsProps() {
        return {};
    }

    get classNames() {
        return 'yellow-triangle-';
    }

    get width() {
        return this.scaleWidth(100) + '%';
    }

    get styles() {
        return {
            ...super.styles
        }
    }

    renderContent() {
        return (
            <React.Fragment>
                <div className={'course-surface__wrapper'}>
                    <div className={'course-surface'}>
                        <Collection resourceName={'courses.category'} operationName={'newest'} operationContext={'yellow_triangle'}>
                            <TimedIterator duration={1} interval={5000}>
                                <Link route={'app.courses.courses'} parameters={{category: 'model:slug'}}>
                                    <Displays.Image name={'logo_url'}/>
                                </Link>
                            </TimedIterator>
                        </Collection>
                    </div>
                </div>
                <svg className="yellow-triangle" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 746 281">
                    <polygon className="yellow-triangle__water yellow-triangle__water--tr" points="736.1,137.7 353.4,270.7 9.8,163.8 416.6,72.7"/>
                    <polygon className="yellow-triangle__water" points="679.3,139.3 357.2,247.7 74.6,167.9 427.1,87.2"/>
                </svg>

                <svg className="yellow-triangle yellow-triangle__mid" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 746 281">
                    <g className="yellow-triangle__body">
                        <polygon className="st2" points="292.2,211 424.6,211 363.6,257.9"/>
                        <polygon className="st3" points="651.8,139.8 541.9,39.1 362.3,230.6"/>
                        <polygon className="st4" points="541.9,39.1 294.7,10.1 128.7,167.7 362.4,230.5"/>
                        {/*<path className="st5" d="M239.5,124.3l22.8,4.1L245.7,145l23.6,4.3l16.6-16.5l23.3,4.2l-16.6,16.5l23.3,4.2l16.6-16.5l23.3,4.2*/}
                        {/*    l16.6-16.5l-23.3-4.2l16.5-16.4l23.3,4.2L405.4,96l-23.3-4.2l16.6-16.5L375.5,71l-16.6,16.5l-23.3-4.2l16.6-16.5l-23.6-4.3L312,79*/}
                        {/*    l-22.8-4.1l-16.7,16.6l22.9,4l-16.5,16.4l-22.8-4.1L239.5,124.3z M319,99.8l23.3,4.2l-16.5,16.4l-23.3-4.2L319,99.8z"/>*/}
                        <polygon className="st1" points="307.1,11.6 512.5,46.4 388,184.7 542,39.4"/>
                    </g>
                </svg>

                <div className="yellow-triangle__overlay" style={{height: this.state.overlayHeight}}></div>

                <svg className="yellow-triangle" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 746 281">
                    <g className="yellow-triangle__top-water">
                        <polygon className="yellow-triangle__water" points="392,236 424.6,211 664.1,136.1 679.3,139.3"/>
                        <polygon className="yellow-triangle__water" points="341.3,243.3 292.2,211 103.1,161.4 75,167.9"/>
                    </g>
                </svg>
            </React.Fragment>
        );
    }

}
