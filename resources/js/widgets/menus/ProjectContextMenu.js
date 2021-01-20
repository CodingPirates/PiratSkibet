import React from "react";
import BaseMenu from "./BaseMenu";
import {inject} from "@morningtrain/react-decorators";
import RequestModeration from "widgets/moderation/flag/RequestModeration";

@inject(["model", "operation"])
export default class ProjectContextMenu extends BaseMenu {

    get menuId() {
        return 'project_id';
    }

    get items() {
        return [
            (this.props.operation.can('api.projects.project.flag', this.props.model)) ? (
                <RequestModeration label={'Rapporter projekt'}
                                   resource={'project'} resourceName={'projects.project'}
                                   resourceId={this.props.model.get('id')}/>) : null,
        ].filter(item => item);
    }

}
