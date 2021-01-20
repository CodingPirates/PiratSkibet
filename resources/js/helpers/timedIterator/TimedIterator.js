import React from 'react';
import {Iterator} from '@morningtrain/react-resources';
import {inject} from '@morningtrain/react-decorators';
import PropTypes from 'prop-types';
import ShouldRender from 'helpers/timedIterator/ShouldRender';
import {observe, isObservable} from "mobx";

@inject(['collection', 'selection'])
export default class TimedIterator extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            counter: 0,
        };

        this.interval       = null;
        this.disposer       = null;
        this.updateContent  = this.updateContent.bind(this);
        this.updateInterval = this.updateInterval.bind(this);
    }

    componentDidMount() {
        const {collection} = this.props;

        if (isObservable(collection) && collection) {
            this.disposer = observe(collection, this.updateInterval);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        if (this.disposer) {
            this.disposer();
        }
    }

    updateInterval() {
        if (this.length) {
            const {interval} = this.props;

            if (!this.interval && interval > 0) {
                this.interval = setInterval(this.updateContent, interval);
            }
        }
    }

    updateContent() {
        this.setState(state => ({
            counter: state.counter < this.length - 1 ? state.counter + 1 : 0,
        }));
    }

    get collection() {
        return this.props.collection || [];
    }

    get length() {
        return this.collection.length;
    }

    render() {
        return (
            <Iterator test={true}>
                <ShouldRender current={this.state.counter} max={this.length - 1}>
                    {this.props.children}
                </ShouldRender>
            </Iterator>
        )
    }
}

TimedIterator.propTypes = {
    duration:   PropTypes.number.isRequired,
    interval:   PropTypes.number.isRequired,
};

TimedIterator.defaultProps = {
    duration: 1,
    interval: 5000,
};
