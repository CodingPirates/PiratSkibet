import React from "react";
import {inject} from "@morningtrain/react-decorators";

@inject(['model'])
class WhenModelValue extends React.Component {

    get nameFragments() {
        return this.props.name.split('.');
    }

    get value() {

        if (this.nameFragments.length === 0) {
            return null;
        }

        const xah_map_to_obj = (aMap => {
            const obj = {};
            aMap.forEach((v, k) => {
                obj[k] = v
            });
            return obj;
        });

        let data = this.props.model;

        if (typeof (this.props.model.get) === 'function') {
            data = xah_map_to_obj(data);
        }

        return this.searchObject(data, this.nameFragments);
    }

    searchObject(object, query, defaults = null) {

        if (typeof (query) === 'string') {
            query = query.split('.');
        }

        const res = query.reduce((o, i) => o ? o[i] : undefined, object);

        return (typeof res !== 'undefined') ? res : defaults;
    }

    shouldRender() {

        const {value, props: {condition}} = this;

        if (condition && typeof condition === 'function') {
            return condition(value);
        }

        return value === condition;
    }

    render() {
        return this.shouldRender() ? this.props.children : null;
    }

}

export default WhenModelValue;
