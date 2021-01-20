import React from "react";
import {Fieldset} from "layouts";
import * as Fields from "support/fields";
import {inject} from "@morningtrain/react-decorators";
import ThreadPreview from "widgets/forum/Thread";
import Abstract from "pages/backend/moderation/moderateable/Abstract";
import ActionHandler from "pages/backend/moderation/actions/handlers/ActionHandler";
import SuspendUser from "pages/backend/moderation/actions/handlers/SuspendUser";
import BlockUser from "pages/backend/moderation/actions/handlers/BlockUser";

@inject(['model'])
export default class Thread extends Abstract {

    get threadId() {
        return this.moderateable.id;
    }

    get linkProps() {
        return {
            className:  'button button--pink small',
            newTab:     true,
            route:      'app.forum.thread',
            label:      'Gå til tråd',
            parameters: {
                thread: this.threadId,
            },
        };
    }

    renderContent() {
        return (
            <Fieldset cols={2} >
                <Fields.Nested name={'moderateable'}>
                    <Fields.Display name={'created_at'} label={'Oprettelsesdato'} />
                    <Fields.Display name={'type'} label={'Tråd type'} enum={'forum_thread_type'} />
                    <Fields.Display name={'status'} label={'Status'} enum={'system_status'} />
                    <Fields.Display name={'subject'} label={'Emne'} />
                </Fields.Nested>
            </Fieldset>
        );
    }

    renderPreview() {
        return <ThreadPreview id={this.threadId} preview={true} />
    }

    renderModerationActions() {
        return (
            <React.Fragment>
                <ActionHandler actionName={'App\\Support\\Services\\Moderation\\Actions\\Reject'} />
                <ActionHandler actionName={'App\\Support\\Services\\Moderation\\Actions\\Comment'} />
                <ActionHandler actionName={'App\\Support\\Services\\Moderation\\Actions\\LockModerateable'} />
                <ActionHandler actionName={'App\\Support\\Services\\Moderation\\Actions\\ArchiveModerateable'} />
                <ActionHandler actionName={'App\\Support\\Services\\Moderation\\Actions\\ActivateModerateable'} />
                <ActionHandler actionName={'App\\Support\\Services\\Moderation\\Actions\\RemoveThreadMessageContent'} />
                <ActionHandler actionName={'App\\Support\\Services\\Moderation\\Actions\\Delete'} />
                <SuspendUser/>
                <BlockUser/>
            </React.Fragment>
        );
    }
}
