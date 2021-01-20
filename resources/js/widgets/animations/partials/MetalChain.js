import React from "react";
import Animation from "widgets/animations/Animation";
import {inject} from "@morningtrain/react-decorators";

@inject(['director'])
export default class MetalChain extends Animation {

    static get defaultProps() {
        return {
            ...super.defaultProps,
            chainHeight: 47.37,
            chainLength: 10
        };
    }

    get transitionsProps() {
        return {};
    }

    get classNames() {
        return 'metal-chain-';
    }

    get width() {
        return this.scaleWidth(100) + '%';
    }

    chainLink(index) {
        return (
            <g transform={`translate(0, ${this.props.chainHeight * index})`} key={index}>
                <rect x="35.53" y="23.69" width="11.84" height="11.84" />
                <rect x="35.53" y="11.84" width="11.84" height="11.85" />
                <rect x="35.53" width="11.84" height="11.84" />
                <rect x="23.69" y="35.53" width="11.84" height="11.84" />
                <rect x="11.85" y="35.53" width="11.84" height="11.84" />
                <rect y="23.69" width="11.85" height="11.84" />
                <rect y="11.84" width="11.85" height="11.85" />
                <rect width="11.85" height="11.84" />
            </g>
        )
    }

    renderLinks(){
        let chainLinks = [];

        for (let i = 0; i < this.props.chainLength; i++) {
            chainLinks.push(this.props.children);
        }

        return chainLinks.map((el, index) => {
            return this.chainLink(index);
        });
    }

    renderContent() {
        return (
            <svg className={'metal-chain'} xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${this.props.chainHeight} ${this.props.chainHeight * this.props.chainLength}`}>
                {this.renderLinks()}
            </svg>
        );
    }

}
