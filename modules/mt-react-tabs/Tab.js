import React from "react";
import {inject} from "@morningtrain/react-decorators";

export default
@inject(["tabManager"])
class Tab extends React.Component {

    constructor(props) {
        super(props);

        props.tabManager.registerTab(props.slug, props.label);
    }

    get isActive() {
        const {tabManager, slug} = this.props;

        return tabManager.isActive(slug);
    }

    render() {
        if (!this.isActive) return null;

        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        );
    }
}
