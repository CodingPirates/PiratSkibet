import React from "react";
import {Fieldset} from "layouts";
import * as Fields from "support/fields";
import {inject} from "@morningtrain/react-decorators";
import ProjectPreview from "widgets/projects/ProjectView";
import Abstract from "pages/backend/moderation/moderateable/Abstract";
import ActionHandler from "pages/backend/moderation/actions/handlers/ActionHandler";
import SuspendUser from "pages/backend/moderation/actions/handlers/SuspendUser";
import BlockUser from "pages/backend/moderation/actions/handlers/BlockUser";

@inject(['model'])
export default class Project extends Abstract {

    get projectId() {
        return this.moderateable.id;
    }

    get linkProps() {
        return {
            className:  'button button--pink small',
            newTab:     true,
            route:      'app.projects.project',
            label:      'Gå til projekt',
            parameters: {
                project: this.projectId,
            },
        };
    }

    renderContent() {
        return (
            <React.Fragment>
                <Fieldset cols={2}>
                    <Fields.Nested name={'moderateable'}>
                        <Fields.Display name={'created_at'} label={'Oprettelsesdato'}/>
                        <Fields.Display name={'title'} label={'Titel'}/>
                        <Fields.Display name={'status'} label={'Status'} enum={'generic_status'}/>
                    </Fields.Nested>
                </Fieldset>
            </React.Fragment>
        );
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
