import React from 'react';
import Filter from "@morningtrain/react-filters/Filter";
import Input from "@morningtrain/react-fields/simpletons/Input";

export default class Search extends Filter {

    static get defaultProps() {
        return {
            ...super.defaultProps,
            constraint: 'search'
        };
    }

    /////////////////////////////////
    // Event handlers
    /////////////////////////////////

    onSearch = (val) => {
        this.constrain(val);
    };

    /////////////////////////////////
    // Renders
    /////////////////////////////////

    render() {
        return (
            <Input type={'search'} className={this.props.className} placeholder={this.props.placeholder || "Søg..."} onChange={this.onSearch} defaultValue={this.value} />
        );
    }

}

export const Injected = Search.inject();
