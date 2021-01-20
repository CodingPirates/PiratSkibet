import React from "react";
import {inject} from "@morningtrain/react-decorators";

@inject(['model'])
class WhenModel extends React.Component {

    shouldRender() {
        const {exists} = this.props;

        if (exists === true && this.props.model.size > 0) {
            return true;
        }

        if (exists === false && this.props.model.size < 1) {
            return true;
        }

        return false;
    }

    render() {
        if (this.shouldRender()) {
            return this.props.children;
        }

        return null;
    }

}

WhenModel.defaultProps = {
    exists: true,
};

export default WhenModel;
