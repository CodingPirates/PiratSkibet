import React from 'react';
import Widget from 'widgets/Widget';
import Section from 'layouts/Section';
import {Env} from '@morningtrain/helpers';
import moment from 'moment';
import {Context} from "./Jitsi";

export default class MeetingBanner extends Widget {

    static contextType = Context;

    get jitsi() {
        return this.context;
    }

    get meeting() {
        return Env.get('content.meeting')
    }

    get shouldRender() {
        return this.meeting && (!this.jitsi || !this.jitsi.open);
    }

    get canJoin() {
        return this.meeting
            && this.meeting.meeting_room
            && this.jitsi
            && !this.jitsi.open;
    }

    get classNames() {
        return [
           'nav-banner',
           'nav-banner--meeting',
           this.canJoin ? 'nav-banner--meeting__active' : null,
        ].filter(e => e).join(' ');
    }

    joinCall() {
        if (!this.canJoin) return null;

        this.jitsi.joinCall();
    }

    renderJoinButton() {
        if (!this.canJoin) return null;

        return <span className={'nav-banner__cta'}>Join mødet!</span>
    }

    renderWidget() {
        if (!this.shouldRender) return null;

        const {description, time} = this.meeting;

        return (
            <div className={this.classNames} onClick={this.joinCall.bind(this)}>
                <Section>
                    {description} <span>{time}</span>
                    {this.renderJoinButton()}
                </Section>
            </div>
        );
    }
}
