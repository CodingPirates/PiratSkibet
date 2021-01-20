import React from "react";
import {inject} from "@morningtrain/react-decorators";
import Display from "@morningtrain/react-displays/Display";
import AvatarComponent from "services/avatar/Avatar";

@inject(['model'])
export default class Avatar extends Display {

    static get defaultProps(){
        return {
            ...super.defaultProps,
            name: 'avatar'
        }
    }

    render() {
        return <AvatarComponent svg={this.value} embed={this.props.embed} />
    }
}
