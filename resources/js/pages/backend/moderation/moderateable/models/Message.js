import React from "react";
import {Fieldset} from "layouts";
import * as Fields from "support/fields";
import {inject} from "@morningtrain/react-decorators";
import ThreadMessage from "widgets/forum/ThreadMessage";
import {Model} from "@morningtrain/react-resources";
import Abstract from "pages/backend/moderation/moderateable/Abstract";
import ActionHandler from "pages/backend/moderation/actions/handlers/ActionHandler";
import SuspendUser from "pages/backend/moderation/actions/handlers/SuspendUser";
import BlockUser from "pages/backend/moderation/actions/handlers/BlockUser";
import {Html} from "@morningtrain/react-displays";

@inject(['model'])
export default class Message extends Abstract {

    get messageId() {
        return this.moderateable.id;
    }

    get threadId() {
        return this.moderateable.thread_id;
    }

    get previewLabel() {
        return 'Se besked';
    }

    get linkProps() {
        return {
            className:  'button button--pink small',
            newTab:     true,
            route:      'app.forum.message',
            label:      'Gå til besked',
            parameters: {
                thread: this.threadId,
                    message: this.messageId,
            },
        };
    }

    renderContent() {
        return (
            <React.Fragment>
                <Fieldset cols={2}>
                    <Fields.Nested name={'moderateable'}>
                        <Html name={'content'} />
                    </Fields.Nested>
                </Fieldset>
            </React.Fragment>
        );
    }

    renderPreview() {
        return (
            <Model resourceName={'forum.message'} id={this.messageId}>
                <ThreadMessage/>
            </Model>
        );
    }

    renderModerationActions() {
        return (
            <React.Fragment>
                <ActionHandler actionName={'App\\Support\\Services\\Moderation\\Actions\\Reject'} />
                <ActionHandler actionName={'App\\Support\\Services\\Moderation\\Actions\\Comment'} />
                <ActionHandler actionName={'App\\Support\\Services\\Moderation\\Actions\\RemoveMessageContent'} />
                <ActionHandler actionName={'App\\Support\\Services\\Moderation\\Actions\\Delete'} />
                <SuspendUser/>
                <BlockUser/>
            </React.Fragment>
        );
    }
}
