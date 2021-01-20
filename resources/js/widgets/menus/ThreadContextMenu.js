import React from 'react';
import BaseMenu from './BaseMenu';
import {inject} from '@morningtrain/react-decorators';
import ThreadMessageEdit from 'widgets/menus/items/ThreadMessageEdit';
import ThreadMessageViewChanges from 'widgets/menus/items/ThreadMessageViewChanges';
import RequestModeration from 'widgets/moderation/flag/RequestModeration';
import ToggleThreadNotifications from 'widgets/menus/items/ToggleThreadNotifications';
import ToggleThreadSticky from 'widgets/menus/items/ToggleThreadSticky';
import RequestRemoval from 'widgets/moderation/removal/RequestRemoval';

@inject(["model", "operation"])
class ThreadContextMenu extends BaseMenu {

    get menuId() {
        return 'thread_context_menu_' + this.props.model.get('id') + '_' + this.uuid;
    }

    get items() {
        const {model, operation, thread, threadOperation} = this.props;
        const messageId = model.get('id');
        const threadId = thread.get('id');

        if(!operation || !model || !threadOperation) {
            return [];
        }

        return [
            (operation.can('api.forum.message.store', model)) ? (<ThreadMessageEdit id={messageId}/>) : null,

            (model.get('changes_count') > 0) ? (<ThreadMessageViewChanges id={messageId}/>) : null,

            (threadOperation.can('api.forum.thread.flag', thread)) ? (
                <RequestModeration label={'Rapporter tråd'}
                                   resource={'thread'} resourceName={'forum.thread'}
                                   resourceId={threadId}/>) : null,

            (threadOperation.can('api.forum.thread.request_removal', thread)) ? (
                <RequestRemoval label={'Slet min tråd'}
                                   resource={'thread'} resourceName={'forum.thread'}
                                   resourceId={threadId}/>) : null,

            <ToggleThreadNotifications model={thread} />,
            (threadOperation.can('api.forum.thread.toggle_sticky', thread)) ? (<ToggleThreadSticky model={thread}/>) : null,

        ].filter(item => item);
    }

}

export default ThreadContextMenu;
