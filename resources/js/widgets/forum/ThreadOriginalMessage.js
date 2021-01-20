import React from "react";
import Widget from "widgets/Widget";
import ThreadMessage from "widgets/forum/ThreadMessage";
import {Model} from "@morningtrain/react-resources";
import {inject} from "@morningtrain/react-decorators";
import {RefreshOnLoginReaction} from "@morningtrain/react-auth";

@inject(['model', 'operation'])
class ThreadOriginalMessage extends Widget {

    get id() {

        if(!this.props.model) {
            return null;
        }

        let id = this.props.model.get('original_message_id');

        if(!id) {
            return null;
        }

        return id;
    }

    renderWidget() {

        if(!this.id) {
            return null;
        }


        return (
            <Model resourceName={'forum.message'} id={this.id} >
                <ThreadMessage thread={this.props.model} threadOperation={this.props.operation}/>
                <RefreshOnLoginReaction />
            </Model>
        );
    }

}

export default ThreadOriginalMessage;
