import React from "react";
import Animation from "widgets/animations/Animation";
import {inject} from "@morningtrain/react-decorators";

@inject(['director'])
export default class AnimationGroup extends Animation {

    static get defaultProps() {
        return {
            ...super.defaultProps,
            direction: 'left',
            shadow: false,
            childNumber: 5,
            scaleFactorInterval: [100, 200],
            animationDurationInterval: [30, 45]
        };
    }

    get transitionsProps() {
        return {};
    }

    get classNames() {
        return 'animation-group-';
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
            transitionDuration: this.duration + 's',
            animationDuration: this.duration + 's'
        }
    }

    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    get randomScaleFactor() {
        return this.randomNumber(this.props.scaleFactorInterval[0], this.props.scaleFactorInterval[1]) / 1000;
    }

    get randomAnimationDuration() {
        return this.randomNumber(this.props.animationDurationInterval[0], this.props.animationDurationInterval[1]);
    }

    renderChild(child, index) {
        return React.cloneElement(child, {
            key: index,
            durationFactor: 0,
            scaleFactor: this.randomScaleFactor,
            shadow: this.props.shadow,
            animationDuration: this.randomAnimationDuration,
            display:true,
            zIndex: this.props.zIndex
        });
    }

    renderChildren(){
        if(React.Children.count(this.props.children) === 0){
            return null;
        }

        let childComponents = [];

        for (let i = 0; i < this.props.childNumber; i++) {
            childComponents.push(this.props.children);
        }

        return childComponents.map((child, index) => {
            return this.renderChild(child, index);
        });
    }

    renderContent() {

        return (
            <React.Fragment>
                {this.renderChildren()}
            </React.Fragment>
        );
    }

}
