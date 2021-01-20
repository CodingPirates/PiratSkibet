import React from "react";
import Widget from "../Widget";
import {inject} from "@morningtrain/react-decorators";
import Link from "widgets/navigation/Link";
import Avatar from "services/avatar/Avatar";
import ProfileModal from "widgets/pirate/ProfileModal";
import Badge from "widgets/forum/Badge";
import * as Fields from "support/fields";
import * as Displays from "support/displays";

@inject(['model'])
export default class UserDisplay extends Widget {

    getUser(key) {
        const {model} = this.props;

        if (!model) return;

        return (model.get && typeof model.get === 'function') ?
            model.get(key) :
            model[key];
    }

    get username() {
        return this.getUser('username');
    }

    get title() {
        return this.getUser('title');
    }

    get svg() {
        return this.getUser('avatar');
    }

    handleClick() {
        if(this.modal) {
            this.modal.open();
        }
    }

    renderWidget() {
        return (
            <React.Fragment>
                <ProfileModal ref={ref => this.modal = ref} username={this.username} />
                <Link onClick={this.handleClick.bind(this)} className={'thread-message__user'}>
                    <div className={'thread-message__avatar'}>
                        <Avatar svg={this.svg}/>
                    </div>
                    <div className={'thread-message__username'}>
                        <p>{this.username}</p>
                        <p>{this.title}</p>
                        <Fields.Case name={'user.has_pending_accusations'} when={true}>
                            <Badge color={'red'} label={'Har igangværende moderation'} />
                        </Fields.Case>
                        <Fields.Case name={'user.is_blocked'} when={true}>
                            <Badge color={'red'} label={'Blokeret'} />
                        </Fields.Case>
                        {this.props.children}
                    </div>
                </Link>
            </React.Fragment>
        );
    }
}
