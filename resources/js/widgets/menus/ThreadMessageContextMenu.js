import React from 'react';
import BaseMenu from './BaseMenu';
import {inject} from '@morningtrain/react-decorators';
import ThreadMessageEdit from 'widgets/menus/items/ThreadMessageEdit';
import ThreadMessageViewChanges from 'widgets/menus/items/ThreadMessageViewChanges';
import ThreadMessageAcceptAnswer from 'widgets/menus/items/ThreadMessageAcceptAnswer';
import RequestModeration from 'widgets/moderation/flag/RequestModeration';
import RequestRemoval from 'widgets/moderation/removal/RequestRemoval';

@inject(["model", "operation"])
class ThreadMessageContextMenu extends BaseMenu {

    get menuId() {
        return 'thread_message_context_menu_' + this.props.model.get('id') + '_' + this.uuid;
    }

    get items() {
        const {model, operation} = this.props;
        const modelId = model.get('id');

        return [
            (operation.can('api.forum.message.store', model)) ? (<ThreadMessageEdit id={modelId}/>) : null,

            (model.get('changes_count') > 0) ? (<ThreadMessageViewChanges id={modelId}/>) : null,

            (operation.can('api.forum.message.accept', model)) ? (<ThreadMessageAcceptAnswer id={modelId}/>) : null,

            (operation.can('api.forum.message.flag', model)) ? (
                <RequestModeration label={'Rapporter besked'}
                                   resource={'message'} resourceName={'forum.message'}
                                   resourceId={modelId}/>) : null,

            (operation.can('api.forum.message.request_removal', model)) ? (
                <RequestRemoval label={'Slet min besked'}
                                   resource={'message'} resourceName={'forum.message'}
                                   resourceId={modelId}/>) : null,
        ].filter(item => item);
    }

}

export default ThreadMessageContextMenu;
