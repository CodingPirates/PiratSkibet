import React from "react";
import {Collection, Iterator, Model} from "@morningtrain/react-resources";
import {Text} from "support/displays";
import * as Filters from "support/filters"
import WhenCollection from "support/conditionals/WhenCollection";
import WhenModelValue from "support/conditionals/WhenModelValue";
import Notification from "widgets/notifications/Notification";
import EventReminder from "widgets/notifications/EventReminder";
import DropdownMenu from "widgets/menus/DropdownMenu";
import {router} from "@morningtrain/helpers";
import debounce from "lodash/debounce";

export default class Notifications extends DropdownMenu {

    constructor(props) {
        super(props);

        this.sound = new Audio(router.url('sounds/small_splash.mp3'));
        this.handleIncomingNotification = this.handleIncomingNotification.bind(this);
    }

    get bellSvg() {
        return (
            <svg className={`${this.iconClass}__bell`} version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512">
                <polygon className="fill--light" points="445.217,378.435 445.217,345.043 422.957,345.043 422.957,100.174 389.565,100.174 389.565,66.783 356.174,66.783 356.174,33.391 322.783,33.391 322.783,0 189.217,0 189.217,33.391 155.826,33.391 155.826,66.783 122.435,66.783 122.435,100.174 89.043,100.174 89.043,345.043 66.783,345.043 66.783,378.435 33.391,378.435 33.391,445.217 166.957,445.217 166.957,478.609 200.348,478.609 200.348,512 311.652,512 311.652,478.609 345.043,478.609 345.043,445.217 478.609,445.217 478.609,378.435" />
                <polygon className="fill--dark" points="445.217,378.435 445.217,345.043 422.957,345.043 422.957,311.652 89.043,311.652 89.043,345.043 66.783,345.043 66.783,378.435 33.391,378.435 33.391,445.217 478.609,445.217 478.609,378.435" />
                <g>
                    <polygon className="fill--white" points="189.217,22.261 189.217,33.391 178.087,33.391 155.826,33.391 155.826,55.652 155.826,66.783 144.696,66.783 122.435,66.783 122.435,100.174 89.043,100.174 89.043,345.043 144.696,345.043 144.696,100.174 155.826,100.174 155.826,89.043 178.087,89.043 178.087,66.783 189.217,66.783 189.217,55.652 211.478,55.652 211.478,33.391 211.478,22.261" />
                    <polygon className="fill--white" points="66.783,367.304 66.783,378.435 55.652,378.435 33.391,378.435 33.391,445.217 89.043,445.217 89.043,422.957 89.043,389.565 89.043,378.435 89.043,367.304 89.043,345.043 66.783,345.043" />
                    <polygon className="fill--white" points="189.217,434.087 166.957,434.087 166.957,478.609 189.217,478.609 200.348,478.609 200.348,489.739 200.348,512 222.609,512 222.609,489.739 222.609,478.609 222.609,467.478 222.609,434.087" />
                </g>
                <rect x="122.435" y="66.783" width="33.391" height="33.391" />
                <rect x="155.826" y="33.391" width="33.391" height="33.391" />
                <polygon points="445.217,378.435 445.217,345.043 422.957,345.043 422.957,100.174 389.565,100.174 389.565,345.043 122.435,345.043 122.435,100.174 89.043,100.174 89.043,345.043 66.783,345.043 66.783,378.435 " />
                <rect x="200.348" y="478.609" width="111.304" height="33.391" />
                <rect x="189.217" width="133.565" height="33.391" />
                <rect x="356.174" y="66.783" width="33.391" height="33.391" />
                <rect x="322.783" y="33.391" width="33.391" height="33.391" />
                <polygon points="445.217,378.435 445.217,411.826 66.783,411.826 66.783,378.435 33.391,378.435 33.391,445.217 166.957,445.217 166.957,478.609 200.348,478.609 200.348,445.217 311.652,445.217 311.652,478.609 345.043,478.609 345.043,445.217 478.609,445.217 478.609,378.435" />
            </svg>
        )
    }

    get closeSvg() {
        return (
            <svg className={'notifications__close'} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 95.939 95.939" xmlSpace="preserve" onClick={this.toggleMenu}>
                <path d="M62.819,47.97l32.533-32.534c0.781-0.781,0.781-2.047,0-2.828L83.333,0.586C82.958,0.211,82.448,0,81.919,0c-0.53,0-1.039,0.211-1.414,0.586L47.97,33.121L15.435,0.586c-0.75-0.75-2.078-0.75-2.828,0L0.587,12.608c-0.781,0.781-0.781,2.047,0,2.828L33.121,47.97L0.587,80.504c-0.781,0.781-0.781,2.047,0,2.828l12.02,12.021c0.375,0.375,0.884,0.586,1.414,0.586c0.53,0,1.039-0.211,1.414-0.586L47.97,62.818l32.535,32.535c0.375,0.375,0.884,0.586,1.414,0.586c0.529,0,1.039-0.211,1.414-0.586l12.02-12.021c0.781-0.781,0.781-2.048,0-2.828L62.819,47.97z"/>
            </svg>
        )
    }

    //////////////////////////////////
    /// Class helpers
    //////////////////////////////////

    get baseClass() {
        return 'notifications';
    }

    get iconClass() {
        return 'notification-icon';
    }

    handleIncomingNotification(data) {
        if (data && data.status !== 'disabled') {
            this.playSound();
        }
    }

    playSound = debounce(() => {
            this.sound.play();
        },
        1500,
        {leading: true, trailing: false}
    );

    //////////////////////////////////
    /// Rendering
    //////////////////////////////////

    renderListContent() {
        return (
            <React.Fragment>
                <div className={`${this.baseClass}__topbar`}>
                    Notifikationer
                    {this.closeSvg}
                </div>
                <ul className={`${this.baseClass}__list`}>
                    <Collection resourceName={'notification'} >
                        <WhenCollection empty={true} >
                            <li className={'notification'} >
                                <div className={'notification__msg'}>Ingen notifikationer</div>
                            </li>
                        </WhenCollection>
                        <Filters.Echo channel={'App.Models.User.User'} isPrivate={true} notification={true} />
                        <Iterator>
                            <Notification except={['event_reminder']}/>
                            <EventReminder only={['event_reminder']}/>
                        </Iterator>
                        <Filters.LoadMore lazy={false} label={'Vis flere notifikationer'} />
                    </Collection>
                </ul>
            </React.Fragment>
        );
    }

    renderHandle() {
        return (
            <Model resourceName={'notification'} operationName={'count'}>
                <Filters.AutoFetch/>
                <Filters.Static constraint={'unread'} value={true}/>
                <Filters.Echo channel={'App.Models.User.User'} isPrivate={true} notification={true} onRefresh={this.handleIncomingNotification}/>
                <Filters.Echo channel={'App.Models.User.User'} isPrivate={true} event={'notification.read'}/>

                <WhenModelValue name={'count'} condition={count => count > 0}>
                    <div className={`${this.iconClass} ${this.iconClass}--unread`} onClick={this.toggleMenu}>
                        {this.bellSvg}
                        <span className={`${this.iconClass}__count`}>
                            <Text name={'count'}/>
                        </span>
                    </div>
                </WhenModelValue>

                <WhenModelValue name={'count'} condition={count => count < 1}>
                    <div className={this.iconClass} onClick={this.toggleMenu}>
                        {this.bellSvg}
                    </div>
                </WhenModelValue>
            </Model>
        );
    }

}
