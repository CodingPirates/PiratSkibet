import React from 'react';
import shortid from "shortid";
import {inject} from "@morningtrain/react-decorators";

@inject(['operation'])
export default class AfterExecute extends React.Component {

    constructor(props) {
        super(props);

        this.uuid = shortid.generate();
        this.state = {
            executed: false
        };

        this.setAsExecuted = this.setAsExecuted.bind(this);
        this.subscribe();
    }

    componentWillUnmount() {
        const {operation} = this.props;
        if (!operation) return;

        operation.unsetOnExecuteCallback(this.uuid);
        operation.unsetOnErrorCallback(this.uuid);
    }

    subscribe() {
        const {operation} = this.props;
        if (!operation) return;

        operation.onExecute(this.uuid, this.setAsExecuted);
        operation.onError(this.uuid, this.setAsExecuted);
    }

    setAsExecuted() {
        this.setState({executed: true});
    }

    render() {
        return this.state.executed ? this.props.children : null;
    }
}
