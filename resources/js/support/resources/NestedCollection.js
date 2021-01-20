import React from "react";
import {inject} from "@morningtrain/react-decorators";
import Display from "@morningtrain/react-displays/Display";
import {Provider} from "mobx-react";

@inject(['model'])
export default class NestedCollection extends Display {

    render() {
        return (
            <Provider collection={this.value}>
                <React.Fragment>
                    {this.props.children}
                </React.Fragment>
            </Provider>
        );
    }

}
