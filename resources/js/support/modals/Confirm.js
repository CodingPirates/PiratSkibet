import React from 'react';
import PropTypes from 'prop-types';
import {Modal} from 'support/modals';
import {inject} from '@morningtrain/react-decorators';
import {OperationHook} from '@morningtrain/react-resources';

@inject(['operation'])
export default class Confirm extends Modal {

    renderFooter() {
        const {confirm, cancel, cancelClassNames, confirmClassNames} = this.props;

        return (
            <div className='modal-footer action-footer'>
                <button className={cancelClassNames}
                        onClick={() => this.resolve(false)}>{cancel}</button>
                <button className={confirmClassNames}
                        onClick={() => this.resolve(true)}>{confirm}</button>
            </div>
        );
    }

    resolve(resolve) {
        resolve ?
            this.resolveAwait() :
            this.rejectAwait();

        this.close(true);
    }

    confirm() {
        this.open();

        return new Promise((resolve, reject) => {
            this.resolveAwait = resolve;
            this.rejectAwait  = reject;
        });
    }

    render() {
        if (!this.props.useOperation) return super.render();

        return (
            <React.Fragment>
                <OperationHook method={'beforeExecute'} hook={this.confirm.bind(this)}/>
                {super.render()}
            </React.Fragment>
        );
    }
}

Confirm.propTypes = {
    ...Modal.propTypes,
    useOperation:      PropTypes.bool,
    confirm:           PropTypes.string,
    cancel:            PropTypes.string,
    cancelClassNames:  PropTypes.string,
    confirmClassNames: PropTypes.string,
};

Confirm.defaultProps = {
    ...Modal.defaultProps,
    useOperation:      true,
    confirm:           'Confirm',
    cancel:            'Cancel',
    cancelClassNames:  'button button--white',
    confirmClassNames: 'button button--pink',
};

