import React from "react";
import {inject} from "@morningtrain/react-decorators";
import {Menu, Item, Separator, Submenu, MenuProvider} from 'react-contexify';
import AcceptAnswerModal from "widgets/modals/AcceptAnswerModal";

@inject(['menu', 'spawner'])
class ThreadMessageAcceptAnswer extends React.Component {

    handleThreadMessageEdit(args) {
        if (this.props.spawner) {
            this.props.spawner.spawn(<AcceptAnswerModal/>, {defaultOpen: true, messageId: this.props.id})
        }
    }

    render() {
        return (
            <React.Fragment>
                <Item onClick={this.handleThreadMessageEdit.bind(this)}>Vælg som accepteret svar</Item>
            </React.Fragment>
        );
    }

}


export default ThreadMessageAcceptAnswer;
