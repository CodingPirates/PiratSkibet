import React from 'react';
import PropTypes from "prop-types";
import merge from "lodash/merge";
import {inject} from '@morningtrain/react-decorators';
import shortid from "shortid";

@inject(['operation'])
export default class JoinErrorsHook extends React.Component {

    constructor(props) {
        super(props);

        this.uuid         = shortid.generate();
        this.updateErrors = this.updateErrors.bind(this);

        this.subscribe();
    }

    componentWillUnmount() {
        const {operation} = this.props;
        if (!operation) return;

        operation.unsetOnErrorCallback(this.uuid);
    }

    subscribe() {
        const {operation} = this.props;
        if (!operation) return;

        operation.onError(this.uuid, this.updateErrors);
    }

    updateErrors(error) {
        const {keys, props: {fieldName}} = this;

        const original = error.response?.data?.errors || {};

        const joined = Object.keys(original).reduce((val, key) => {
            return keys.includes(key) ? val.concat(original[key]) : val;
        }, original?.[fieldName] || []);

        merge(original, {[fieldName]: joined});
    }

    get keys() {
        const {errorName} = this.props;

        return Array.isArray(errorName) ? errorName : Array(errorName);
    }

    render() {
        return null;
    }
}

JoinErrorsHook.propTypes = {
    fieldName: PropTypes.string.isRequired,
    errorName: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
};
