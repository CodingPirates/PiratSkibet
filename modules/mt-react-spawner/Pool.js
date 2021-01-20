import React from "react";
import {inject} from "@morningtrain/react-decorators";

@inject(["spawner"])
class Pool extends React.Component {

    renderSpawns() {

        if (!this.props.spawner) {
            return null;
        }

        return this.props.spawner.getSpawns();
    }

    render() {
        return (
            <React.Fragment>
                {this.renderSpawns()}
            </React.Fragment>
        );
    }

}

export default Pool;
