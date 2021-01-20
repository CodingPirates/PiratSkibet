import React from "react";
import Widget from "widgets/Widget";
import {inject} from "@morningtrain/react-decorators";
import NestedModel from "support/resources/NestedModel";
import * as Displays from "support/displays";
import Paper from "layouts/Paper";
import NestedCollection from "support/resources/NestedCollection";
import {Iterator} from "@morningtrain/react-resources";
import {Injected as Prefix} from "@morningtrain/react-fields/composites/Prefix";
import Answers from "widgets/courses/resources/Answers";

@inject(['model'])
export default class Questionnaire extends Widget {

    //////////////////////////////////
    /// Data getters
    //////////////////////////////////

    get meta(){

        const rawMeta = this.props.model.get('meta');

        if(typeof(rawMeta) === 'string') {
            return JSON.parse(rawMeta);
        }

        return rawMeta;
    }

    get my_progress(){

        let progress = this.props.model.get('my_progress');

        if(typeof(progress) === 'string') {
            progress = JSON.parse(progress);
        }

        if(typeof progress !== 'object' || !progress) {
            progress = {};
        }

        if(!progress.meta) {
            progress.meta = {};
        }

        return progress.meta;
    }

    //////////////////////////////////
    /// Rendering
    //////////////////////////////////

    renderWidget() {
        return (
            <NestedModel model={this.meta} >
                <Paper>
                    <Displays.Heading name={'title'} />
                    <Displays.Html name={'text'} />
                    <NestedCollection name={'questions'} >
                        <Iterator>
                            <Displays.Heading name={'question'} level={2} />
                            <Displays.Html name={'description'} />
                            <Prefix name={'uuid'}>
                                <Answers resource={this.props.model} progress={this.my_progress} />
                            </Prefix>
                        </Iterator>
                    </NestedCollection>
                </Paper>
            </NestedModel>
        );
    }

}
