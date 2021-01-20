import React from "react";
import {inject} from "@morningtrain/react-decorators";
import {Item} from 'react-contexify';
import * as Actions from "support/actions/backend";

@inject(['menu'])
class ToggleThreadNotifications extends React.Component {

    get label() {
        return this.props.model.get('muted') ?
            'Slå notifikationer til for denne tråd' :
            'Slå notifikationer fra for denne tråd';
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
                    operationName={'toggle_mute'}
                />
            </React.Fragment>
        );
    }

}


export default ToggleThreadNotifications;
