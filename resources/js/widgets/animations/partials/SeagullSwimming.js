import React from "react";
import Animation from "widgets/animations/Animation";
import {inject} from "@morningtrain/react-decorators";

@inject(['director'])
export default class SeagullSwimming extends Animation {

    static get defaultProps() {
        return {
            ...super.defaultProps
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
            <svg className="seagull" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 65 40">
                <g className="glitchable">
                    <polygon className="st0" points="11,25.7 11,40.2 46.3,40.2 60.3,25.7"/>
                    <rect x="0.3" y="13" className="st1" width="27" height="7.1"/>
                    <rect x="11" y="-0.4" className="st2" width="26" height="26"/>

                    <g>
                        <rect x="16.7" y="5.2" className="st0" width="14.6" height="14.8"/>
                        <rect x="20.3" y="9.1" className="st2" width="7.3" height="7.5"/>
                    </g>

                    <rect id="wing" x="38.2" y="28.9" className="st2" width="27" height="7.1"/>
                </g>
            </svg>
        );
    }

}
