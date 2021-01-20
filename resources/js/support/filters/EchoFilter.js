import React from 'react';
import Filter from "@morningtrain/react-filters/Filter";
import Echo from "services/broadcasting/Echo";
import debounce from "lodash/debounce";

export default class EchoFilter extends Filter {

    constructor(props) {
        super(props);

        this.state = {
            ...super.state,
            data: null
        }

        this.listen();
    }

    //////////////////////////
    /// Lifecycle
    //////////////////////////

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.channel !== this.props.channel || prevProps.event !== this.props.event || prevProps.isPrivate !== this.props.isPrivate) {

            let channel = this.makeChannel(prevProps.channel, prevProps.isPrivate);

            if (typeof prevProps.event === 'string') {
                channel.stopListening('.' + prevProps.event);
            }

            this.listen();

        }

    }

    componentWillUnmount() {
        this.stopListening();
        super.componentWillUnmount();
    }

    //////////////////////////
    /// Getters
    //////////////////////////

    static get defaultProps() {
        return {
            ...super.defaultProps,
            channel: null,
            event: null,
            isPrivate: false,
        }
    }

    get channel() {
        const {channel, isPrivate} = this.props;

        return this.makeChannel(channel, isPrivate)
    }

    makeChannel(channel, isPrivate) {
        const method = isPrivate ? 'private' : 'channel';

        return (typeof channel === 'string') ? Echo[method](channel) : null;
    }

    //////////////////////////
    /// Methods
    //////////////////////////

    listen() {
        const channel = this.channel;
        if (!channel) return;

        const {event, notification} = this.props;

        if (typeof event === 'string') {
            channel.listen('.'+event, this.echoCallback);
        } else if (notification) {
            channel.notification(this.echoCallback);
        }
    }

    leaveChannel(channel = null) {
        channel = channel || this.channel;

        if (channel) {
            channel.leave();
        }
    }

    stopListening() {
        const {event, notification} = this.props;

        if (typeof event === 'string') {
            this.channel.stopListening('.'+event);
        } else if (notification) {
            this.channel.stopListening('.Illuminate\\Notifications\\Events\\BroadcastNotificationCreated');
        }
    }

    echoCallback = debounce(data => {
            this.refresh(data);
        },
        100,
        {trailing: true}
    );

    refresh(data) {

        this.setState({data: data}, () => {

            const {onRefresh} = this.props;

            if (onRefresh && typeof onRefresh === 'function') {
                onRefresh(data);
            }

            super.refresh();
        });
    }

    render() {

        if(typeof(this.props.children) === 'undefined') {
            return null;
        }

        return (
            <React.Fragment>
                {this.props.children(this.state.data)}
            </React.Fragment>
        );
    }

}

export const Injected = EchoFilter.inject();
