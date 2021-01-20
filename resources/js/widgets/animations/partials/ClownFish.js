import React from "react";
import Animation from "widgets/animations/Animation";
import {inject} from "@morningtrain/react-decorators";

@inject(['director'])
export default class ClownFish extends Animation {

    static get defaultProps() {
        return {
            ...super.defaultProps,
            direction: 'left',
            shadow: false
        };
    }

    get transitionsProps() {
        return {};
    }

    get classNames() {
        return 'clownfish-';
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
                    <polygon className="cls-1" points="277 48 277 36 253 36 253 48 241 48 241 60 229 60 229 72 217 72 217 60 193 60 193 48 181 48 181 36 181 24 169 24 169 12 133 12 133 24 133 36 109 36 109 24 97 24 97 12 61 12 61 24 61 36 49 36 49 48 25 48 25 60 13 60 13 96 25 96 25 108 49 108 49 120 73 120 73 132 61 132 61 144 97 144 97 132 97 120 133 120 133 132 133 144 169 144 169 132 181 132 181 120 181 108 193 108 193 96 217 96 217 84 229 84 229 96 241 96 241 108 253 108 253 120 277 120 277 108 289 108 289 96 289 60 289 48 277 48" />
                    <g className="pattern">
                        <rect className="cls-2" x="181" y="60" width="36" height="24" />
                        <polygon className="cls-2" points="73 60 73 48 61 48 61 36 49 36 49 48 37 48 37 60 49 60 49 72 61 72 61 84 49 84 49 96 49 108 73 108 73 96 85 96 85 84 85 72 85 60 73 60" />
                        <rect className="cls-3" x="109" y="108" width="24" height="12" />
                        <rect className="cls-3" x="193" y="84" width="24" height="12" />
                        <rect className="cls-3" x="49" y="108" width="12" height="12" />
                        <rect className="cls-3" x="37" y="96" width="12" height="12" />
                        <polygon className="cls-2" points="133 60 133 36 109 36 109 60 97 60 97 108 121 108 133 108 133 96 121 96 121 60 133 60" />
                    </g>
                    <g className="shadows">
                        <rect className="cls-4" x="253" y="108" width="24" height="12" />
                        <rect className="cls-4" x="253" y="72" width="12" height="12" />
                        <rect className="cls-4" x="217" y="72" width="12" height="12" />
                        <rect className="cls-4" x="181" y="96" width="12" height="12" />
                        <rect className="cls-4" x="25" y="96" width="12" height="12" />
                        <rect className="cls-4" x="97" y="108" width="12" height="12" />
                        <rect className="cls-4" x="133" y="132" width="36" height="12" />
                        <polygon className="cls-4" points="85 120 85 132 61 132 61 144 97 144 97 132 97 120 85 120" />
                        <rect className="cls-4" x="169" y="108" width="12" height="24" />
                        <polygon className="cls-4"
                            points="277 48 265 48 253 48 253 60 265 60 277 60 277 84 265 84 265 96 277 96 277 108 289 108 289 48 277 48" />
                    </g>
                    <g className="highlights">
                        <rect className="cls-5" x="229" y="60" width="12" height="12" />
                        <rect className="cls-5" x="241" y="48" width="12" height="12" />
                        <rect className="cls-5" x="253" y="36" width="24" height="12" />
                        <polygon className="cls-5" points="157 12 145 12 133 12 133 24 133 36 145 36 145 24 157 24 169 24 169 12 157 12" />
                        <polygon className="cls-5" points="85 12 73 12 61 12 61 24 61 36 73 36 73 24 85 24 97 24 97 12 85 12" />
                        <rect className="cls-5" x="25" y="48" width="12" height="12" />
                        <rect className="cls-5" x="13" y="60" width="12" height="24" />
                    </g>
                    <rect className="eye" x="37" y="72" width="12" height="12" />
                </g>
            )
        }

        return false;
    }

    renderContent() {
        return (
            <svg className={`clownfish${this.props.shadow ? ' clownfish--shadow' : ''}`} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 302 156" style={{animationDuration: this.props.animationDuration + 's'}}>
                <title>clownfish</title>
                <polygon className="outline" points="289 48 289 36 277 36 277 24 253 24 253 36 241 36 241 48 229 48 229 60 217 60 217 48 193 48 193 24 181 24 181 12 169 12 169 0 133 0 133 12 121 12 121 24 109 24 109 12 97 12 97 0 61 0 61 12 49 12 49 36 25 36 25 48 13 48 13 60 0 60 0 96 13 96 13 108 25 108 25 120 49 120 49 144 61 144 61 156 97 156 97 144 109 144 109 132 121 132 121 144 133 144 133 156 169 156 169 144 181 144 181 132 193 132 193 108 217 108 217 96 229 96 229 108 241 108 241 120 253 120 253 132 277 132 277 120 289 120 289 108 302 108 302 48 289 48" />
                {this.fishBody}
            </svg>
        );
    }

}
