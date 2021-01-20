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
export default class RequestRemovalModal extends Widget {

    get operation() {
        return this.props.operations.get('api', this.props.resourceName, 'request_removal')
    }

    render() {
        const {resource, resourceName, resourceId, label} = this.props;

        return (
            <Modal label={label} defaultOpen={true} >
                <div className="form-content edit-post">
                    <Model resourceName={resourceName} submitoperationName={'request_removal'} submittable={true}>
                        <RefreshOnSuccess operation={this.operation} operationName={'read'} operationContext={{proxy: true, [resource]: resourceId}}/>
                        <CloseModalOnSuccess/>
                        <Filters.Static constraint={resource} value={resourceId}/>

                        <p>Hvis du vælger at slette dit opslag, vil det straks blive skjult for andre.</p>
                        <p>En moderator på Piratskibet vil herefter slette det helt.</p>

                        <Fields.Hidden name={'reason'} value={'removal_request'} />

                        <input type={'submit'} value={label}/>
                    </Model>
                </div>
            </Modal>
        );
    }
}
