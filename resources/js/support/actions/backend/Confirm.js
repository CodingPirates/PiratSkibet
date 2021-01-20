import React from 'react';
import TriggerAction from 'support/actions/backend/Trigger';
import ConfirmModal from 'support/modals/Confirm';
import {inject} from '@morningtrain/react-decorators';

@inject(['model'])
export default class Confirm extends TriggerAction {

    //////////////////////////////////
    /// Prop helpers
    //////////////////////////////////

    static get defaultProps() {
        return {
            ...super.defaultProps,
            confirmMessage: '',
            confirm:        'Confirm',
            cancel:         'Cancel',
        };
    }

    //////////////////////////////////
    /// Rendering
    //////////////////////////////////

    renderAfter() {
        const {confirmMessage, label, confirm, cancel} = this.props;

        return (
            <ConfirmModal confirm={confirm} cancel={cancel} label={label} confirmClassNames={'button button--pink'} >
                <div className={'modal-content--padding'}>
                    <p>{confirmMessage}</p>
                </div>
            </ConfirmModal>
        )
    }

}
