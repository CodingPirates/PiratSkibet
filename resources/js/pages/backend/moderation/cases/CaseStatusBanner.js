import React from "react";
import Widget from "widgets/Widget";
import {inject} from "@morningtrain/react-decorators";
import {Enum} from "support/displays";
import * as Filters from "support/filters";
import * as Fields from "support/fields";
import {Model} from "@morningtrain/react-resources";
import CloseModalOnSuccess from "support/reactions/CloseModalOnSuccess";
import Preview from "pages/backend/moderation/moderateable/Preview";
import Banner from "layouts/Banner";

@inject(['model'])
export default class CaseStatusBanner extends Widget {

    get actions() {
        const actions = this.props.model.get('manual_moderation_actions');

        if (!actions) return [];

        return Object.keys(actions)
            .map(action => ({
                label: actions[action],
                value: action,
            }));
    }

    renderModerationActions() {
        return this.props.children || null;
    }

    get bannerColor() {

        const status = this.props.model.get('status');

        switch(status) {
            case 'pending':
                return 'red';
            case 'moderated':
                return 'green';
            case 'automatically_moderated':
                return 'yellow';
            case 'rejected':
                return 'blue';
        }

    }

    renderWidget() {
        return (
            <React.Fragment>
                <Banner color={this.bannerColor} spaced={true} >
                    Status: <Enum name={'status'} enum={'moderation_case_status'}/>
                    <Preview label={'Foretag moderation'}>
                        <Model proxy={true} submitoperationName={'moderate'} submittable={true}>
                            <Filters.ModelParameter constraint={'moderation_case'} modelKey={'id'}/>
                            <CloseModalOnSuccess/>

                            <div className={'form-content-backend'}>
                                <div className={'form-elements-wrap'}>
                                    <Fields.Switch name={'action'} label={'Handling'} options={this.actions} required={true} placeholder={'Vælg type'}>
                                        {this.renderModerationActions()}
                                    </Fields.Switch>
                                </div>
                            </div>
                        </Model>
                    </Preview>
                </Banner>
            </React.Fragment>
        );
    }
}
