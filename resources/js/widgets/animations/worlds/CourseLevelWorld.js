import React from "react";
import World from "widgets/animations/worlds/World";
import {inject} from "@morningtrain/react-decorators";
import SeaSurfaceWorld from "widgets/animations/worlds/SeaSurfaceWorld";
import SeaMiddleWorld from "widgets/animations/worlds/SeaMiddleWorld";
import SeaDeepWorld from "widgets/animations/worlds/SeaDeepWorld";

@inject(['model'])
class CourseLevelWorld extends World {
    static get defaultProps() {
        return {
            ...super.defaultProps,
            classNames: 'underwater-world underwater-world--surface',
            crowdedness: 1
        };
    }

    findWorld(){
        let level = this.props.level || this.props.model.get('level');

        switch(parseInt(level)) {
            case 0:
                return SeaSurfaceWorld;
            case 1:
                return SeaMiddleWorld;
            case 2:
                return SeaDeepWorld;
        }

        return SeaSurfaceWorld;
    }

    render() {

        let World = this.findWorld();

        return (
            <World crowdedness={this.props.crowdedness} >
                {this.props.children}
            </World>
        );
    }

}

export default CourseLevelWorld;
