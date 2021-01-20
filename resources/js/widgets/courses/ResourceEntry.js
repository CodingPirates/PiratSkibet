import React from "react";
import Widget from "widgets/Widget";
import {inject} from "@morningtrain/react-decorators";
import * as Components from "widgets/courses/resources";

@inject(['model'])
export default class ResourceEntry extends Widget {

    constructor(props) {
        super(props);
    }

    get type(){
        return this.props.model.get('type');
    }

    get resource(){
        return React.createElement(
            Components[this.type.charAt(0).toUpperCase() + this.type.slice(1)]
        )
    }

    renderWidget() {
        return (
            <React.Fragment>
                {this.resource}
            </React.Fragment>
        );
    }

}
