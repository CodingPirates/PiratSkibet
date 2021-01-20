import React from 'react';
import TriggerAction from 'support/actions/backend/Trigger';
import ConfirmModal from 'support/modals/Confirm';
import {inject} from '@morningtrain/react-decorators';

@inject(['model'])
export default class Delete extends TriggerAction {

    //////////////////////////////////
    /// Prop helpers
    //////////////////////////////////

    static get defaultProps() {
        return {
            ...super.defaultProps,
            operationName: 'delete',
            label: 'Slet',
            confirm: true,
            confirmMessage: 'Du er ved at slette og skal bekræfte at du vil fortsætte. Det er en destruktiv handling der ikke kan fortrydes.',
            modelKey: 'id'
        };
    }

    get operationContext() {
        return {
            ...super.operationContext
        }
    }

    //////////////////////////////////
    /// Rendering
    //////////////////////////////////

    renderAfter() {
        const {confirmMessage, label, confirm} = this.props;

        if(confirm !== true) {
            return null;
        }

        return (
            <ConfirmModal confirm={'Slet'} cancel={'Fortryd'} label={label} confirmClassNames={'button button--pink'} >
                <div className={'modal-content--padding'}>
                    <p>{confirmMessage}</p>
                </div>
            </ConfirmModal>
        )
    }

}
