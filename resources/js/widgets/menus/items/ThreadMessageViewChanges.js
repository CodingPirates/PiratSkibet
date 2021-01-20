import React from "react";
import {inject} from "@morningtrain/react-decorators";
import EditMessageModal from "widgets/modals/forum/EditMessageModal";
import {Menu, Item, Separator, Submenu, MenuProvider} from 'react-contexify';
import ViewMessageChangedModal from "widgets/modals/forum/ViewMessageChangedModal";

@inject(['menu', 'spawner'])
class ThreadMessageViewChanges extends React.Component {

    handleThreadMessageEdit(args) {
        if (this.props.spawner) {
            this.props.spawner.spawn(<ViewMessageChangedModal/>, {defaultOpen: true, messageId: this.props.id})
        }
    }

    render() {
        return (
            <React.Fragment>
                <Item onClick={this.handleThreadMessageEdit.bind(this)}>Se ændringer</Item>
            </React.Fragment>
        );
    }

}


export default ThreadMessageViewChanges;
