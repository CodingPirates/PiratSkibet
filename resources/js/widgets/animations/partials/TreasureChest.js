import React from "react";
import Animation from "widgets/animations/Animation";
import {inject} from "@morningtrain/react-decorators";
import {router} from "@morningtrain/helpers";
import RawTreasureChest from "widgets/animations/partials/RawTreasureChest";
import Fireworks from "helpers/Fireworks";

@inject(['director'])
export default class TreasureChest extends Animation {

    static get defaultProps() {
        return {
            disabled: false,
            locked: false
        };

    }

    constructor(props) {
        super(props);
        this.shakeSound = new Audio(router.url('sounds/coins_shake.wav'));
        this.authorizationSound = new Audio(router.url('sounds/authorization.wav'));
        this.scanningSound = new Audio(router.url('sounds/scanning.wav'));
        this.scanSuccessSound = new Audio(router.url('sounds/success.wav'));
        this.openSound = new Audio(router.url('sounds/open_chest.wav'));
        this.fanfareSound = new Audio(router.url('sounds/fanfare.mp3'));
        this.shakeInterval;
        this.fireworks = new Fireworks({
            amount: 11,
            ticks: 180
        });
    }

    get classNames() {
        return 'treasure-chest-';
    }

    get width() {
        return this.scaleWidth(100) + '%';
    }

    startChestShake(target) {
        if ( !target.classList.contains('open-chest') ) {
            target.classList.add('shake-chest');

            this.authorizationSound.play();
            this.shakeSound.play();

            this.shakeInterval = setInterval(() => {
                this.shakeSound.play();
            }, 400);
        }
    }

    stopChestShake(target) {
        target.classList.remove('shake-chest');
        clearInterval(this.shakeInterval);
    }

    onClick(target) {
        if(this.props.locked) {
            return;
        }

        const {onOpen} = this.props;

        if (typeof onOpen === 'function') {
            onOpen();
            this.openChest(target);
        }

    }

    openChest(target) {
        if ( !target.classList.contains('open-chest') ) {
            target.classList.add('open-chest');
            this.stopChestShake(target);

            this.scanningSound.play();

            setTimeout(() => {
                this.scanSuccessSound.play();
            }, 2200);

            setTimeout(() => {
                this.openSound.play();
                this.fireworks.init();
            }, 3000);

            setTimeout(() => {
                this.fanfareSound.play();
            }, 3500);
        }
    }

    renderContent() {
        return (
            <RawTreasureChest
                onClick={event => this.onClick(event.currentTarget)}
                onMouseEnter={event => this.startChestShake(event.currentTarget)}
                onMouseLeave={event => this.stopChestShake(event.currentTarget)} />
        );
    }

}
