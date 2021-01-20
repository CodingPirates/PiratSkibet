import React from "react";
import Widget from "widgets/Widget";
import {inject} from "@morningtrain/react-decorators";
import Checkmark from "widgets/landlubber/Checkmark";

@inject('model')
export default class LandlubberChecklistItem extends Widget {

    get label() {
        return this.props.model.get('label');
    }

    get value() {
        return this.props.model.get('value');
    }

    get completed() {
        return this.props.uncompleted.findIndex(val => val === this.value) < 0;
    }

    get className() {
        return [
            'checklist-item',
            this.completed ? 'checklist-item__completed' : null,
        ].filter(e => e).join(' ');
    }

    get action() {
        const {mainAction, vowsAction} = this.props;

        if (this.value === 'accepted_pirate_vows') {
            return vowsAction;
        }

        return mainAction;
    }

    onClick() {
        if (this.completed) return null;

        return this.action && this.action();
    }

    renderWidget() {
        return (
            <div className={this.className} onClick={this.onClick.bind(this)}>
                <Checkmark checked={this.completed}/>
                <span>{this.label}</span>
            </div>
        );
    }
}
