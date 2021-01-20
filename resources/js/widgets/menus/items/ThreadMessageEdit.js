import React from "react";
import {inject} from "@morningtrain/react-decorators";
import EditMessageModal from "widgets/modals/forum/EditMessageModal";
import {Menu, Item, Separator, Submenu, MenuProvider} from 'react-contexify';

@inject(['menu', 'spawner'])
class ThreadMessageEdit extends React.Component {

    handleThreadMessageEdit(args) {
        if (this.props.spawner) {
            this.props.spawner.spawn(<EditMessageModal/>, {defaultOpen: true, messageId: this.props.id})
        }
    }

    render() {
        return (
            <React.Fragment>
                <Item onClick={this.handleThreadMessageEdit.bind(this)}>Redigér</Item>
            </React.Fragment>
        );
    }

}


export default ThreadMessageEdit;
