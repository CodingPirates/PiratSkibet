import React from "react";
import {inject} from '@morningtrain/react-decorators';
import {reaction} from "mobx";

export default
@inject(["model"])
class ModelReaction extends React.Component {

    constructor(props) {
        super(props);

        reaction(
            () => this.props.model.get(this.props.name),
            this.reaction.bind(this),
            {fireImmediately: this.props.fireImmediately}
        );

    }

    static get defaultProps() {
        return {
            fireImmediately: false,
        }
    }

    reaction(value) {
        const {onReaction, model} = this.props;

        if (onReaction && typeof onReaction === 'function') {
            onReaction(value, model);
        }
    }

    render() {
        return null;
    }
}
