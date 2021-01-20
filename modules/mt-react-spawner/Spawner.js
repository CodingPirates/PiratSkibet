import React from "react";
import {Provider} from "mobx-react";
import Pool from "./Pool";
import {observable} from "mobx";

export default class Spawner extends React.Component {

    @observable spawns = new Map();

    constructor(props) {
        super(props);

        this.spawn.bind(this);

    }

    getSpawns() {
        if (this.spawns.has('component') && this.spawns.has('props')) {
            return React.cloneElement(
                this.spawns.get('component'),
                this.spawns.get('props')
            );
        }
    }

    spawn(component, props = {}) {
        this.spawns.clear();
        setTimeout(() => {
            this.spawns.replace({component, props});
        }, 0)
    }

    render() {
        return (
            <Provider spawner={this}>
                <React.Fragment>
                    <Pool/>
                    {this.props.children}
                </React.Fragment>
            </Provider>
        );
    }

}