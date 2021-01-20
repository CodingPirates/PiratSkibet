import React from 'react';
import {inject} from "@morningtrain/react-decorators";
import Badge from "widgets/forum/Badge";
import * as Displays from "support/displays";

@inject(['model', 'selection'])
export default class CategoryTag extends React.Component {

    get name() {
        return this.props.model.get('name');
    }

    get id() {
        return this.props.model.get('id');
    }

    removeFilter() {
        this.props.selection.toggleSingle(this.id, false);
    }

    render() {
        return (
            <div onClick={this.removeFilter.bind(this)} >
                <Badge color={'yellow'}>
                    <Displays.Text name={'display_name'}/>
                </Badge>
            </div>
        );
    }
}
