import React from "react";
import {inject} from '@morningtrain/react-decorators';

@inject(['form', 'modal'])
export default class RefreshUserReaction extends React.Component {

    constructor(props) {
        super(props);

        this.props.form.onSubmit(() => {
            this.closeModal();
        });

    }

    static get defaultProps() {
        return {modal: {}};
    }

    closeModal() {
        const {modal} = this.props;

        if (!modal) return;

        if (typeof modal.close === 'function') return modal.close();
        if (modal.current && typeof modal.current.close === 'function') return modal.current.close();
    }

    render() {
        return null;
    }
}
