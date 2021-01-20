import React from "react";
import Widget from "widgets/Widget";
import * as Displays from "support/displays";
import {inject} from "@morningtrain/react-decorators";
import moment from "moment";
import ModelReaction from "support/reactions/ModelReaction";
import Badge from "widgets/forum/Badge";
import Badges from "widgets/forum/Badges";
import WhenModel from "support/conditionals/WhenModel";

@inject(['model', 'modal'])
export default class EventDetails extends Widget {

    constructor(props) {
        super(props);

        this.changeModalLabel = this.changeModalLabel.bind(this);
    }

    changeModalLabel(title) {
        const {modal} = this.props;

        if (!modal) return;

        modal.setLabel(title);
    }

    get model() {
        return this.props.model;
    }

    get link() {
        return this.model.get('link');
    }

    get img() {
        return this.model.get('img');
    }

    render() {
        return(
            <React.Fragment>
                <ModelReaction name={'title'} onReaction={this.changeModalLabel} />
                <WhenModel>

                    {/* <Displays.Heading name={'title'} /> */}
                    <div className={'modal-header-image'} >
                        <img alt='event' src={this.img} />
                    </div>

                    <div className={'modal-inner-content'} >

                        <Badges>
                            <Badge color={'blue'} >
                                Fra: <Displays.DateTime name={'start_at'} />
                            </Badge>
                            <Badge color={'blue'} >
                                Til: <Displays.DateTime name={'end_at'} />
                            </Badge>
                        </Badges>

                        <Displays.Html name={'description'} />
                    </div>


                    <div className={'modal-footer'} >
                        <a className={'button button--pink'} target={'_blank'} href={this.link} >Se mere</a>
                    </div>
                </WhenModel>
            </React.Fragment>
        );
    }

}
