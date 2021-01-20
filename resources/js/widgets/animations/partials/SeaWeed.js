import React from "react";
import Animation from "widgets/animations/Animation";
import {inject} from "@morningtrain/react-decorators";

@inject(['director'])
export default class SeaWeed extends Animation {

    static get defaultProps() {
        return {
            ...super.defaultProps,
            direction: 'left',
            type: 0,
            darken: 0
        };
    }

    get transitionsProps() {
        return {};
    }

    get classNames() {
        return 'seaweed-';
    }

    get width() {
        return this.scaleWidth(100) + '%';
    }

    get seaweedType0() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 290" className="seaweed seaweed--type0">
                <g>
                    <polygon className="cls-1" points="250 130 250 140 210 140 210 150 200 150 200 160 190 160 190 170 180 170 180 180 170 180 170 170 160 170 160 160 160 150 180 150 180 140 190 140 190 130 200 130 200 120 210 120 210 110 210 100 220 100 220 90 230 90 230 80 240 80 240 70 250 70 250 60 270 60 270 50 250 50 250 40 230 40 230 50 210 50 210 60 200 60 200 70 190 70 190 80 180 80 180 90 180 100 170 100 170 90 170 80 160 80 160 70 160 60 150 60 150 30 160 30 160 20 160 10 140 10 140 20 130 20 130 30 120 30 120 60 120 70 130 70 130 80 130 90 140 90 140 100 140 110 130 110 130 100 110 100 110 90 80 90 80 100 100 100 100 110 110 110 110 120 120 120 120 130 120 140 110 140 110 130 101 130 101 120 90 120 90 110 70 110 70 100 60 100 60 90 50 90 50 80 50 70 40 70 40 60 40 50 40 40 40 30 30 30 30 40 30 50 20 50 20 60 20 70 20 80 30 80 30 90 30 100 40 100 40 110 50 110 50 120 60 120 61 120 61 130 70 130 70 140 80 140 80 150 80 160 90 160 90 170 90 180 80 180 80 190 70 190 70 180 60 180 60 170 50 170 50 160 20 160 20 170 40 170 40 180 40 190 50 190 50 210 40 210 40 250 50 250 50 270 60 270 60 280 60 290 220 290 220 280 230 280 230 270 230 220 220 220 220 190 220 180 230 180 230 170 260 170 260 160 270 160 270 150 280 150 280 140 280 130 250 130" />
                    <rect className="cls-1" x="160" width="10" height="10" />
                    <rect className="cls-1" y="150" width="20" height="10" />
                </g>
                <rect className="cls-2" x="50" y="100" width="10" height="10" />
                <rect className="cls-2" x="230" y="60" width="10" height="10" />
                <rect className="cls-2" x="170" y="190" width="10" height="10" />
                <rect className="cls-2" x="180" y="180" width="10" height="10" />
                <rect className="cls-2" x="190" y="170" width="10" height="10" />
                <rect className="cls-2" x="200" y="160" width="10" height="10" />
                <rect className="cls-2" x="250" y="140" width="19" height="10" />
                <rect className="cls-2" x="210" y="150" width="40" height="10" />
                <rect className="cls-2" x="160" y="180" width="10" height="10" />
                <rect className="cls-2" x="150" y="170" width="10" height="10" />
                <rect className="cls-2" x="110" y="170" width="10" height="10" />
                <rect className="cls-2" x="100" y="180" width="10" height="10" />
                <rect className="cls-2" x="120" y="160" width="10" height="10" />
                <rect className="cls-2" x="140" y="150" width="10" height="10" />
                <rect className="cls-2" x="200" y="90" width="10" height="10" />
                <rect className="cls-2" x="170" y="130" width="10" height="10" />
                <rect className="cls-2" x="180" y="110" width="20" height="10" />
                <rect className="cls-2" x="170" y="120" width="20" height="10" />
                <rect className="cls-2" x="190" y="100" width="10" height="10" />
                <rect className="cls-2" x="210" y="70" width="20" height="10" />
                <rect className="cls-2" x="200" y="80" width="20" height="10" />
                <rect className="cls-2" x="60" y="110" width="10" height="10" />
                <rect className="cls-2" x="70" y="120" width="10" height="10" />
                <rect className="cls-3" x="80" y="120" width="10" height="10" />
                <rect className="cls-3" x="90" y="130" width="10" height="10" />
                <rect className="cls-3" x="210" y="160" width="20" height="10" />
                <rect className="cls-3" x="200" y="170" width="20" height="10" />
                <rect className="cls-3" x="190" y="180" width="20" height="20" />
                <rect className="cls-3" x="250" y="150" width="10" height="10" />
                <rect className="cls-3" x="70" y="270" width="10" height="10" />
                <rect className="cls-3" x="200" y="200" width="10" height="60" />
                <rect className="cls-3" x="160" y="220" width="10" height="30" />
                <rect className="cls-3" x="150" y="200" width="10" height="80" />
                <rect className="cls-3" x="140" y="190" width="10" height="70" />
                <rect className="cls-3" x="130" y="180" width="10" height="70" />
                <rect className="cls-3" x="120" y="180" width="10" height="50" />
                <rect className="cls-3" x="210" y="220" width="10" height="60" />
                <rect className="cls-3" x="60" y="210" width="10" height="60" />
                <rect className="cls-2" x="80" y="130" width="10" height="10" />
                <rect className="cls-2" x="50" y="180" width="10" height="10" />
                <rect className="cls-2" x="90" y="140" width="10" height="20" />
                <rect className="cls-2" x="60" y="190" width="10" height="20" />
                <rect className="cls-2" x="50" y="210" width="10" height="40" />
                <rect className="cls-2" x="140" y="60" width="10" height="10" />
                <rect className="cls-2" x="150" y="80" width="10" height="70" />
                <rect className="cls-4" x="140" y="20" width="10" height="10" />
                <rect className="cls-4" x="120" y="110" width="10" height="10" />
                <rect className="cls-4" x="150" y="180" width="10" height="10" />
                <rect className="cls-4" x="90" y="180" width="10" height="10" />
                <rect className="cls-4" x="80" y="190" width="10" height="80" />
                <rect className="cls-4" x="100" y="170" width="10" height="10" />
                <rect className="cls-4" x="110" y="160" width="10" height="10" />
                <rect className="cls-4" x="90" y="270" width="10" height="10" />
                <rect className="cls-4" x="160" y="190" width="10" height="10" />
                <rect className="cls-4" x="170" y="200" width="10" height="20" />
                <rect className="cls-4" x="180" y="220" width="10" height="30" />
                <rect className="cls-4" x="170" y="250" width="10" height="30" />
                <rect className="cls-2" x="180" y="250" width="10" height="30" />
                <rect className="cls-2" x="190" y="260" width="10" height="20" />
                <rect className="cls-2" x="140" y="260" width="10" height="20" />
                <rect className="cls-2" x="120" y="260" width="10" height="20" />
                <rect className="cls-2" x="110" y="250" width="10" height="30" />
                <rect className="cls-2" x="130" y="250" width="10" height="10" />
                <rect className="cls-2" x="120" y="230" width="10" height="20" />
                <rect className="cls-2" x="110" y="190" width="10" height="40" />
                <rect className="cls-2" x="100" y="230" width="10" height="50" />
                <rect className="cls-2" x="90" y="190" width="10" height="80" />
                <rect className="cls-2" x="180" y="200" width="10" height="20" />
                <rect className="cls-4" x="130" y="120" width="10" height="40" />
                <rect className="cls-4" x="140" y="160" width="10" height="20" />
                <rect className="cls-4" x="200" y="70" width="10" height="10" />
                <rect className="cls-4" x="180" y="100" width="10" height="10" />
                <rect className="cls-4" x="170" y="110" width="10" height="10" />
                <rect className="cls-4" x="190" y="80" width="10" height="20" />
                <rect className="cls-4" x="230" y="50" width="20" height="10" />
                <rect className="cls-4" x="210" y="60" width="20" height="10" />
                <rect className="cls-4" x="140" y="70" width="10" height="20" />
                <rect className="cls-4" x="130" y="30" width="10" height="40" />
                <g style={{opacity: this.props.darken}}>
                    <polygon points="250 130 250 140 210 140 210 150 200 150 200 160 190 160 190 170 180 170 180 180 170 180 170 170 160 170 160 160 160 150 180 150 180 140 190 140 190 130 200 130 200 120 210 120 210 110 210 100 220 100 220 90 230 90 230 80 240 80 240 70 250 70 250 60 270 60 270 50 250 50 250 40 230 40 230 50 210 50 210 60 200 60 200 70 190 70 190 80 180 80 180 90 180 100 170 100 170 90 170 80 160 80 160 70 160 60 150 60 150 30 160 30 160 20 160 10 140 10 140 20 130 20 130 30 120 30 120 60 120 70 130 70 130 80 130 90 140 90 140 100 140 110 130 110 130 100 110 100 110 90 80 90 80 100 100 100 100 110 110 110 110 120 120 120 120 130 120 140 110 140 110 130 101 130 101 120 90 120 90 110 70 110 70 100 60 100 60 90 50 90 50 80 50 70 40 70 40 60 40 50 40 40 40 30 30 30 30 40 30 50 20 50 20 60 20 70 20 80 30 80 30 90 30 100 40 100 40 110 50 110 50 120 60 120 61 120 61 130 70 130 70 140 80 140 80 150 80 160 90 160 90 170 90 180 80 180 80 190 70 190 70 180 60 180 60 170 50 170 50 160 20 160 20 170 40 170 40 180 40 190 50 190 50 210 40 210 40 250 50 250 50 270 60 270 60 280 60 290 220 290 220 280 230 280 230 270 230 220 220 220 220 190 220 180 230 180 230 170 260 170 260 160 270 160 270 150 280 150 280 140 280 130 250 130" />
                    <rect x="160" width="10" height="10" />
                    <rect y="150" width="20" height="10" />
                </g>
            </svg>
        )
    }

    get seaweedType1() {
        return(
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 280" className="seaweed seaweed--type1">
                <g className="type1">
                    <g className="bg">
                        <polygon className="cls-1" points="270 120 270 110 260 110 260 100 260 90 250 90 250 80 250 70 240 70 240 60 230 60 230 70 220 70 220 120 230 120 230 150 220 150 220 140 210 140 210 130 200 130 200 160 210 160 210 170 200 170 200 180 190 180 190 190 180 190 180 200 180 210 170 210 170 250 180 250 180 260 190 260 190 270 200 270 200 280 210 280 220 280 220 270 220 260 210 260 210 250 200 250 200 240 210 240 210 230 230 230 230 220 240 220 240 210 240 200 240 190 250 190 250 200 270 200 270 190 280 190 280 180 280 170 270 170 270 160 270 150 280 150 280 140 280 130 280 120 270 120" />
                        <polygon className="cls-1" points="170 180 170 170 160 170 160 160 160 150 160 140 170 140 170 130 180 130 180 120 190 120 190 110 190 100 180 100 180 90 170 90 170 80 160 80 160 70 170 70 170 60 170 50 160 50 160 40 140 40 140 50 130 50 130 40 130 30 140 30 140 20 140 10 140 0 120 0 120 10 110 10 110 20 100 20 100 30 90 30 90 40 80 40 80 50 70 50 70 60 70 70 80 70 80 80 90 80 90 90 80 90 80 100 70 100 70 110 60 110 60 120 70 120 70 130 80 130 80 140 100 140 100 150 110 150 110 160 100 160 100 170 90 170 90 180 80 180 80 190 80 200 90 200 90 210 80 210 80 220 80 230 90 230 90 240 100 240 100 250 120 250 120 260 130 260 130 270 140 270 140 280 150 280 160 280 160 270 150 270 150 260 150 250 140 250 140 240 130 240 130 230 140 230 140 220 140 210 150 210 150 200 160 200 160 190 170 190 170 180" />
                        <polygon className="cls-1" points="60 140 60 130 50 130 50 120 50 110 40 110 40 100 40 90 40 80 30 80 30 70 20 70 20 80 10 80 10 110 20 110 20 130 30 130 30 140 30 170 20 170 20 180 10 180 10 190 10 200 20 200 20 210 10 210 10 220 0 220 0 230 0 240 10 240 10 250 20 250 20 260 30 260 30 270 40 270 50 270 50 280 60 280 70 280 70 270 70 260 60 260 60 250 60 240 70 240 70 230 70 220 70 210 60 210 60 200 60 190 60 180 70 180 70 170 70 160 70 150 60 150 60 140" />
                    </g>
                    <g className="right">
                        <rect className="cls-2" x="190" y="250" width="10" height="10" />
                        <rect className="cls-2" x="190" y="210" width="10" height="10" />
                        <rect className="cls-2" x="200" y="200" width="10" height="10" />
                        <rect className="cls-2" x="210" y="190" width="10" height="10" />
                        <rect className="cls-2" x="220" y="180" width="10" height="10" />
                        <rect className="cls-2" x="230" y="170" width="10" height="10" />
                        <rect className="cls-2" x="240" y="160" width="10" height="10" />
                        <rect className="cls-2" x="250" y="130" width="10" height="30" />
                        <rect className="cls-2" x="240" y="110" width="10" height="20" />
                        <rect className="cls-2" x="230" y="70" width="10" height="40" />
                        <rect className="cls-2" x="180" y="220" width="10" height="30" />
                        <rect className="cls-2" x="200" y="260" width="10" height="10" />
                        <rect className="cls-2" x="210" y="270" width="10" height="10" />
                        <rect className="cls-3" x="200" y="250" width="10" height="10" />
                        <rect className="cls-3" x="190" y="230" width="20" height="10" />
                        <rect className="cls-3" x="200" y="210" width="40" height="10" />
                        <rect className="cls-3" x="220" y="190" width="20" height="10" />
                        <rect className="cls-3" x="250" y="190" width="20" height="10" />
                        <rect className="cls-3" x="200" y="180" width="20" height="10" />
                        <rect className="cls-3" x="220" y="160" width="20" height="10" />
                        <rect className="cls-3" x="240" y="170" width="40" height="10" />
                        <rect className="cls-3" x="260" y="130" width="20" height="10" />
                        <rect className="cls-3" x="250" y="110" width="20" height="10" />
                        <rect className="cls-3" x="240" y="90" width="20" height="10" />
                        <rect className="cls-3" x="240" y="140" width="10" height="10" />
                        <rect className="cls-3" x="230" y="110" width="10" height="10" />
                        <rect className="cls-3" x="260" y="150" width="10" height="10" />
                        <rect className="cls-3" x="210" y="150" width="10" height="10" />
                        <rect className="cls-3" x="190" y="200" width="10" height="10" />
                        <rect className="cls-3" x="180" y="210" width="10" height="10" />
                        <rect className="cls-3" x="210" y="260" width="10" height="10" />
                    </g>
                    <g className="mid">
                        <rect className="cls-3" x="110" y="50" width="60" height="10" />
                        <rect className="cls-3" x="120" y="70" width="40" height="10" />
                        <rect className="cls-3" x="140" y="90" width="40" height="10" />
                        <rect className="cls-3" x="160" y="110" width="30" height="10" />
                        <rect className="cls-3" x="80" y="120" width="70" height="10" />
                        <rect className="cls-3" x="80" y="100" width="60" height="10" />
                        <rect className="cls-2" x="110" y="20" width="10" height="10" />
                        <rect className="cls-2" x="110" y="70" width="10" height="10" />
                        <rect className="cls-2" x="120" y="80" width="10" height="10" />
                        <rect className="cls-2" x="130" y="90" width="10" height="10" />
                        <rect className="cls-2" x="140" y="100" width="10" height="10" />
                        <rect className="cls-2" x="140" y="130" width="10" height="10" />
                        <rect className="cls-2" x="120" y="240" width="10" height="10" />
                        <rect className="cls-2" x="130" y="250" width="10" height="10" />
                        <rect className="cls-2" x="140" y="260" width="10" height="10" />
                        <rect className="cls-2" x="150" y="270" width="10" height="10" />
                        <rect className="cls-2" x="150" y="110" width="10" height="20" />
                        <rect className="cls-2" x="130" y="140" width="10" height="20" />
                        <rect className="cls-2" x="120" y="160" width="10" height="20" />
                        <rect className="cls-2" x="110" y="180" width="10" height="60" />
                        <rect className="cls-2" x="100" y="30" width="10" height="40" />
                        <rect className="cls-2" x="120" y="10" width="10" height="10" />
                        <rect className="cls-3" x="130" y="10" width="10" height="10" />
                        <rect className="cls-3" x="90" y="40" width="10" height="10" />
                        <rect className="cls-3" x="110" y="30" width="20" height="10" />
                        <rect className="cls-3" x="80" y="60" width="20" height="10" />
                        <rect className="cls-3" x="100" y="80" width="20" height="10" />
                        <rect className="cls-3" x="150" y="130" width="20" height="10" />
                        <rect className="cls-3" x="140" y="150" width="20" height="10" />
                        <rect className="cls-3" x="120" y="210" width="20" height="10" />
                        <rect className="cls-3" x="90" y="210" width="20" height="10" />
                        <rect className="cls-3" x="90" y="190" width="20" height="10" />
                        <rect className="cls-3" x="100" y="170" width="20" height="10" />
                        <rect className="cls-3" x="110" y="160" width="10" height="10" />
                        <rect className="cls-3" x="100" y="230" width="10" height="10" />
                        <rect className="cls-3" x="120" y="230" width="10" height="10" />
                        <rect className="cls-3" x="130" y="240" width="10" height="10" />
                        <rect className="cls-3" x="140" y="250" width="10" height="10" />
                        <rect className="cls-3" x="130" y="170" width="40" height="10" />
                        <rect className="cls-3" x="120" y="190" width="40" height="10" />
                        <rect className="cls-3" x="110" y="140" width="20" height="10" />
                    </g>
                    <g className="left">
                        <rect className="cls-3" x="40" y="260" width="10" height="10" />
                        <rect className="cls-3" x="30" y="250" width="10" height="10" />
                        <rect className="cls-3" x="20" y="240" width="10" height="10" />
                        <rect className="cls-3" x="40" y="160" width="10" height="10" />
                        <rect className="cls-3" x="60" y="150" width="10" height="10" />
                        <rect className="cls-3" x="50" y="130" width="10" height="10" />
                        <rect className="cls-3" x="30" y="130" width="10" height="10" />
                        <rect className="cls-3" x="40" y="110" width="10" height="10" />
                        <rect className="cls-3" x="30" y="90" width="10" height="10" />
                        <rect className="cls-3" x="20" y="70" width="10" height="10" />
                        <rect className="cls-3" x="50" y="170" width="20" height="10" />
                        <rect className="cls-3" x="20" y="200" width="10" height="10" />
                        <rect className="cls-3" x="50" y="270" width="10" height="10" />
                        <rect className="cls-2" x="40" y="250" width="10" height="10" />
                        <rect className="cls-2" x="40" y="170" width="10" height="20" />
                        <rect className="cls-2" x="50" y="150" width="10" height="20" />
                        <rect className="cls-2" x="40" y="130" width="10" height="20" />
                        <rect className="cls-2" x="30" y="110" width="10" height="20" />
                        <rect className="cls-2" x="20" y="80" width="10" height="30" />
                        <rect className="cls-2" x="30" y="190" width="10" height="60" />
                        <rect className="cls-2" x="50" y="260" width="10" height="10" />
                        <rect className="cls-2" x="60" y="270" width="10" height="10" />
                        <rect className="cls-3" x="50" y="250" width="10" height="10" />
                        <rect className="cls-3" x="40" y="230" width="30" height="10" />
                        <rect className="cls-3" x="40" y="210" width="30" height="10" />
                        <rect className="cls-3" x="10" y="220" width="20" height="10" />
                        <rect className="cls-3" x="20" y="180" width="20" height="10" />
                        <rect className="cls-3" x="40" y="190" width="20" height="10" />
                        <rect className="cls-3" x="60" y="260" width="10" height="10" />
                    </g>
                    <g style={{opacity: this.props.darken}}>
                        <polygon points="270 120 270 110 260 110 260 100 260 90 250 90 250 80 250 70 240 70 240 60 230 60 230 70 220 70 220 120 230 120 230 150 220 150 220 140 210 140 210 130 200 130 200 160 210 160 210 170 200 170 200 180 190 180 190 190 180 190 180 200 180 210 170 210 170 250 180 250 180 260 190 260 190 270 200 270 200 280 210 280 220 280 220 270 220 260 210 260 210 250 200 250 200 240 210 240 210 230 230 230 230 220 240 220 240 210 240 200 240 190 250 190 250 200 270 200 270 190 280 190 280 180 280 170 270 170 270 160 270 150 280 150 280 140 280 130 280 120 270 120" />
                        <polygon points="170 180 170 170 160 170 160 160 160 150 160 140 170 140 170 130 180 130 180 120 190 120 190 110 190 100 180 100 180 90 170 90 170 80 160 80 160 70 170 70 170 60 170 50 160 50 160 40 140 40 140 50 130 50 130 40 130 30 140 30 140 20 140 10 140 0 120 0 120 10 110 10 110 20 100 20 100 30 90 30 90 40 80 40 80 50 70 50 70 60 70 70 80 70 80 80 90 80 90 90 80 90 80 100 70 100 70 110 60 110 60 120 70 120 70 130 80 130 80 140 100 140 100 150 110 150 110 160 100 160 100 170 90 170 90 180 80 180 80 190 80 200 90 200 90 210 80 210 80 220 80 230 90 230 90 240 100 240 100 250 120 250 120 260 130 260 130 270 140 270 140 280 150 280 160 280 160 270 150 270 150 260 150 250 140 250 140 240 130 240 130 230 140 230 140 220 140 210 150 210 150 200 160 200 160 190 170 190 170 180" />
                        <polygon points="60 140 60 130 50 130 50 120 50 110 40 110 40 100 40 90 40 80 30 80 30 70 20 70 20 80 10 80 10 110 20 110 20 130 30 130 30 140 30 170 20 170 20 180 10 180 10 190 10 200 20 200 20 210 10 210 10 220 0 220 0 230 0 240 10 240 10 250 20 250 20 260 30 260 30 270 40 270 50 270 50 280 60 280 70 280 70 270 70 260 60 260 60 250 60 240 70 240 70 230 70 220 70 210 60 210 60 200 60 190 60 180 70 180 70 170 70 160 70 150 60 150 60 140" />
                    </g>
                </g>
            </svg>
        )
    }

    get seaweedType2() {
        return(
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 249 280" className="seaweed seaweed--type2">
                <g className="bg">
                    <rect className="cls-1" x="50" width="10" height="10" />
                    <polygon className="cls-1" points="140 220 130 220 130 210 110 210 110 220 120 220 120 230 120 240 100 240 100 250 110 250 110 260 120 260 120 270 130 270 130 280 140 280 140 270 160 270 160 260 140 260 140 250 130 250 130 240 150 240 150 250 170 250 170 260 190 260 190 250 180 250 180 240 170 240 170 230 140 230 140 220" />
                    <polygon className="cls-1" points="100 250 70 250 70 260 60 260 60 250 50 250 50 260 40 260 40 250 20 250 10 250 10 260 0 260 0 270 20 270 20 280 40 280 50 280 50 270 60 270 60 280 70 280 70 270 80 270 80 280 110 280 110 270 110 260 100 260 100 250" />
                    <rect className="cls-1" x="180" y="90" width="10" height="10" />
                    <rect className="cls-1" x="190" y="70" width="10" height="10" />
                    <rect className="cls-1" x="230" y="70" width="10" height="10" />
                    <polygon className="cls-1" points="239 90 239 100 220 100 220 90 230 90 230 80 220 80 220 60 210 60 210 80 200 80 200 90 210 90 210 100 190 100 190 110 210 110 210 120 200 120 200 130 190 130 190 120 180 120 180 110 170 110 170 120 170 130 180 130 180 140 190 140 190 150 170 150 170 140 160 140 160 130 150 130 150 140 150 150 160 150 160 160 170 160 170 170 170 180 160 180 160 170 150 170 150 160 140 160 140 170 140 180 150 180 150 190 160 190 160 200 140 200 140 190 130 190 130 180 120 180 110 180 80 180 80 170 90 170 90 160 100 160 130 160 130 150 120 150 120 140 100 140 100 120 110 120 110 130 130 130 130 120 140 120 140 110 110 110 110 100 110 90 120 90 120 80 140 80 140 70 130 70 130 60 110 60 110 70 100 70 100 50 110 50 110 40 120 40 120 30 120 20 100 20 100 30 90 30 90 40 80 40 80 10 80 0 70 0 70 10 60 10 60 20 70 20 70 30 40 30 40 40 50 40 50 50 90 50 90 60 70 60 70 70 60 70 60 80 90 80 90 90 100 90 100 100 90 100 80 100 80 90 70 90 60 90 60 100 70 100 70 110 80 110 80 120 90 120 90 140 80 140 80 130 70 130 70 120 60 120 50 120 50 130 50 140 60 140 60 150 70 150 70 160 70 170 70 180 60 180 60 170 50 170 50 160 40 160 40 150 30 150 20 150 20 160 20 170 30 170 30 180 40 180 40 190 60 190 60 200 60 210 50 210 50 220 40 220 40 210 30 210 30 200 20 200 10 200 10 210 0 210 0 220 10 220 10 230 20 230 20 240 30 240 40 240 40 250 50 250 50 240 100 240 100 230 110 230 110 220 90 220 90 210 70 210 70 200 110 200 110 190 120 190 120 200 130 200 130 210 140 210 140 220 170 220 170 230 200 230 200 220 190 220 190 210 170 210 170 190 180 190 180 200 200 200 200 210 220 210 220 200 210 200 210 190 190 190 190 180 180 180 180 170 200 170 200 180 220 180 220 170 210 170 210 160 200 160 200 150 230 150 230 140 210 140 210 130 240 130 240 120 220 120 220 110 240 110 240 100 249 100 249 90 239 90" />
                </g>
                <g className="highlights">
                    <rect className="cls-2" x="60" y="90" width="10" height="10" />
                    <rect className="cls-2" x="90" y="30" width="10" height="10" />
                    <rect className="cls-2" x="70" width="10" height="10" />
                    <rect className="cls-2" x="60" y="10" width="10" height="10" />
                    <rect className="cls-2" x="50" width="10" height="10" />
                    <rect className="cls-2" x="130" y="220" width="10" height="10" />
                    <rect className="cls-2" x="160" y="180" width="10" height="10" />
                    <rect className="cls-2" x="160" y="140" width="10" height="10" />
                    <rect className="cls-2" x="190" y="130" width="10" height="10" />
                    <rect className="cls-2" x="180" y="120" width="10" height="10" />
                    <rect className="cls-2" x="170" y="110" width="10" height="10" />
                    <rect className="cls-2" x="150" y="130" width="10" height="10" />
                    <rect className="cls-2" x="150" y="170" width="10" height="10" />
                    <rect className="cls-2" x="140" y="160" width="10" height="10" />
                    <rect className="cls-2" x="120" y="180" width="10" height="10" />
                    <rect className="cls-2" x="130" y="190" width="10" height="10" />
                    <rect className="cls-2" x="140" y="200" width="20" height="10" />
                    <rect className="cls-2" x="100" y="140" width="20" height="10" />
                    <rect className="cls-2" x="110" y="60" width="20" height="10" />
                    <rect className="cls-2" x="100" y="20" width="20" height="10" />
                    <rect className="cls-2" x="40" y="30" width="30" height="10" />
                    <rect className="cls-2" x="70" y="60" width="20" height="10" />
                    <rect className="cls-2" x="170" y="150" width="20" height="10" />
                    <rect className="cls-2" x="80" y="180" width="30" height="10" />
                    <rect className="cls-2" x="110" y="210" width="20" height="10" />
                    <rect className="cls-2" x="70" y="250" width="30" height="20" />
                    <rect className="cls-2" x="200" y="80" width="10" height="10" />
                    <rect className="cls-2" x="180" y="90" width="10" height="10" />
                    <rect className="cls-2" x="210" y="60" width="10" height="20" />
                    <rect className="cls-2" x="190" y="100" width="20" height="10" />
                    <rect className="cls-2" x="190" y="70" width="10" height="10" />
                    <polygon className="cls-2" points="20 250 10 250 10 260 0 260 0 270 20 270 20 280 40 280 40 260 20 260 20 250" />
                    <polygon className="cls-2" points="100 80 100 90 110 90 110 80 110 70 90 70 90 80 100 80" />
                    <polygon className="cls-2" points="80 140 70 140 70 130 60 130 60 120 50 120 50 130 50 140 60 140 60 150 70 150 70 160 100 160 100 150 80 150 80 140" />
                    <polygon className="cls-2" points="60 190 60 180 50 180 50 170 40 170 40 160 30 160 30 150 20 150 20 160 20 170 30 170 30 180 40 180 40 190 60 190" />
                    <polygon className="cls-2" points="100 250 110 250 110 260 120 260 120 250 120 240 100 240 100 250" />
                    <polygon className="cls-2" points="140 110 90 110 90 100 70 100 70 110 80 110 80 120 140 120 140 110" />
                    <polygon className="cls-2" points="30 210 20 210 20 200 10 200 10 210 0 210 0 220 10 220 10 230 20 230 20 240 30 240 30 230 40 230 40 220 30 220 30 210" />
                    <polygon className="cls-2" points="90 220 90 210 70 210 70 220 50 220 50 230 90 230 90 220" />
                </g>
                <g style={{opacity: this.props.darken}}>
                    <rect x="50" width="10" height="10" />
                    <rect x="180" y="90" width="10" height="10" />
                    <rect x="190" y="70" width="10" height="10" />
                    <rect x="230" y="70" width="10" height="10" />
                    <polygon points="140 220 130 220 130 210 110 210 110 220 120 220 120 230 120 240 100 240 100 250 110 250 110 260 120 260 120 270 130 270 130 280 140 280 140 270 160 270 160 260 140 260 140 250 130 250 130 240 150 240 150 250 170 250 170 260 190 260 190 250 180 250 180 240 170 240 170 230 140 230 140 220" />
                    <polygon points="100 250 70 250 70 260 60 260 60 250 50 250 50 260 40 260 40 250 20 250 10 250 10 260 0 260 0 270 20 270 20 280 40 280 50 280 50 270 60 270 60 280 70 280 70 270 80 270 80 280 110 280 110 270 110 260 100 260 100 250" />
                    <polygon points="239 90 239 100 220 100 220 90 230 90 230 80 220 80 220 60 210 60 210 80 200 80 200 90 210 90 210 100 190 100 190 110 210 110 210 120 200 120 200 130 190 130 190 120 180 120 180 110 170 110 170 120 170 130 180 130 180 140 190 140 190 150 170 150 170 140 160 140 160 130 150 130 150 140 150 150 160 150 160 160 170 160 170 170 170 180 160 180 160 170 150 170 150 160 140 160 140 170 140 180 150 180 150 190 160 190 160 200 140 200 140 190 130 190 130 180 120 180 110 180 80 180 80 170 90 170 90 160 100 160 130 160 130 150 120 150 120 140 100 140 100 120 110 120 110 130 130 130 130 120 140 120 140 110 110 110 110 100 110 90 120 90 120 80 140 80 140 70 130 70 130 60 110 60 110 70 100 70 100 50 110 50 110 40 120 40 120 30 120 20 100 20 100 30 90 30 90 40 80 40 80 10 80 0 70 0 70 10 60 10 60 20 70 20 70 30 40 30 40 40 50 40 50 50 90 50 90 60 70 60 70 70 60 70 60 80 90 80 90 90 100 90 100 100 90 100 80 100 80 90 70 90 60 90 60 100 70 100 70 110 80 110 80 120 90 120 90 140 80 140 80 130 70 130 70 120 60 120 50 120 50 130 50 140 60 140 60 150 70 150 70 160 70 170 70 180 60 180 60 170 50 170 50 160 40 160 40 150 30 150 20 150 20 160 20 170 30 170 30 180 40 180 40 190 60 190 60 200 60 210 50 210 50 220 40 220 40 210 30 210 30 200 20 200 10 200 10 210 0 210 0 220 10 220 10 230 20 230 20 240 30 240 40 240 40 250 50 250 50 240 100 240 100 230 110 230 110 220 90 220 90 210 70 210 70 200 110 200 110 190 120 190 120 200 130 200 130 210 140 210 140 220 170 220 170 230 200 230 200 220 190 220 190 210 170 210 170 190 180 190 180 200 200 200 200 210 220 210 220 200 210 200 210 190 190 190 190 180 180 180 180 170 200 170 200 180 220 180 220 170 210 170 210 160 200 160 200 150 230 150 230 140 210 140 210 130 240 130 240 120 220 120 220 110 240 110 240 100 249 100 249 90 239 90" />
                </g>
            </svg>
        )
    }

    get seaweed() {
        switch (this.props.type) {
            case 0:
                return this.seaweedType0;
            case 1:
                return this.seaweedType1;
            case 2:
                return this.seaweedType2;
            default:
                return this.seaweedType0
        }
    }

    renderContent() {
        return (
            <React.Fragment>
                {this.seaweed}
            </React.Fragment>
        );
    }

}
