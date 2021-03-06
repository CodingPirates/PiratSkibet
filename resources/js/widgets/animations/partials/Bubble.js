import React from "react";
import Animation from "widgets/animations/Animation";
import {inject} from "@morningtrain/react-decorators";
import { timingSafeEqual } from "crypto";

@inject(['director'])
export default class Bubble extends Animation {

    static get defaultProps() {
        return {
            ...super.defaultProps,
            direction: 'up',
            animationDuration: 10
        };
    }

    get transitionsProps() {
        return {};
    }

    get classNames() {
        return 'bubble-';
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
            <React.Fragment>
                <svg className="bubble" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 191 191" style={{animationDuration: this.props.animationDuration + 's'}}>
                    <g className="outline">
                        <polygon points="178.88 71.55 178.88 83.48 178.88 95.4 178.88 107.33 178.88 119.25 190.81 119.25 190.81 107.33 190.81 95.4 190.81 83.48 190.81 71.55 178.88 71.55" />
                        <polygon points="166.96 119.25 166.96 131.18 166.96 143.11 178.88 143.11 178.88 131.18 178.88 119.25 166.96 119.25" />
                        <polygon points="166.96 47.7 166.96 59.63 166.96 71.55 178.88 71.55 178.88 59.63 178.88 47.7 166.96 47.7" />
                        <rect x="155.03" y="143.11" width="11.93" height="11.92" />
                        <rect x="155.03" y="35.78" width="11.93" height="11.92" />
                        <rect x="143.11" y="155.03" width="11.92" height="11.93" />
                        <rect x="143.11" y="23.85" width="11.92" height="11.93" />
                        <polygon points="131.18 166.96 119.25 166.96 119.25 178.88 131.18 178.88 143.11 178.88 143.11 166.96 131.18 166.96" />
                        <polygon points="131.18 11.93 119.25 11.93 119.25 23.85 131.18 23.85 143.11 23.85 143.11 11.93 131.18 11.93" />
                        <polygon points="107.33 178.88 95.4 178.88 83.48 178.88 71.55 178.88 71.55 190.81 83.48 190.81 95.4 190.81 107.33 190.81 119.25 190.81 119.25 178.88 107.33 178.88" />
                        <polygon points="107.33 0 95.4 0 83.48 0 71.55 0 71.55 11.93 83.48 11.93 95.4 11.93 107.33 11.93 119.25 11.93 119.25 0 107.33 0" />
                        <polygon points="59.63 166.96 47.7 166.96 47.7 178.88 59.63 178.88 71.55 178.88 71.55 166.96 59.63 166.96" />
                        <polygon points="59.63 11.93 47.7 11.93 47.7 23.85 59.63 23.85 71.55 23.85 71.55 11.93 59.63 11.93" />
                        <rect x="35.78" y="155.03" width="11.92" height="11.93" />
                        <rect x="35.78" y="23.85" width="11.92" height="11.93" />
                        <rect x="23.85" y="143.11" width="11.93" height="11.92" />
                        <rect x="23.85" y="35.78" width="11.93" height="11.92" />
                        <polygon points="11.93 119.25 11.93 131.18 11.93 143.11 23.85 143.11 23.85 131.18 23.85 119.25 11.93 119.25" />
                        <polygon points="11.93 47.7 11.93 59.63 11.93 71.55 23.85 71.55 23.85 59.63 23.85 47.7 11.93 47.7" />
                        <polygon points="0 71.55 0 83.48 0 95.4 0 107.33 0 119.25 11.93 119.25 11.93 107.33 11.93 95.4 11.93 83.48 11.93 71.55 0 71.55" />
                    </g>
                    <polygon className="cls-1" points="166.96 71.55 166.96 59.63 166.96 47.7 155.03 47.7 155.03 35.78 143.11 35.78 143.11 23.85 131.18 23.85 119.25 23.85 119.25 11.93 107.33 11.93 95.4 11.93 83.48 11.93 71.55 11.93 71.55 23.85 59.63 23.85 47.7 23.85 47.7 35.78 35.78 35.78 35.78 47.7 23.85 47.7 23.85 59.63 23.85 71.55 11.93 71.55 11.93 83.48 11.93 95.4 11.93 107.33 11.93 119.25 23.85 119.25 23.85 131.18 23.85 143.11 35.78 143.11 35.78 155.03 47.7 155.03 47.7 166.96 59.63 166.96 71.55 166.96 71.55 178.88 83.48 178.88 95.4 178.88 107.33 178.88 119.25 178.88 119.25 166.96 131.18 166.96 143.11 166.96 143.11 155.03 155.03 155.03 155.03 143.11 166.96 143.11 166.96 131.18 166.96 119.25 178.88 119.25 178.88 107.33 178.88 95.4 178.88 83.48 178.88 71.55 166.96 71.55" />
                    <polygon className="cls-2" points="131 48 131 36 119 36 119 48 119 60 131 60 143 60 143 48 131 48" />
                    <rect className="cls-2" x="143" y="72" width="12" height="12" />
                </svg>
            </React.Fragment>
        );
    }

}
