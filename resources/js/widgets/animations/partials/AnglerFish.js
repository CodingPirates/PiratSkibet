import React from "react";
import Animation from "widgets/animations/Animation";
import {inject} from "@morningtrain/react-decorators";

@inject(['director'])
export default class AnglerFish extends Animation {

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
        return 'angler-fish-';
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
                <g className="angler-body">
                    <polygon className="cls-1" points="564 192 552 192 552 168 540 168 540 156 528 156 528 144 492 144 468 144 468 156 456 156 456 168 432 168 432 180 408 180 408 216 396 216 396 228 384 228 384 240 372 240 372 252 336 252 336 240 312 240 300 240 300 228 312 228 336 228 336 240 372 240 372 228 384 228 384 216 396 216 396 180 408 180 408 144 420 144 420 120 384 120 384 132 372 132 360 132 360 144 336 144 336 156 312 156 312 168 300 168 288 168 288 180 276 180 276 168 288 168 288 156 312 156 312 144 324 144 336 144 336 132 324 132 324 120 312 120 312 108 288 108 288 96 204 96 204 108 168 108 168 120 144 120 144 144 132 144 132 156 108 156 108 168 96 168 96 180 84 180 84 192 72 192 72 204 84 204 96 204 96 216 108 216 108 228 96 228 96 216 72 216 72 204 36 204 36 216 24 216 24 252 48 252 48 240 72 240 72 252 96 252 96 264 108 264 108 276 120 276 120 288 132 288 132 300 144 300 144 313 156 313 156 336 168 336 168 360 180 360 180 384 192 384 192 396 204 396 204 420 192 420 192 432 156 432 156 444 96 444 84 444 84 432 48 432 48 420 12 420 12 456 24 456 24 468 36 468 36 480 48 480 60 480 60 492 84 492 96 492 96 504 156 504 168 504 168 492 228 492 228 480 252 480 252 468 276 468 276 456 288 456 288 432 300 432 300 396 312 396 312 372 324 372 324 360 336 360 336 348 348 348 348 336 360 336 360 324 372 324 372 312 396 312 396 300 420 300 420 288 492 288 492 276 528 276 528 264 540 264 540 252 552 252 552 228 564 228 564 192" />
                    <g className="highlights">
                        <rect className="cls-2" x="204" y="480" width="24" height="12" />
                        <polygon className="cls-2" points="276 432 276 444 264 444 264 456 240 456 240 468 228 468 228 480 252 480 252 468 276 468 276 456 288 456 288 444 288 432 276 432" />
                        <rect className="cls-2" x="276" y="360" width="12" height="12" />
                        <rect className="cls-2" x="180" y="468" width="12" height="12" />
                        <rect className="cls-2" x="240" y="240" width="12" height="12" />
                        <rect className="cls-2" x="300" y="276" width="12" height="12" />
                        <rect className="cls-2" x="288" y="396" width="12" height="36" />
                        <rect className="cls-2" x="408" y="204" width="12" height="12" />
                        <polygon className="cls-2" points="420 276 420 264 396 264 396 252 408 252 408 216 396 216 396 228 384 228 384 240 372 240 372 252 336 252 336 240 300 240 300 228 288 228 288 204 276 204 276 192 276 180 276 168 288 168 288 156 276 156 276 144 288 144 288 132 300 132 300 144 288 144 288 156 312 156 312 144 336 144 336 132 324 132 324 120 312 120 312 108 288 108 288 96 204 96 204 108 216 108 216 120 204 120 204 132 192 132 192 120 204 120 204 108 168 108 168 120 144 120 144 132 144 144 132 144 132 156 108 156 108 168 120 168 120 180 156 180 156 168 180 168 180 156 156 156 156 144 168 144 168 132 180 132 180 144 180 156 240 156 240 168 240 180 240 192 252 192 252 204 264 204 264 240 276 240 276 252 288 252 288 264 312 264 312 276 348 276 348 288 360 288 360 300 348 300 348 312 336 312 336 324 324 324 324 336 312 336 312 360 300 360 300 396 312 396 312 372 324 372 324 360 336 360 336 348 348 348 348 336 360 336 360 324 372 324 372 312 396 312 396 300 420 300 420 288 432 288 432 276 420 276" />
                        <polygon className="cls-3" points="120 240 120 228 96 228 96 216 72 216 72 204 36 204 36 216 24 216 24 228 84 228 84 240 108 240 108 252 132 252 132 240 120 240" />
                        <rect className="cls-3" x="132" y="252" width="12" height="12" />
                        <rect className="cls-3" x="156" y="276" width="12" height="12" />
                        <rect className="cls-3" x="144" y="264" width="12" height="12" />
                        <rect className="cls-3" x="168" y="287" width="12" height="24" />
                    </g>
                    <g className="feeler">
                        <rect className="cls-3" x="108" y="132" width="24" height="12" />
                        <rect className="cls-3" x="84" y="120" width="24" height="12" />
                        <rect className="cls-3" x="24" width="24" height="12" />
                        <rect className="cls-3" x="72" y="108" width="12" height="12" />
                        <rect className="cls-3" x="24" y="36" width="12" height="12" />
                        <rect className="cls-3" x="60" y="84" width="12" height="24" />
                        <rect className="cls-3" x="48" y="60" width="12" height="24" />
                        <rect className="cls-3" x="36" y="36" width="12" height="24" />
                        <rect className="cls-3" x="48" y="12" width="12" height="24" />
                        <rect className="cls-3" x="12" y="12" width="12" height="24" />
                        <rect className="cls-4" x="24" y="12" width="24" height="24" />
                    </g>
                    <g className="mouth">
                        <rect x="37" y="264" width="12" height="48" />
                        <rect x="49" y="312" width="12" height="36" />
                        <rect x="61" y="348" width="12" height="72" />
                        <polygon className="inner-mouth" className="cls-5"
                            points="180 396 180 384 168 384 168 360 156 360 156 336 144 336 144 312 132 312 132 300 120 300 120 288 108 288 108 276 96 276 96 264 72 264 72 252 49 252 49 312 61 312 61 348 72 348 73 348 73 420 84 420 84 432 108 432 120 432 132 432 144 432 156 432 156 420 168 420 180 420 192 420 192 396 180 396" />
                    </g>
                    <g className="eye">
                        <rect x="228" y="156" width="12" height="36" />
                        <rect x="216" y="144" width="12" height="12" />
                        <rect x="204" y="156" width="12" height="12" />
                        <rect x="180" y="180" width="12" height="12" />
                        <rect x="180" y="168" width="24" height="12" />
                        <rect x="192" y="192" width="36" height="12" />
                        <polygon className="cls-6" points="216 156 216 168 204 168 204 180 192 180 192 192 228 192 228 180 228 168 228 156 216 156" />
                        <rect className="cls-7" x="204" y="168" width="12" height="12" />
                    </g>
                    <g className="fin-front">
                        <polygon className="cls-8" points="420 120 384 120 384 132 372 132 360 132 360 144 336 144 336 156 324 156 324 168 360 168 360 180 348 180 348 192 348 204 360 204 360 216 324 216 324 228 336 228 336 240 372 240 372 228 384 228 384 216 396 216 396 204 396 192 396 180 408 180 408 144 420 144 420 120" />
                        <rect className="cls-9" x="396" y="132" width="24" height="12" />
                        <rect className="cls-9" x="372" y="144" width="24" height="12" />
                        <rect className="cls-9" x="348" y="156" width="24" height="12" />
                        <rect className="cls-9" x="348" y="192" width="48" height="12" />
                        <rect className="cls-9" x="348" y="228" width="24" height="12" />
                        <rect className="cls-9" x="336" y="216" width="12" height="12" />
                    </g>
                    <g className="fin-back">
                        <polygon className="cls-8" points="552 192 552 168 540 168 540 156 528 156 528 144 468 144 468 156 456 156 456 168 432 168 432 192 444 192 444 216 468 216 468 228 444 228 444 252 456 252 456 264 468 264 468 276 456 276 456 288 492 288 492 276 528 276 528 264 540 264 540 252 552 252 552 228 564 228 564 216 564 192 552 192" />
                        <rect className="cls-9" x="516" y="156" width="24" height="12" />
                        <rect className="cls-9" x="492" y="168" width="24" height="12" />
                        <rect className="cls-9" x="468" y="216" width="36" height="12" />
                        <rect className="cls-9" x="504" y="264" width="24" height="12" />
                        <rect className="cls-9" x="456" y="252" width="48" height="12" />
                        <rect className="cls-9" x="468" y="180" width="24" height="12" />
                        <rect className="cls-9" x="444" y="192" width="24" height="12" />
                        <rect className="cls-9" x="504" y="204" width="60" height="12" />
                    </g>
                    <g className="teeth">
                        <rect className="cls-10" x="84" y="264" width="12" height="48" />
                        <rect className="cls-10" x="120" y="300" width="12" height="48" />
                        <rect className="cls-10" x="144" y="336" width="12" height="48" />
                        <rect className="cls-10" x="156" y="396" width="12" height="24" />
                        <rect className="cls-10" x="73" y="372" width="11" height="48" />
                        <rect className="cls-10" x="37" y="384" width="11" height="24" />
                        <rect className="cls-10" x="26" y="324" width="11" height="24" />
                        <rect className="cls-10" x="37" y="360" width="12" height="12" />
                        <rect className="cls-10" x="12" y="396" width="11" height="12" />
                        <rect className="cls-10" x="49" y="348" width="12" height="12" />
                        <rect className="cls-10" x="37" y="312" width="12" height="12" />
                        <rect className="cls-10" x="14" y="276" width="11" height="24" />
                        <rect className="cls-10" x="1" y="372" width="11" height="24" />
                        <rect className="cls-10" x="25" y="264" width="12" height="12" />
                        <rect className="cls-10" x="96" y="396" width="11" height="36" />
                        <rect className="cls-10" x="119" y="408" width="11" height="24" />
                        <rect className="cls-10" x="49" y="252" width="12" height="36" />
                    </g>
                </g>
            )
        }

        return false;
    }

    renderContent() {
        return (
            <svg className={`angler-fish${this.props.shadow ? ' angler-fish--shadow' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 516">
                <g className="outline">
                    <polygon points="564 192 564 168 552 168 552 156 540 156 540 144 528 144 528 132 468 132 468 144 456 144 456 156 432 156 432 168 420 168 420 144 432 144 432 120 420 120 420 108 384 108 384 120 360 120 360 132 336 132 336 120 324 120 324 108 312 108 312 96 288 96 288 84 204 84 204 96 168 96 168 108 144 108 144 120 132 120 132 144 108 144 108 156 96 156 96 168 84 168 84 180 72 180 72 192 36 192 36 204 24 204 24 216 12 216 12 252 24 252 25 252 25 264 25 276 37 276 37 312 37 324 49 324 49 348 49 360 61 360 61 420 48 420 48 408 48 384 37 384 37 408 23 408 23 396 12 396 12 408 12 420 0 420 0 456 12 456 12 468 24 468 24 480 36 480 36 492 60 492 60 504 96 504 96 516 168 516 168 504 228 504 228 492 252 492 252 480 276 480 276 468 288 468 288 456 300 456 300 432 312 432 312 396 324 396 324 372 336 372 336 360 348 360 348 348 360 348 360 336 372 336 372 324 396 324 396 312 420 312 420 300 492 300 492 288 528 288 528 276 540 276 540 264 552 264 552 252 564 252 564 228 576 228 576 192 564 192" />
                    <rect x="26" y="324" width="11" height="24" />
                    <rect x="37" y="360" width="12" height="12" />
                    <rect x="14" y="276" width="11" height="24" />
                    <rect x="1" y="372" width="11" height="24" />
                </g>
                {this.fishBody}
            </svg>
        );
    }

}
