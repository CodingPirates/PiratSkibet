import React from "react";
import {inject} from '@morningtrain/react-decorators';
import {reaction} from "mobx";
import {router} from "@morningtrain/helpers";

@inject(["selection", "collection"])
export default class SelectionReaction extends React.Component {

    constructor(props) {
        super(props);

        reaction(
            () => this.props.selection.selected,
            this.reaction.bind(this),
            {fireImmediately: this.props.fireImmediately}
        );

        reaction(
            () => this.props.collection.length,
            this.setDefaultSelection.bind(this),
            {fireImmediately: this.props.fireImmediately}
        );

        this.setDefaultSelection();

    }

    static get defaultProps() {
        return {
            fireImmediately: false,
            defaultSelection: []
        }
    }

    setDefaultSelection() {
        if(this.props.defaultSelection.length > 0) {
            this.props.defaultSelection.forEach(selection => {
                this.props.selection.toggleSingle(selection, true);
            });
        }
    }

    componentDidMount() {
        this.setDefaultSelection();
    }

    reaction(value) {
        const {onReaction, selection} = this.props;

        if (onReaction && typeof onReaction === 'function') {
            onReaction(value, selection);
        }
    }

    render() {
        return null;
    }
}
