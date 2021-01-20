import React from "react";
import Link from "widgets/navigation/Link";
import Page from '@morningtrain/react-app/Page';
import {Model} from "@morningtrain/react-resources";
import {CatchError} from "@morningtrain/react-errors";
import {Can} from "@morningtrain/react-auth";
import User from "pages/backend/moderation/user/User";
import Requests from "pages/backend/moderation/moderation_requests/Requests";
import ModerationCase from "pages/backend/moderation/ModerationCase";
import Actions from "pages/backend/moderation/actions/Actions";
import * as Filters from "support/filters";
import {FlexSplitter} from "layouts";
import {inject} from "@morningtrain/react-decorators";
import {Provider} from "mobx-react";

@inject(['router'])
export default class View extends React.Component {

    get resourceName() {
        return 'backend.moderation.moderation_case';
    }

    get caseId() {
        return this.props.router.params.get('moderation_case');
    }

    get channel() {
        return 'moderation.case.' + this.caseId;
    }

    renderNotFound() {
        return <p>{this.resourceName} not found</p>;
    }

    render() {
        return (
            <Page>
                <Model resourceName={this.resourceName} >
                    <Filters.Echo channel={this.channel} event={'updated'}/>

                    <FlexSplitter>
                        <Link route={'backend.moderation.index_cases'} label={'Tilbage til oversigten'}/>
                        <Link route={'backend.moderation.next_case'} parameters={{except:'model:id'}} label={'Næste uløste sag'} disableRouting={true}/>
                    </FlexSplitter>
                    <CatchError code={404} errorContent={this.renderNotFound.bind(this)}>
                        <Can permission={`api.${this.resourceName}.read`}>
                            <Provider caseChannel={this.channel}>
                                <React.Fragment>
                                    <ModerationCase/>
                                    <Actions/>
                                    <Requests/>
                                    <User/>
                                </React.Fragment>
                            </Provider>
                        </Can>
                    </CatchError>
                </Model>
            </Page>
        );
    }
}
