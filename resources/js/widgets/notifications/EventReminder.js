import React from "react";
import {Notification} from "widgets/notifications/Notification";
import EventModal from "widgets/events/EventModal";
import {inject} from "@morningtrain/react-decorators";

@inject(['model'])
export default class EventReminder extends Notification {

    constructor(props) {
        super(props);

        this.modal = React.createRef();
    }


    openModal() {
        this.modal.current.open();
    }

    render() {
        if (!this.shouldRender()) return null;

        return (
            <React.Fragment>
                <li className={this.className} onClick={this.openModal.bind(this)} onMouseEnter={this.read} >
                    <div className={`${this.baseClass}__title`}>{this.data.title}</div>
                    <div className={`${this.baseClass}__msg`}>{this.data.msg}</div>
                </li>
                <EventModal ref={this.modal} eventId={this.data.event_id} />
            </React.Fragment>
        );
    }
}
