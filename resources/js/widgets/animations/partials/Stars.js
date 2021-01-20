import React from "react";
import Animation from "widgets/animations/Animation";
import StarField from "helpers/starfield/StarField";
import debounce from "lodash/debounce";

export default class Stars extends Animation {

    constructor(props) {
        super(props);

        this.state = {
            currentWindowWidth: window.innerWidth,
            previousWindowWidth: window.innerWidth
        }

        this.starField;
        this.resizeHandler = this.resizeHandler.bind(this);
    }

    static get defaultProps() {
        return {
            ...super.defaultProps,
            starContainer: '#star-wrapper',
            starClassName: 'star',
            starMinSize: 2,
            starMaxSize: 6
        };
    }

    get transitionsProps() {
        return {};
    }

    get classNames() {
        return 'stars-';
    }

    get styles() {
        return {
            ...super.styles
        }
    }

    componentDidMount() {
        this.starField = new StarField({
            container: this.props.starContainer,
            starClassName: this.props.starClassName,
            starMinSize: this.props.starMinSize,
            starMaxSize: this.props.starMaxSize,
            totalStars: Math.round(window.innerWidth / 20),
        });

        this.starField.createStarArray();
        this.starField.spawnStars();

        window.addEventListener('resize', this.resizeHandler);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeHandler);
    }

    resizeHandler = debounce(() => {
        const windowWidth = window.innerWidth;

        this.starField.destroyStars();
        this.starField.totalStars = windowWidth / 20;
        this.starField.createStarArray();
        this.starField.spawnStars();

        this.setState({ previousWindowWidth: windowWidth });
    }, 500);

    renderContent() {
        return (
            <div id="star-wrapper"></div>
        );
    }

}
