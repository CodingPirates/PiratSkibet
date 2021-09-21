import React from 'react'
import Section from 'layouts/Section'
import { inject } from '@morningtrain/react-decorators'

import World from 'widgets/animations/worlds/World'

import Sky from 'widgets/animations/partials/Sky'
import Water from 'widgets/animations/partials/Water'
import ScratchIsland from 'widgets/animations/islands/ScratchIsland'
import { Heading } from 'support/displays'
import WebIsland from 'widgets/animations/islands/WebIsland'
import ProcessingIsland from 'widgets/animations/islands/ProcessingIsland'
import SonicIsland from 'widgets/animations/islands/SonicIsland'
import Breadcrumbs from 'widgets/navigation/Breadcrumbs'
import WhenModel from 'support/conditionals/WhenModel'

@inject(['model'])
export default class CourseCoverWorld extends World {

    constructor(props) {
        super(props);

        this.state = {
            lastKnownScrollY: 0,
            scrollDistance: null
        }

        this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
        //window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {
        //window.removeEventListener('scroll', this.onScroll);
    }

    static get defaultProps() {
        return {
            ...super.defaultProps,
            classNames: 'animation-world course-cover-world',
            title: null
        };
    }

    get coverTitleElement() {
        return (
            <div className="text-wrap">
                <Section>
                    <Heading name={'title'} />
                    <WhenModel>
                        <Breadcrumbs resourceName={'courses.category'} constraints={{category_id: this.props.model.get('id')}} />
                    </WhenModel>
                </Section>
            </div>
        )
    }

    onScroll() {
        this.setState({ lastKnownScrollY: window.pageYOffset });
        this.requestTick();
    }

    requestTick() {
        if(!this.ticking) {
            requestAnimationFrame(this.update.bind(this));
        }

        this.ticking = true;
    }

    update() {
        let currentScrollY = this.state.lastKnownScrollY;
        this.ticking = false;

        if (this.state.lastKnownScrollY < 800) {
            this.setState({ scrollDistance: currentScrollY });
        }
    }

    get waterScale() {
        return 30 / ((this.state.scrollDistance / 200) + 1);
    }

    renderIsland() {

        switch(this.props.model.get('slug')) {
            case 'processing-py':
                return (<ProcessingIsland islandType={'yellow'} scaleFactor={0.36} zIndex="7" bottom="-3%" left="55%" />);
            case 'html-css':
                return (<WebIsland islandType={'pink'} scaleFactor={0.36} zIndex="7" bottom="-3%" left="55%" />);
            case 'scratch':
                return (<ScratchIsland scaleFactor={0.36} zIndex="7" bottom="-3%" left="55%" islandType={'pink'} />);
            case 'sonic-pi':
                return (<SonicIsland islandType={'yellow'} scaleFactor={0.36} zIndex="7" bottom="-3%" left="55%" />);
        }

        return null;
    }

    renderWorld() {
        return (
            <React.Fragment>
                <Sky />
                <Water zIndex="4" bottom="0" height={this.waterScale + '%'} twoRows={true} />

                {/*<CoverScrollTransform yFactor={200} scaleFactor={1.5} zIndex={5} transformOrigin={"70% 155%"}>*/}
                    {this.renderIsland()}
                {/*</CoverScrollTransform>*/}

                {/*<CoverScrollTransform yFactor={2} scaleFactor={6} transformOrigin={"15% 50%"}>*/}
                    {this.coverTitleElement}
                {/*</CoverScrollTransform>*/}

            </React.Fragment>
        );
    }

}
