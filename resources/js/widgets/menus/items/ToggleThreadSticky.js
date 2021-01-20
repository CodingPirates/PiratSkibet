import React from "react";
import {inject} from "@morningtrain/react-decorators";
import {Item} from 'react-contexify';
import * as Actions from "support/actions/backend";

@inject(['menu'])
class ToggleThreadSticky extends React.Component {

    get label() {
        return this.props.model.get('is_sticky') ?
            'Slå sticky fra på denne tråd' :
            'Sticky denne tråd';
    }

    render() {
        const {model} = this.props;

        return (
            <React.Fragment>
                <Actions.Trigger
                    model={model}
                    button={Item}
                    className={''}
                    label={this.label}
                    targetOperationName={'read'}
                    resourceName={'forum.thread'}
                    operationName={'toggle_sticky'}
                />
            </React.Fragment>
        );
    }

}


export default ToggleThreadSticky;
