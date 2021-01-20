import React from 'react';
import {Collection} from '@morningtrain/react-resources';
import AvatarCategory from './AvatarCategory';
import {Enum} from '@morningtrain/helpers';
import {isObservable, observable, observe} from "mobx";
import AvatarPreview from "./AvatarPreview";
import {Enum as EnumFilter, Static as StaticFilter} from "support/filters";
import SelectBoxes from "support/fields/custom/SelectBoxes";

import AvatarEditorWorld from "widgets/animations/worlds/AvatarEditorWorld";
import IslandHalf from "widgets/animations/partials/IslandHalf";
import Field from "@morningtrain/react-fields/base/Field";
import HiddenField from "@morningtrain/react-fields/simpletons/Hidden";
import AvatarItemOptions from "services/avatar/AvatarItemOptions";
import WhenModel from "support/conditionals/WhenModel";

const {object: {decodeObservable}} = require("@morningtrain/helpers");

export default class AvatarEditor extends Field {

    @observable items = new Map();
    @observable item_ids = new Map();

    constructor(props) {
        super(props);

        this.state = {
            ...super.state,
            default_items: this.getItemsFromModel(props.model)
        };

        if (isObservable(props.model) && props.model) {

            this.applyItems(props.model);

            observe(props.model, change => {

                if(this.name === change.name) {
                    this.applyItems(props.model);
                }

            })
        }

    }

    getItemsFromModel(model) {

        let items = [];

        if (model && isObservable(model)) {

            items = model.get(this.name)

            if (!items) return [];

            Object.keys(items).forEach(item => {
                const a = (new Map(Object.entries(decodeObservable(items[item]))))
                this.handleOptionChange(a)
            });

            items = Array.from(this.item_ids.toJS().values());
        }

        return items;
    }

    applyItems(model) {
        this.setState({default_items: this.getItemsFromModel(model)});
    }


    ///////////////////////////////
    /// Getters
    ///////////////////////////////

    static get categories() {
        return (new Enum('avatar_category')).options;
    }

    static get defaultProps() {
        return {
            ...super.defaultProps,
            name: 'items',
        };
    }

    ///////////////////////////////
    /// Event handlers
    ///////////////////////////////

    handleOptionChange = (item) => {
        this.items.set(item.get('category'), item);
        this.item_ids.set(item.get('category'), item.get('id'));
    }

    ///////////////////////////////
    /// Renders
    ///////////////////////////////

    renderItems() {
        return (
            <div className="avatar-editor__wrap">
                <AvatarEditorWorld classNames={"avatar-editor-world"} />

                <div className="avatar-editor__grid">
                    <Collection resourceName={'avatar_item'} >
                        <div className="avatar-editor__options">

                            <StaticFilter constraint="orderFirst" value={this.state.default_items} shouldRefresh={false}/>

                            <EnumFilter enum={'selectable_avatar_category'} constraint={'category'}>
                                <SelectBoxes>
                                    <AvatarCategory/>
                                </SelectBoxes>
                            </EnumFilter>

                            <AvatarItemOptions editor={this} onOptionChange={this.handleOptionChange} />

                        </div>

                        <div className="avatar-wrap">
                            <IslandHalf scaleFactor={0.7} left="15%" bottom="-5%" background={'#1F9DCE'} />
                            <AvatarPreview items={this.items}/>
                        </div>
                    </Collection>
                </div>
            </div>
        );
    }

    renderFields() {
        return AvatarEditor.categories.map(category => {
            return <HiddenField key={category.value} model={this.item_ids} name={category.value} />
        });
    }

    renderAvatar() {
        return (
            <div className="avatar-wrap">
                <AvatarPreview items={this.items}/>
            </div>
        )
    }

    render() {
        return (
            <React.Fragment>
                <WhenModel>
                    {this.renderFields()}
                    {this.renderItems()}
                </WhenModel>
            </React.Fragment>
        );
    }
}

export const Injected = AvatarEditor.inject();
