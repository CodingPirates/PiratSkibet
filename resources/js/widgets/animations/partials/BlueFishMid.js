import React from "react";
import Animation from "widgets/animations/Animation";
import {inject} from "@morningtrain/react-decorators";

@inject(['director'])
export default class BlueFishMid extends Animation {

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
        return 'bluefish-mid-';
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
                <g className="fish-body">
                    <g className="body">
                        <polygon className="cls-1" points="150 130 150 120 140 120 140 110 120 110 120 100 110 100 110 90 90 90 90 80 60 80 60 90 70 90 70 100 60 100 60 110 60 120 60 130 60 140 60 141 70 141 70 150 90 150 90 160 110 160 110 150 130 150 130 140 160 140 160 130 150 130" />
                        <polygon className="cls-2" points="90 160 90 150 70 150 70 141 60 141 60 100 70 100 70 91 70 90 60 90 60 80 30 80 30 90 20 90 20 100 10 100 10 140 20 140 20 160 30 160 30 170 50 170 50 180 90 180 90 170 100 170 100 160 90 160" />
                        <polygon className="cls-3" points="250 150 250 140 230 140 230 130 220 130 220 120 210 120 210 110 200 110 200 100 180 100 180 90 160 90 160 80 140 80 140 70 60 70 60 80 90 80 90 90 110 90 110 100 120 100 120 110 140 110 140 120 150 120 150 130 160 130 160 140 130 140 130 150 110 150 110 160 100 160 100 170 90 170 90 180 70 180 70 190 120 190 120 200 180 200 180 190 210 190 210 180 240 180 240 170 270 170 270 160 270 150 250 150" />
                        <rect className="cls-4" x="110" y="80" width="20" height="10" />
                        <rect className="cls-4" x="140" y="90" width="20" height="10" />
                        <rect className="cls-4" x="170" y="110" width="20" height="10" />
                        <rect className="cls-4" x="190" y="130" width="20" height="10" />
                        <rect className="cls-4" x="220" y="150" width="20" height="10" />
                        <rect className="cls-4" x="180" y="170" width="20" height="10" />
                        <rect className="cls-4" x="140" y="180" width="20" height="10" />
                        <rect className="cls-4" x="120" y="160" width="20" height="10" />
                        <rect className="cls-4" x="150" y="150" width="20" height="10" />
                    </g>
                    <g className="tail">
                        <rect className="cls-2" x="400" y="30" width="10" height="10" />
                        <rect className="cls-2" x="410" y="20" width="10" height="10" />
                        <polygon className="cls-2" points="450 200 450 190 430 190 430 180 390 180 390 170 360 170 360 160 330 160 330 150 300 150 300 140 310 140 310 130 320 130 320 120 330 120 330 110 340 110 340 100 350 100 350 90 360 90 360 80 370 80 370 70 380 70 380 60 390 60 390 50 400 50 400 40 380 40 380 50 370 50 370 60 360 60 360 70 350 70 350 80 340 80 340 90 330 90 330 100 320 100 320 110 310 110 310 120 300 120 300 130 290 130 290 140 280 140 280 150 290 150 290 160 310 160 310 170 340 170 340 180 370 180 370 190 400 190 400 200 420 200 420 210 460 210 460 200 450 200" />
                        <rect className="cls-1" x="430" y="180" width="10" height="10" />
                        <rect className="cls-1" x="450" y="190" width="10" height="10" />
                        <rect className="cls-1" x="460" y="200" width="10" height="10" />
                        <rect className="cls-1" x="320" y="120" width="10" height="10" />
                        <polygon className="cls-1" points="350 50 350 60 340 60 340 70 330 70 330 80 320 80 320 90 310 90 310 100 300 100 300 110 290 110 290 120 290 130 300 130 300 120 310 120 310 110 320 110 320 100 330 100 330 90 340 90 340 80 350 80 350 70 360 70 360 60 370 60 370 50 350 50" />
                        <rect className="cls-1" x="280" y="130" width="10" height="10" />
                        <rect className="cls-1" x="330" y="110" width="10" height="10" />
                        <rect className="cls-1" x="340" y="100" width="10" height="10" />
                        <rect className="cls-1" x="350" y="90" width="10" height="10" />
                        <rect className="cls-1" x="360" y="80" width="10" height="10" />
                        <rect className="cls-1" x="370" y="70" width="10" height="10" />
                        <rect className="cls-1" x="390" y="30" width="10" height="10" />
                        <rect className="cls-1" x="380" y="60" width="10" height="10" />
                        <rect className="cls-1" x="390" y="50" width="10" height="10" />
                        <rect className="cls-1" x="400" y="40" width="10" height="10" />
                        <rect className="cls-1" x="370" y="40" width="10" height="10" />
                        <rect className="cls-1" x="410" y="30" width="10" height="10" />
                        <rect className="cls-1" x="420" y="20" width="10" height="10" />
                        <rect className="cls-1" x="430" y="10" width="10" height="10" />
                        <polygon className="cls-1" points="280 150 280 140 270 140 270 150 270 160 290 160 290 150 280 150" />
                        <rect className="cls-1" x="330" y="150" width="20" height="10" />
                        <rect className="cls-1" x="360" y="160" width="20" height="10" />
                        <rect className="cls-1" x="390" y="170" width="20" height="10" />
                        <polygon className="cls-1" points="400 200 400 190 370 190 370 180 340 180 340 170 310 170 310 160 290 160 290 170 300 170 300 180 320 180 320 190 350 190 350 200 380 200 380 210 420 210 420 200 400 200" />
                    </g>
                    <g className="fins">
                        <rect className="cls-3" x="160" y="220" width="10" height="10" />
                        <rect className="cls-3" x="220" y="200" width="10" height="10" />
                        <rect className="cls-3" x="180" y="200" width="20" height="10" />
                        <rect className="cls-3" x="200" y="210" width="20" height="10" />
                        <polygon className="cls-3" points="220 220 220 230 230 230 230 240 240 240 240 230 240 220 220 220" />
                        <rect className="cls-5" x="160" y="230" width="10" height="10" />
                        <rect className="cls-5" x="220" y="210" width="10" height="10" />
                        <polygon className="cls-5" points="210 190 210 200 200 200 200 210 220 210 220 200 220 190 210 190" />
                        <polygon className="cls-5" points="130 210 130 220 140 220 140 230 160 230 160 220 160 210 130 210" />
                        <polygon className="cls-3" points="160 240 160 230 140 230 140 240 150 240 150 250 160 250 160 260 170 260 170 270 180 270 180 260 180 250 180 240 160 240" />
                        <rect className="cls-3" x="130" y="220" width="10" height="10" />
                        <rect className="cls-3" x="120" y="210" width="10" height="10" />
                        <rect className="cls-3" x="110" y="200" width="10" height="10" />
                        <polygon className="cls-1" points="230 80 230 90 220 90 220 100 240 100 240 90 260 90 260 80 230 80" />
                        <rect className="cls-2" x="190" y="80" width="10" height="10" />
                        <polygon className="cls-2" points="200 90 200 100 210 100 210 110 220 110 220 100 220 90 200 90" />
                        <rect className="cls-1" x="180" y="80" width="10" height="10" />
                    </g>
                    <g className="eye">
                        <polygon points="70 100 60 100 60 90 40 90 40 100 30 100 30 120 40 120 40 130 60 130 60 120 70 120 70 100" />
                        <rect className="cls-6" x="40" y="100" width="20" height="20" />
                        <rect className="cls-7" x="40" y="100" width="10" height="10" />
                    </g>
                    <g className="mouth">
                        <rect className="cls-8" x="10" y="130" width="10" height="10" />
                        <rect className="cls-8" x="20" y="140" width="10" height="10" />
                        <rect className="cls-8" x="30" y="150" width="10" height="10" />
                    </g>
                </g>
            )
        }

        return false;
    }

    renderContent() {
        return (
            <svg className={`bluefish-mid${this.props.shadow ? ' bluefish-mid--shadow' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 280" style={{animationDuration: this.props.animationDuration + 's'}}>
                <polygon className="outline" points="470 200 470 190 460 190 460 180 440 180 440 170 410 170 410 160 380 160 380 150 350 150 350 140 330 140 330 130 340 130 340 120 350 120 350 110 360 110 360 100 370 100 370 90 380 90 380 80 390 80 390 70 400 70 400 60 410 60 410 50 420 50 420 40 430 40 430 30 440 30 440 20 450 20 450 10 450 0 430 0 430 10 410 10 410 20 390 20 390 30 370 30 370 40 350 40 350 50 340 50 340 60 330 60 330 70 320 70 320 80 310 80 310 90 300 90 300 100 290 100 290 110 280 110 280 130 270 130 270 140 250 140 250 130 230 130 230 120 220 120 220 110 230 110 240 110 240 100 250 100 260 100 260 90 270 90 270 70 260 70 250 70 240 70 230 70 230 80 220 80 210 80 200 80 200 70 190 70 180 70 180 80 170 80 160 80 160 70 150 70 140 70 140 60 130 60 120 60 110 60 100 60 90 60 80 60 70 60 60 60 60 70 30 70 30 80 20 80 20 90 10 90 10 100 0 100 0 140 10 140 10 150 10 160 20 160 20 170 30 170 30 180 50 180 50 190 70 190 70 200 100 200 100 210 110 210 110 220 120 220 120 230 130 230 130 240 140 240 140 250 150 250 150 260 160 260 160 270 170 270 170 280 180 280 190 280 190 240 180 240 180 220 170 220 170 210 180 210 180 220 200 220 200 230 220 230 220 240 230 240 230 250 250 250 250 240 250 220 240 220 240 200 230 200 230 190 240 190 240 180 270 180 270 170 290 170 290 180 300 180 300 190 320 190 320 200 350 200 350 210 380 210 380 220 470 220 470 210 480 210 480 200 470 200" />
                {this.fishBody}
            </svg>
        );
    }

}
