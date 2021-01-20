import React from "react";
import Widget from "widgets/Widget";
import {inject} from "@morningtrain/react-decorators";
import Like from "widgets/interactions/reactions/Like";
import Endorse from "widgets/interactions/reactions/Endorse";
import ThreadContextMenu from "widgets/menus/ThreadContextMenu";
import ThreadMessageContextMenu from "widgets/menus/ThreadMessageContextMenu";
import {Model} from "@morningtrain/react-resources";
import * as Fields from "support/fields"
import * as Filters from "support/filters";
import {Html} from "support/displays";
import Badges from "widgets/forum/Badges";
import Badge from "widgets/forum/Badge";
import Paper from "layouts/Paper";
import UserDisplay from "widgets/user/UserDisplay";
import {TimeSince} from "@morningtrain/react-displays";
import * as Auth from "@morningtrain/react-auth";

import Tooltip from "widgets/interactions/Tooltip";
import WhenModel from "support/conditionals/WhenModel";

@inject(['model'])
class ThreadMessage extends Widget {

    static get defaultProps() {
        return {
            thread: new Map(),
            embed: false
        };
    }

    get user() {
        return this.props.model.get('user') || {};
    }

    get isOriginal() {
        return this.props.thread.get('original_message_id') === this.props.model.get('id');
    }

    get threadIsMuted() {
        return this.props.thread.get('muted');
    }

    get isAcceptedAnswer() {
        return this.props.thread.get('accepted_answer_id') === this.props.model.get('id');
    }

    get isMostPopularAnswer() {
        return this.props.thread.get('most_popular_answer_id') === this.props.model.get('id');
    }

    get isMostPopularAnswer() {
        return this.props.thread.get('most_popular_answer_id') === this.props.model.get('id');
    }

    get isDeleted() {
        return false;
    }

    get isModerated() {
        return false;
    }

    get classNames() {

        let names = [
            'thread-message'
        ];

        if(this.props.embed === true) {
            names.push('embed');
        }

        if (this.props.className) {
            names.push(this.props.className);
        }

        if(this.isOriginal) {
            names.push('thread-message--original');
        }

        if(this.isAcceptedAnswer){
            names.push('thread-message--accepted');
        }

        if(this.isMostPopularAnswer){
            names.push('thread-message--popular');
        }

        if (this.isDeleted) {
            names.push('thread-message--deleted');
        }

        if (this.isModerated) {
            names.push('thread-message--moderated');
        }

        return names.join(' ');
    }

    handleContentClick = (e) => {

        if (e.target && e.target.tagName === 'A') {
            if (!confirm('Det link du har klikket på, er ikke på Piratskibet.dk. Du er derfor ved at forlade vores lille sikre havn og rejse ud på internettets vilde bølger. Er du sikker på, du vil det?')) {
                e.preventDefault();
            }
        }

        if (e.target && e.target.tagName === 'SPAN' && (e.target.className === 'mention' || e.target.parentNode.className === 'mention')) {

            let mention = e.target;
            if (e.target.parentNode.className === 'mention') {
                mention = e.target.parentNode;
            }

        }

    }

    renderReactions() {
        return (
            <React.Fragment>
                <Like resourceName={'forum.message'}
                      count={this.props.model.get('likes_count')}
                      reacted={!!this.props.model.get('my_likes_count')}
                />
                <Endorse resourceName={'forum.message'}
                         count={this.props.model.get('endorsements_count')}
                         reacted={!!this.props.model.get('my_endorsements_count')}
                />
            </React.Fragment>
        );
    }

    renderBadges() {

        return (
            <React.Fragment>
                <Fields.Case if={this.isOriginal}>
                    <Badge color={'yellow'} label={'Trådstarter'}/>
                    <Fields.Case if={this.threadIsMuted}>
                        <Badge color={'blue'} label={'Muted'}/>
                    </Fields.Case>
                </Fields.Case>
                <Fields.Case if={this.isMostPopularAnswer}>
                    <Badge color={'pink'} label={'Mest populære'}/>
                </Fields.Case>
                <Fields.Case if={this.isAcceptedAnswer}>
                    <Badge color={'green'} label={'Accepteret svar'}/>
                </Fields.Case>
                <Fields.Case name={'moderated'} when={true}>
                    <Badge color={'moderated'} label={'Modereret'} />
                </Fields.Case>
            </React.Fragment>
        );
    }

    renderContextMenu() {
        if (this.props.embed !== false) return null;

        const menu = this.isOriginal ?
            <ThreadContextMenu thread={this.props.thread} threadOperation={this.props.threadOperation} /> :
            <ThreadMessageContextMenu/>;

        return (
            <div className="thread-message__reactions">
                {this.renderReactions()}
                {menu}
            </div>
        );
    }

    renderFooter() {
        return (
            <div className="thread-message__footer">

                {this.renderContextMenu()}

                <div className={'thread-message__created'}>
                    <TimeSince name={'created_at'} />

                    <Auth.Check>
                        <Fields.Case name={'changes_count'} when={0} not={true}>
                            <span className={'thread-message__seperator-dot'}></span>
                            <Tooltip text={this.props.model.get('changes_count') + ' ændringer'} direction={'top'}>
                                <span className={'thread-message__edited'}>Redigeret</span>
                            </Tooltip>
                        </Fields.Case>
                    </Auth.Check>
                </div>
            </div>
        );
    }

    renderMessageContent() {
        return (
            <React.Fragment>
                <Filters.Echo channel={'forum.thread.' + this.props.model.get('thread_id')} event={'message.' + this.props.model.get('id') + '.updated'}/>
                <div id={'thread-message-'+this.props.model.get('id')} className={this.classNames}>
                    <Paper size={'medium'}>
                        <UserDisplay model={this.user} />
                        <div className={'thread-message__content'}>
                            <div>
                                <Badges>
                                    {this.renderBadges()}
                                </Badges>
                                <div className={'thread-message__text'} onClick={this.handleContentClick}>
                                    <Html name={'content'}/>
                                </div>
                            </div>
                            {this.renderFooter()}
                        </div>
                    </Paper>
                </div>
            </React.Fragment>
        );
    }

    renderWidget() {

        if (!this.props.model) {
            return null;
        }

        if (this.props.proxy === true) {
            return (
                <Model proxy={true}>
                    {this.renderMessageContent()}
                </Model>
            );
        }

        return (
            <WhenModel>
                {this.renderMessageContent()}
            </WhenModel>
        );
    }

}

export default ThreadMessage;
