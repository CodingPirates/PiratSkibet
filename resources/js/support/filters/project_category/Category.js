import React from 'react';
import Widget from "widgets/Widget";
import {inject} from "@morningtrain/react-decorators";
import * as Fields from "support/fields";

export default @inject(['model', 'selection'])
class Category extends Widget {

    get name() {
        return this.props.model.get('name');
    }

    get id() {
        return this.props.model.get('id');
    }

    get visible() {
        return this.props.model.get('status') === 'visible';
    }

    get selected() {
        return this.props.selection.isSelected(this.id);
    }

    get className() {
        return this.selected ?
            'custom-table-row__title custom-table-row__title--selected' :
            'custom-table-row__title';

    }

    changeFiltered(selected) {
        this.props.selection.toggleSingle(this.id, selected);
    }

    render() {
        if (!this.visible) return null;

        return (
            <div className={this.className} >
                <Fields.Checkbox label={this.name} onChange={this.changeFiltered.bind(this)} checked={this.selected} />
            </div>
        );
    }
}
