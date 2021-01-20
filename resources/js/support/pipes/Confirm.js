import React from 'react';
import Pipe from 'support/pipes/Pipe';
import ConfirmModal from 'support/modals/Confirm';

class Confirm extends Pipe {

    constructor(props) {
        super(props);

        this.modal = React.createRef();
    }


    handle = () => {
        return this.modal?.current?.wrappedInstance?.confirm();
    }

    render() {
        return (
            <ConfirmModal ref={this.modal} {...this.props} useOperation={false}>
                {this.props.children}
            </ConfirmModal>
        );
    }

}

export default Confirm;
