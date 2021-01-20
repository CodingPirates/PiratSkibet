import React from "react";
import Widget from "widgets/Widget";
import {inject} from "@morningtrain/react-decorators";
import WhenModel from "support/conditionals/WhenModel";

import Message from "pages/backend/moderation/moderateable/models/Message";
import Project from "pages/backend/moderation/moderateable/models/Project";
import Thread from "pages/backend/moderation/moderateable/models/Thread";
import User from "pages/backend/moderation/moderateable/models/User";

@inject(['model'])
export default class ModerationCase extends Widget {

    static get components() {
        return {
            'App\\Models\\Projects\\Project': Project,
            'App\\Models\\Forum\\Message': Message,
            'App\\Models\\Forum\\Thread': Thread,
            'App\\Models\\User\\User': User,
        };
    };

    get component() {
        return ModerationCase.components[this.moderateable] || null;
    }

    get moderateable() {
        return this.props.model.get('moderateable_type');
    }

    renderWidget() {

        let CaseComponent = this.component;

        if(!CaseComponent) {
            return null;
        }

        return (
            <WhenModel>
                <CaseComponent />
            </WhenModel>
        );
    }
}
