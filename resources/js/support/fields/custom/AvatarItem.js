import React from 'react';
import Field from "@morningtrain/react-fields/base/Field";
import {Injected as Nested} from "@morningtrain/react-fields/composites/Nested";
import {Injected as Hidden} from "@morningtrain/react-fields/simpletons/Hidden";
import {Injected as TextArea} from "@morningtrain/react-fields/simpletons/TextArea";
import AvatarPreview from "services/avatar/AvatarPreview";
import SelectBoxes from "support/fields/custom/SelectBoxes";
import AvatarCategory from "services/avatar/AvatarCategory";
import {Collection, Iterator} from "@morningtrain/react-resources";
import AvatarItemOption from "services/avatar/AvatarItemOption";
import * as Filters from "support/filters";
import {observable} from "mobx";
import Resources from "@morningtrain/resources";

export default class AvatarItem extends Field {

    @observable items = new Map();
    @observable item_ids = new Map();

    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            meta: this.calculateMeta(this.value),
            svg: this.value
        }
    }

    componentDidMount() {
        super.componentDidMount();


        this.setRandomAvatarPreview();
    }

    triggerDataChange(other_states = {}) {
        super.triggerDataChange(other_states);
        this.handleContentChange(this.value);
    }

    ///////////////////////////////
    /// Avatar preview helpers
    ///////////////////////////////

    setRandomAvatarPreview() {
        Resources.make('api', 'backend.gamification.avatar_item')
            .operation('random_avatar')
            .execute()
            .then(data => {
                console.log(data);

                let items = new Map();
                console.log(Object.keys(data.collection));
                if (Object.keys(data.collection).length > 0) {
                    Object.keys(data.collection).map(category => {
                        items.set(category, new Map(Object.entries(data.collection[category])));
                    })
                }
                console.log(items);
                this.items.replace(items);
                this.activateCurrentItem();
            });
    }

    ///////////////////////////////
    /// Event handlers
    ///////////////////////////////

    handleOptionChange = (item) => {
        this.items.set(item.get('category'), item);
        this.item_ids.set(item.get('category'), item.get('id'));
    }

    activateCurrentItem = () => {
        let item = new Map(this.props.model);
        item.set(this.name, this.state.svg);
        this.items.set(item.get('category'), item);
        this.item_ids.set(item.get('category'), item.get('id'));
    }

    handleContentChange(svg) {
        this.setState({svg: svg, meta: this.calculateMeta(svg)}, () => {
            this.activateCurrentItem();
        });
    }

    ///////////////////////////////
    /// SVG calculations
    ///////////////////////////////

    calculateMeta(svg_string) {

        let meta = {
            translate: {x: 0, y: 0},
            viewBox: {height: 0, width: 0}
        };

        let container = document.createElement('div');
        document.body.appendChild(container);

        let svg = this.createElementFromHTML("<svg><g>" + svg_string + "</g></svg>");
        if (svg === null) {
            return meta;
        }

        svg.style.position = 'fixed';
        svg.style.left = -1000;
        svg.style.top = -1000;

        container.appendChild(svg);

        let bbox = svg.getElementsByTagName('g')[0].getBBox();

        if (bbox) {

            let paddingFactor = 1.5;

            let viewboxHeight = bbox.height * paddingFactor;
            let viewboxWidth = bbox.width * paddingFactor;

            meta.viewBox.height = viewboxHeight;
            meta.viewBox.width = viewboxWidth;

            let translateX = (viewboxWidth - bbox.width) * 0.5 - bbox.x  ;
            let translateY = (viewboxHeight - bbox.height) * 0.5 - bbox.y;

            meta.translate.x = translateX;
            meta.translate.y = translateY;

        }

        container.parentNode.removeChild(container);

        return meta;
    }

    createElementFromHTML(htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();

        // Change this to div.childNodes to support multiple top-level nodes
        return div.firstChild;
    }

    ///////////////////////////////
    /// Rendering
    ///////////////////////////////

    renderMetaFields() {
        return (
            <React.Fragment>
                <Nested name={'meta'}>
                    <React.Fragment>
                        <Nested name={'translate'}>
                            <React.Fragment>
                                <Hidden name={'x'} value={this.state.meta.translate.x}/>
                                <Hidden name={'y'} value={this.state.meta.translate.y}/>
                            </React.Fragment>
                        </Nested>
                        <Nested name={'viewBox'}>
                            <React.Fragment>
                                <Hidden name={'height'} value={this.state.meta.viewBox.height}/>
                                <Hidden name={'width'} value={this.state.meta.viewBox.width}/>
                            </React.Fragment>
                        </Nested>
                    </React.Fragment>
                </Nested>
            </React.Fragment>
        );
    }

    renderPreview() {
        return (
            <div onClick={this.activateCurrentItem.bind(this)}>
                <svg viewBox={"0 0 " + this.state.meta.viewBox.width + " " + this.state.meta.viewBox.height}>
                    <g transform={"translate(" + this.state.meta.translate.x + ", " + this.state.meta.translate.y + ")"} dangerouslySetInnerHTML={{__html: this.state.svg}}/>
                </svg>
            </div>
        );
    }

    renderAvatar() {
        return (
            <div className={'avatar_item_field_avatar_preview'}>
                {/*<Collection namepsace={'api'} resourceName={'backend.gamification.avatar_item'}> */}
                <Collection namepsace={'api'} resourceName={'avatar_item'}>
                    <div className="avatar-editor__options">
                        <Filters.Enum enum={'selectable_avatar_category'} constraint={'category'}>
                            <SelectBoxes>
                                <AvatarCategory/>
                            </SelectBoxes>
                        </Filters.Enum>

                        <div className="avatar-item-options">
                            <Iterator>
                                <AvatarItemOption onOptionChange={this.handleOptionChange}/>
                            </Iterator>
                        </div>
                    </div>

                    <div className="avatar-wrap">
                        <AvatarPreview items={this.items}/>
                    </div>
                </Collection>
            </div>
        );
    }

    renderItemInput() {
        return (
            <TextArea label={''} name={this.as} onChange={this.handleContentChange.bind(this)}/>
        )
    }

    renderField() {
        return (
            <div className={'avatar_item_field avatar-editor'}>
                {this.renderMetaFields()}
                <div className={'avatar_item_field_editor'}>
                    <div className={'avatar_item_field_editor_input'}>
                        {this.renderItemInput()}
                    </div>
                    <div className={'avatar_item_field_editor_preview'}>
                        {this.renderPreview()}
                    </div>
                </div>
                {this.renderAvatar()}
            </div>
        );
    }
}

export const Injected = AvatarItem.inject();
