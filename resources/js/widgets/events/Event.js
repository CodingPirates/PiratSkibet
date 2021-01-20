import React from "react";
import Widget from "widgets/Widget";
import Hoverable from "support/interactions/Hoverable";
import Theme from "layouts/Theme";
import {inject} from "@morningtrain/react-decorators";
import * as Displays from "support/displays";
import EventModal from "widgets/events/EventModal";

export default
@inject(['model'])
class Event extends Widget {

    static get defaultProps() {
        return {
            type: 'big',
            theme: 'default',
            dummyId: 0
        };
    }

    constructor(props) {
        super(props);

        this.modal = React.createRef();
    }

    get classNames() {
        let classNames = [];

        classNames.push('event-box');
        classNames.push('event-box--' + this.props.type);

        return classNames.join(' ');
    }

    get link() {
        return this.props.model.get('link');
    }

    get image() {
        return <img src={this.props.model.get('img')} alt={this.props.model.get('img')} />;
    }

    get title() {
        return this.props.model.get('title');
    }

    get theme() {
        return this.props.model.get('theme');
    }

    get id() {
        return this.props.model.get('id');
    }

    openModal() {
        this.modal.current.open();
    }

    renderWidget() {
        return (
            <React.Fragment>
                <Hoverable className={this.classNames}>
                    <div className="event-box__image object-fit">
                        {this.image}
                    </div>
                    <Theme name={this.theme} >
                        <div className="event-box__text" onClick={this.openModal.bind(this)}>
                            <div className="event-box__content">
                                <div className="event-box__title heading">
                                    {this.title}
                                </div>
                                <Displays.DateTime name={'start_at'} />
                                <Displays.Html name={'description'} />
                            </div>
                        </div>
                    </Theme>
                </Hoverable>
                <EventModal ref={this.modal} eventId={this.id} />
            </React.Fragment>
        );
    }

}
