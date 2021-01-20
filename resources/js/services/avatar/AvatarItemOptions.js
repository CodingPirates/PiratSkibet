import React from 'react';
import {inject} from '@morningtrain/react-decorators';
import {Iterator} from "@morningtrain/react-resources";
import AvatarItemOption from "services/avatar/AvatarItemOption";

@inject(["model"])
export default class AvatarItemOptions extends React.Component {

    ///////////////////////////////
    /// Getters
    ///////////////////////////////

    get editor() {
        return this.props.editor;
    }

    ///////////////////////////////
    /// Event handlers
    ///////////////////////////////

    handleOptionChange = (item) => {
        if(typeof(this.props.onOptionChange) === 'function') {
            this.props.onOptionChange(item);
        }
    }

    ///////////////////////////////
    /// Renders
    ///////////////////////////////

    render() {
        return (

            <div className="avatar-item-options">
                <Iterator>
                    <AvatarItemOption onOptionChange={this.handleOptionChange} selected={this.editor.item_ids} />
                </Iterator>
            </div>
        );
    }
}
