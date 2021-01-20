import React from "react";
import {inject} from "@morningtrain/react-decorators";
import AfterExecute from "support/conditionals/AfterExecute";

@inject(['collection'])
export default class WhenCollection extends React.Component {

    static get defaultProps() {
        return {
            empty: false
        };
    }

    shouldRender() {
        const {empty, collection, length} = this.props;

        if (empty === true) return !(collection.length);
        if (empty === false) return collection.length;

        if (length && typeof length === 'function') return length(collection.length);

        return false;
    }

    renderContent() {
        return this.shouldRender() ? this.props.children : null;
    }

    render() {
        return (
            <AfterExecute>
                <React.Fragment>
                    {this.renderContent()}
                </React.Fragment>
            </AfterExecute>
        );
    }

}
