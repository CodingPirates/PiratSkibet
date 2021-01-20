import React from "react";
import Hammer from "hammerjs";

export default class Hoverable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {active: false};

    }

    static get defaultProps() {
        return {
            className: ''
        }
    }

    componentDidMount() {
        if (this.wrapper) {
            this.hammer = Hammer(this.wrapper);
            this.hammer.on('tap', () => {
                console.log('tapped');
                this.toggleActiveState();
            });
        }
    }

    get classNames() {
        return this.props.className + ' ' + (this.state.active ? 'hoverable--active' : 'hoverable--inactive');
    }

    setAsActive = () => {
        if (this.state.active !== true) {
            this.setState({active: true});
        }
    }

    setAsInactive = () => {
        if (this.state.active !== false) {
            this.setState({active: false});
        }
    }

    toggleActiveState = () => {
        this.setState({active: !this.state.active});
    }

    get styles() {
        let styles = {
        };

        styles.backfaceVisibility = 'hidden';
        styles.perspective = 1000;
        styles.transform = 'translate3d(0,0,0)';
        styles.willChange = 'transform, opacity';

        return styles;
    }

    render() {
        return (
            <div ref={ref => this.wrapper = ref}
                 className={this.classNames}
                 style={this.styles}
                 onMouseOver={this.setAsActive.bind(this)}
                 onMouseOut={this.setAsInactive.bind(this)}
                 onMouseLeave={this.setAsInactive.bind(this)}>
                {this.props.children}
            </div>
        );
    }

}
