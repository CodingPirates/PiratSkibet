import React from "react";
import {observable} from "mobx";
import {Provider} from "mobx-react";
import debounce from "lodash/debounce";
import shuffle from "lodash/shuffle";

export default class Director extends React.Component {

    constructor(props) {
        super(props);

        //console.log('DIRECTOR', this);

        this.animations = {};
        this.animationInstances = {};

        this.spawnsCount = 0;


    }

    static get defaultProps() {
        return {
            limit: 2
        };
    }

    @observable spawns = new Map();

    get uuids() {
        return Object.keys(this.animations);
    }

    isInitialSpawn() {
        return this.spawnsCount === 1;
    }

    shouldSpawn(uuid) {
        //console.log(uuid);
        return this.spawns.has(uuid);
    }

    checkSpawns() {
        if (this.spawns.size < this.props.limit) {
            setTimeout(() => {
                this.spawn();
            }, 200);
        }
    }

    spawn = debounce(() => {
        this.spawnsCount++;
        let uuids = shuffle(this.uuids);
        if (uuids.length > 0) {
            for (let i = 0; i < uuids.length; i++) {
                let uuid = uuids[i];
                if (!this.spawns.has(uuid) && this.spawns.size < this.props.limit && this.animationInstances[uuid].isSpawnable) {
                    this.spawns.set(uuid);
                    this.animations[uuid]++;
                    setTimeout(() => {
                        this.exited(uuid);
                    }, this.animationInstances[uuid].duration * 1000 + 3000);
                }
            }
        }
    }, 10)

    registerAnimation(uuid, instance) {
        this.animations[uuid] = 0;
        this.animationInstances[uuid] = instance;
        this.checkSpawns();
    }

    entered() {

    }

    exited(uuid) {
        this.spawns.delete(uuid);
        setTimeout(() => {
            this.checkSpawns();
        }, 1000);
    }

    render() {
        return (
            <Provider director={this}>
                <React.Fragment>
                    {this.props.children}
                </React.Fragment>
            </Provider>
        );
    }

}
