import React from "react";
import Animation from "widgets/animations/Animation";
import {inject} from "@morningtrain/react-decorators";

@inject(['director'])
export default class BlueFish extends Animation {

    static get defaultProps() {
        return {
            ...super.defaultProps,
            direction: 'left',
            shadow: false,
            animationDuration: 10
        };
    }

    get transitionsProps() {
        return {};
    }

    get classNames() {
        return 'bluefish-';
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

    get fishBody() {
        if(this.props.shadow === false) {
            return (
                <g className="colors">
                    <g className="body">
                        <polygon className="cls-1" points="24 96 24 108 48 108 48 120 60 120 60 132 84 132 84 144 156 144 156 132 180 132 180 120 204 120 204 108 228 108 228 96 24 96" />
                        <polygon className="cls-2" points="180 84 180 72 48 72 48 84 24 84 24 96 204 96 204 84 180 84" />
                        <rect className="cls-3" x="12" y="96" width="12" height="12" />
                        <polygon className="cls-3" points="228 96 228 108 204 108 204 120 180 120 180 132 156 132 156 144 84 144 84 132 60 132 60 120 48 120 48 108 24 108 24 120 36 120 36 132 48 132 48 144 72 144 72 156 168 156 168 144 192 144 192 132 216 132 216 120 240 120 240 108 252 108 252 96 228 96" />
                        <rect className="cls-4" x="12" y="84" width="12" height="12" />
                        <polygon className="cls-4" points="216 84 216 72 192 72 192 60 168 60 168 48 60 48 60 60 36 60 36 72 24 72 24 84 48 84 48 72 180 72 180 84 204 84 204 96 240 96 240 84 216 84" />
                    </g>
                    <g className="fins">
                        <rect x="84" y="24" width="12" height="12" />
                        <rect x="132" y="24" width="12" height="12" />
                        <rect x="96" y="12" width="12" height="12" />
                        <rect x="120" y="12" width="12" height="12" />
                        <rect x="108" width="12" height="12" />
                        <polygon className="cls-5" points="120 24 120 12 108 12 108 24 96 24 96 36 132 36 132 24 120 24" />
                        <rect x="252" y="72" width="12" height="12" />
                        <rect x="264" y="60" width="12" height="12" />
                        <rect x="276" y="48" width="12" height="12" />
                        <rect x="264" y="132" width="12" height="12" />
                        <rect x="276" y="144" width="12" height="12" />
                        <rect x="288" y="120" width="12" height="24" />
                        <rect x="264" y="96" width="12" height="12" />
                        <rect x="288" y="60" width="12" height="24" />
                        <rect x="276" y="84" width="12" height="12" />
                        <rect x="276" y="108" width="12" height="12" />
                        <rect x="252" y="120" width="12" height="12" />
                        <polygon className="cls-5" points="276 120 276 108 264 108 252 108 252 120 264 120 264 132 276 132 276 144 288 144 288 120 276 120" />
                        <polygon className="cls-5" points="276 60 276 72 264 72 264 84 252 84 252 96 264 96 276 96 276 84 288 84 288 60 276 60" />
                        <rect className="cls-6" x="276" y="132" width="12" height="12" />
                        <rect className="cls-6" x="264" y="120" width="12" height="12" />
                        <rect x="84" y="60" width="12" height="12" />
                        <rect x="96" y="72" width="12" height="12" />
                        <rect x="108" y="84" width="12" height="12" />
                        <rect x="108" y="96" width="12" height="12" />
                        <rect x="108" y="108" width="12" height="12" />
                        <rect x="96" y="120" width="12" height="12" />
                        <rect x="84" y="132" width="12" height="12" />
                        <rect x="120" y="96" width="12" height="12" />
                        <rect x="132" y="108" width="12" height="24" />
                        <polygon className="cls-5" points="120 108 120 120 108 120 108 132 120 132 132 132 132 108 120 108" />
                        <rect x="108" y="132" width="24" height="12" />
                        <rect className="cls-6" x="120" y="120" width="12" height="12" />
                        <rect className="cls-6" x="108" y="120" width="12" height="12" />
                    </g>
                    <g className="eye">
                        <rect className="cls-7" x="35.5" y="78.5" width="36" height="36" />
                        <rect className="cls-8" x="47.5" y="90.5" width="12" height="12" />
                    </g>
                </g>
            )
        }

        return false;
    }

    renderContent() {
        return (
            <svg className={`bluefish${this.props.shadow ? ' bluefish--shadow' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 168" style={{animationDuration: this.props.animationDuration + 's'}}>
                <title>fish</title>
                <polygon className="outline" points="288 96 288 84 300 84 300 60 288 60 288 48 276 48 276 60 264 60 264 72 252 72 252 84 240 84 240 72 216 72 216 60 192 60 192 48 168 48 168 36 144 36 144 24 132 24 132 12 120 12 120 0 108 0 108 12 96 12 96 24 84 24 84 36 60 36 60 48 36 48 36 60 24 60 24 72 12 72 12 84 0 84 0 108 12 108 12 120 24 120 24 132 36 132 36 144 48 144 48 156 72 156 72 168 168 168 168 156 192 156 192 144 216 144 216 132 240 132 240 120 252 120 252 132 264 132 264 144 276 144 276 156 288 156 288 144 300 144 300 120 288 120 288 108 276 108 276 96 288 96" />
                {this.fishBody}
            </svg>
        );
    }

}
