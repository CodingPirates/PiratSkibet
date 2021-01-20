import React from "react";
import Widget from "widgets/Widget";
import {Modal} from "support/modals";
import {Model} from "@morningtrain/react-resources";
import * as Filters from "support/filters";
import * as Fields from "support/fields";
import CloseModalOnSuccess from "support/reactions/CloseModalOnSuccess";
import RefreshOnSuccess from "@morningtrain/react-resources/src/RefreshOnSuccess";
import {inject} from '@morningtrain/react-decorators';

@inject(['operations'])
export default class RequestModerationModal extends Widget {

    get operation() {
        return this.props.operations.get('api', this.props.resourceName, 'flag')
    }

    render() {
        const {resource, resourceName, resourceId} = this.props;

        return (
            <Modal label={'Rapporter'} defaultOpen={true} >
                <div className="form-content edit-post">
                    <Model resourceName={resourceName} submitoperationName={'flag'} submittable={true}>
                        <RefreshOnSuccess operation={this.operation} operationName={'read'} operationContext={{proxy: true, [resource]: resourceId}}/>
                        <CloseModalOnSuccess/>
                        <Filters.Static constraint={resource} value={resourceId}/>

                        <Fields.Select name={'reason'} label={'Årsag'}
                                       enum={'moderation_reasons'}
                                       placeholder={'Vælg årsag'} required={true}
                                       only={[
                                           'spam',
                                           'malicious_content',
                                           'doxing',
                                           'impersonation',
                                           'disturbing_content',
                                           'discriminatory',
                                           'threatening',
                                           'infringing',
                                           'other',
                                       ]}/>
                        <Fields.TextArea name={'comment'} label={'Begrundelse'} required={true} />

                        <input type={'submit'} value={'Rapporter'}/>
                    </Model>
                </div>
            </Modal>
        );
    }
}
