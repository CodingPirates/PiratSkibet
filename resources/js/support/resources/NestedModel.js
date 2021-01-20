import React from "react";
import {inject} from "@morningtrain/react-decorators";
import Display from "@morningtrain/react-displays/Display";
import {Provider} from "mobx-react";
import {observable, toJS} from "mobx";

@inject(['model'])
export default class NestedModel extends Display {

    toMap(value) {
        return observable.map(Object.entries(toJS(value)));
    }

    formatValue(value) {

        if(!this.props.name) {
            return this.toMap(this.props.model);
        }

        return this.toMap(value);
    }

    render() {
        return (
            <Provider model={this.value}>
                <React.Fragment>
                    {this.props.children}
                </React.Fragment>
            </Provider>
        );
    }

}
