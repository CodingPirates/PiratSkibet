import React from "react";
import * as Fields from "support/fields"
import Widget from "widgets/Widget";
import {inject} from "@morningtrain/react-decorators";
import Badge from "widgets/forum/Badge";
import Badges from "widgets/forum/Badges";

@inject(['model'])
class ThreadHeader extends Widget {

    renderWidget() {

        if (!this.props.model) {
            return null;
        }

        return (
            <div className="thread-title">
                <h1>{this.props.model.get('subject')}</h1>
                <Badges>
                    <Fields.Case name={'grownups_can_participate'} when={true}>
                        <Badge color={'yellow'} label={'Voksne må deltage i chatten'} />
                    </Fields.Case>
                    <Fields.Case name={'status'} when={'locked'}>
                        <Badge color={'moderated'} label={'Låst'} />
                    </Fields.Case>
                    <Fields.Case name={'status'} when={'archived'}>
                        <Badge color={'deleted'} label={'Arkiveret'} />
                    </Fields.Case>
                </Badges>
            </div>
        );
    }

}

export default ThreadHeader;
