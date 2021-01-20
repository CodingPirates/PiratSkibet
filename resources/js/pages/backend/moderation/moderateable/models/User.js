import React from "react";
import {inject} from "@morningtrain/react-decorators";
import Abstract from "pages/backend/moderation/moderateable/Abstract";
import ActionHandler from "pages/backend/moderation/actions/handlers/ActionHandler";
import SuspendUser from "pages/backend/moderation/actions/handlers/SuspendUser";
import BlockUser from "pages/backend/moderation/actions/handlers/BlockUser";

@inject(['model'])
export default class User extends Abstract {

    get username() {
        return this.moderateable.username;
    }

    get linkProps() {
        return {
            className:  'button button--pink small',
            newTab:     true,
            route:      'app.pirate.pirate',
            label:      'Gå til bruger profil',
            parameters: {
                username: this.username,
            },
        };
    }

    renderModerationActions() {
        return (
            <React.Fragment>
                <ActionHandler actionName={'App\\Support\\Services\\Moderation\\Actions\\Reject'} />
                <ActionHandler actionName={'App\\Support\\Services\\Moderation\\Actions\\Comment'} />
                <SuspendUser/>
                <BlockUser/>
            </React.Fragment>
        );
    }
}
