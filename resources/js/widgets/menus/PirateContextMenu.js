import React from "react";
import BaseMenu from "./BaseMenu";
import {inject} from "@morningtrain/react-decorators";
import RequestModeration from "widgets/moderation/flag/RequestModeration";

@inject(["model", "operation"])
export default class PirateContextMenu extends BaseMenu {

    get menuId() {
        return 'pirate_menu';
    }

    get items() {
        return [
            (this.props.operation.can('api.user.flag', this.props.model)) ? (
                <RequestModeration label={'Rapporter bruger'}
                                   resource={'user'} resourceName={'user'}
                                   resourceId={this.props.model.get('id')}/>) : null,
        ].filter(item => item);
    }

}
