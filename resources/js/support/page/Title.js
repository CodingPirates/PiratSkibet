import React from "react";
import {inject} from "@morningtrain/react-decorators";
import {Env} from "@morningtrain/helpers";
import Display from "@morningtrain/react-displays/Display";

@inject(['model'])
export default class Title extends Display {

    get title() {
        return [
            this.value,
            Env.get('page.title'),
            Env.get('app.name')
        ].filter(t => t).join(' | ');
    }

    render() {

        if (typeof document.title !== 'undefined') {
            document.title = this.title;
        }

        return null;
    }

}
