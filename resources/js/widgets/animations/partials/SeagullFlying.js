import React from "react";
import Animation from "widgets/animations/Animation";
import {inject} from "@morningtrain/react-decorators";

@inject(['director'])
export default class SeagullFlying extends Animation {

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
        return 'seagull-';
    }

    get width() {
        return this.scaleWidth(100) + '%';
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
            <svg className="seagull" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 89 42">
                <g className="glitchable">
                    <polygon id="body" className="st0" points="38,13.7 38,28.3 73.3,28.3 87.3,13.7 	"/>
                    <g id="head_1_">
                        <rect id="beak" x="1.3" y="17" className="st1" width="27" height="7.1"/>
                        <rect x="12" y="3.6" className="st2" width="26" height="26"/>
                        <g id="eye">
                            <rect x="17.7" y="9.2" className="st0" width="14.6" height="14.8"/>
                            <rect x="21.3" y="13.1" className="st2" width="7.3" height="7.5"/>
                        </g>
                    </g>
                    <rect className="st2 wing-mid" x="43.5" y="17.4" width="27" height="7.1"/>
                    <polygon className="st2 wing-down" points="43.5,17.5 53.5,40.5 60.5,40.5 70.5,17.5"/>
                    <polygon className="st2 wing-up" points="70.5,24.5 60.5,1.5 53.5,1.5 43.5,24.5"/>
                </g>
            </svg>
        );
    }

}
