import React from "react";
import Animation from "widgets/animations/Animation";
import {inject} from "@morningtrain/react-decorators";

@inject(['director'])
export default class Cloud extends Animation {

    static get defaultProps() {
        return {
            ...super.defaultProps,
            direction: 'left'
        };
    }

    get transitionsProps() {
        return {};
    }

    get classNames() {
        return 'cloud-';
    }

    get width() {
        return this.scaleWidth(20) + '%';
    }

    get baseDuration() {
        return 1;
    }

    get styles() {
        return {
            ...super.styles,
            transitionDuration: this.duration + 's'
        }
    }

    renderContent() {
        return (
            <svg className="cloud" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 228.54 89.81">
                <path className="cloud__shadow" d="M228.54,64.2V48.4s0-25.7-25.7-25.7h-20.7c-.9-6.8-5.2-22.7-25.4-22.7H76.94s-23.5.1-25.5,22.7H25.74S0,22.7,0,48.4V64.1s0,25.7,25.7,25.7h38.8a30.42,30.42,0,0,0,5.7-.7,33.63,33.63,0,0,0,6.7.7h79.8a22,22,0,0,0,3.1-.3,28.07,28.07,0,0,0,4.3.3h38.8c0,.1,25.6.1,25.6-25.6" />
                <path className="cloud__fill" d="M169.34,22.7s17.57-.08,20.7,0,12.31-.5,19,4.48c5.47,4.06,6.68,6.66,6.68,19.69,0,13.72.16,19.22-5.7,25s-11.39,7.31-25.35,7.31-34.09,0-34.92,0-2.83-.27-2.83-.27a30.38,30.38,0,0,1-3.52.3c-1.45,0-77.52.06-79.38,0s-4.57.46-6.7-.7a28.67,28.67,0,0,1-6.81.7H12.84c-2.57,0-9.14.42-11-5.52S0,65.41,0,60.13V48.5c0-1-.25-8.49,4-14.89S16.39,22.8,25.74,22.8h25.7A23.54,23.54,0,0,1,57.7,7.88C64,1.14,73.94,0,76.94,0h67c2.92,0,10.91-.14,17.51,6.13A26.63,26.63,0,0,1,169.34,22.7Z" />
            </svg>
        );
    }

}
