import React from "react";
import Widget from "widgets/Widget";
import {inject} from "@morningtrain/react-decorators";
import * as Modals from "support/modals";

@inject(['model'])
export default class Preview extends Widget {

    constructor(props) {
        super(props);

        this.previewModal = React.createRef();
        this.openPreview  = this.openModal.bind(this, this.previewModal);
    }

    static get defaultProps() {
        return {
            label: 'Forhåndsvisning',
        };
    }

    openModal(modal) {
        const {current} = modal;

        if (current) current.open();
    }

    render() {
        const {children, label} = this.props;

        if (!children) return null;

        return (
            <React.Fragment>
                <button className={'button button--white small'} onClick={this.openPreview}>{label}</button>

                <Modals.Modal ref={this.previewModal} label={label}>
                    {children}
                </Modals.Modal>
            </React.Fragment>
        );
    }
}
